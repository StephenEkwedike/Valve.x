import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import chai from "chai";
import { deployContract, solidity } from "ethereum-waffle";
import { keccak256, solidityPack } from "ethers/lib/utils";
import hre, { upgrades, ethers } from "hardhat";
import { Artifact } from "hardhat/types";
import { Valve1155, Test1155Token } from "../typechain";

import {
  advanceTimeAndBlock,
  getLatestBlockTimestamp,
  getSnapShot,
  revertEvm,
  wei,
  ZERO_ADDRESS,
} from "./utils";

const { expect } = chai;

chai.use(solidity);

describe("Valve1155", function () {
  let tester1: SignerWithAddress;
  let tester2: SignerWithAddress;
  let tester3: SignerWithAddress;
  let tester4: SignerWithAddress;
  let tester5: SignerWithAddress;
  let feeRecipient: SignerWithAddress;
  let valve: Valve1155;
  let token: Test1155Token;
  const fee = wei(10**16); // 0.01 eth
  const validDuration = wei(3600); // 1 hour
  let timestamp: number;
  const tokenData = "0x00";

  before(async function () {
    const signers: SignerWithAddress[] = await hre.ethers.getSigners();

    tester1 = signers[1];
    tester2 = signers[2];
    feeRecipient = signers[3];
    tester3 = signers[4];
    tester4 = signers[5];
    tester5 = signers[6];

    const TestTokenArtifact: Artifact = await hre.artifacts.readArtifact("Test1155Token");
    token = <Test1155Token><unknown>await deployContract(tester1, TestTokenArtifact, []);

    const VestingArtifact = await ethers.getContractFactory("Valve1155");
    valve = <Valve1155><unknown>await upgrades.deployProxy(VestingArtifact, [], { initializer: "initialize" });

    await token.connect(tester1).setApprovalForAll(valve.address, true);
  });

  describe("check owanble functions", function () {
    it("setFeeInfo", async function () {
      await expect(valve.connect(tester1).setFeeInfo(feeRecipient.address, fee)).to.be.revertedWith(
        "Ownable: caller is not the owner",
      );

      await expect(valve.setFeeInfo(ZERO_ADDRESS, fee)).to.be.revertedWith("Invalid feeRecipient");

      await valve.setFeeInfo(feeRecipient.address, fee);

      expect(await valve.feeRecipient()).to.equal(feeRecipient.address);
      expect(await valve.fee()).to.equal(fee);
    });

    it("setValidDuration", async function () {
      await expect(valve.connect(tester1).setValidDuration(validDuration)).to.be.revertedWith(
        "Ownable: caller is not the owner",
      );
      await valve.setValidDuration(validDuration);
      expect(await valve.validDuration()).to.equal(validDuration);
    });
  });

  describe("check for eth", () => {
    let snapshotID: any;
    before(async () => {
      snapshotID = await getSnapShot();
    });
    after(async () => {
      await revertEvm(snapshotID);
    });

    it("create", async function () {
      await valve.connect(tester1).createTransfer(token.address, tester2.address, [0], [wei(10**4)], tokenData, { value: fee });
      timestamp = await getLatestBlockTimestamp();

      expect(await token.balanceOf(valve.address, 0)).to.equal(wei(10**4));

      const transfer = await valve.getTransfer(0);
      const exId = keccak256(solidityPack(["address", "uint256"], [tester1.address, wei(0)]));
      expect(transfer.id).to.equal(wei(0));
      expect(transfer.token).to.equal(token.address);
      expect(transfer.from).to.equal(tester1.address);
      expect(transfer.to).to.equal(tester2.address);
      expect(transfer.tokenIds[0]).to.equal(wei(0));
      expect(transfer.amounts[0]).to.equal(wei(10**4));
      expect(transfer.expireAt).to.equal(wei(validDuration.toNumber() + timestamp));
      expect(transfer.status).to.equal(wei(0));
      expect(transfer.exId).to.equal(exId);

      expect(await valve.transferCreators(tester1.address, 0)).to.equal(wei(0));
      expect(await valve.transferInfo(exId)).to.equal(wei(0));
      expect(await ethers.provider.getBalance(valve.address)).to.equal(fee);
    });

    it("create more", async function () {
      await valve.connect(tester1).createTransfer(token.address, tester3.address, [1], [wei(10**4)], tokenData, { value: fee });
      await valve.connect(tester1).createTransfer(token.address, tester4.address, [2, 3], [wei(1), wei(10**4)], tokenData, { value: fee });
      await valve.connect(tester1).createTransfer(token.address, tester5.address, [4], [wei(10**4)], tokenData, { value: fee });

      expect(await token.balanceOf(valve.address, 1)).to.equal(wei(10**4));
      expect(await token.balanceOf(valve.address, 2)).to.equal(wei(1));
      expect(await token.balanceOf(valve.address, 3)).to.equal(wei(10**4));
      expect(await token.balanceOf(valve.address, 4)).to.equal(wei(10**4));
      expect(await ethers.provider.getBalance(valve.address)).to.equal(fee.mul(4));
    });

    it("check cancelTransfer 0", async function () {
      const exId = keccak256(solidityPack(["address", "uint256"], [tester1.address, wei(0)]));

      await expect(valve.cancelTransfer(exId)).to.be.revertedWith("Invalid");
      const beforeBalance = await tester1.getBalance();

      await valve.connect(tester1).cancelTransfer(exId);

      const transfer = await valve.transfers(0);
      expect(transfer.status).to.equal(wei(2));
      expect(await token.balanceOf(valve.address, 0)).to.equal(wei(0));
      expect(await token.balanceOf(tester1.address, 0)).to.equal(wei(10**18));
      expect(await ethers.provider.getBalance(valve.address)).to.equal(fee.mul(3));
      expect((await tester1.getBalance()).gt(beforeBalance.add(wei(9*10**15)))).to.be.true; // receive fee but consumed by gas fee

      await expect(valve.connect(tester1).cancelTransfer(exId)).to.be.revertedWith("Invalid");
    });

    it("check acceptTransfer 1", async function () {
      const exId = keccak256(solidityPack(["address", "uint256"], [tester1.address, wei(1)]));
      const beforeBalance = await feeRecipient.getBalance();

      await expect(valve.acceptTransfer(exId)).to.be.revertedWith("Invalid");

      await valve.connect(tester3).acceptTransfer(exId);

      const transfer = await valve.transfers(1);
      expect(transfer.status).to.equal(wei(1));
      expect(await token.balanceOf(valve.address, 1)).to.equal(wei(0));
      expect(await token.balanceOf(tester3.address, 1)).to.equal(wei(10**4));
      expect(await ethers.provider.getBalance(valve.address)).to.equal(fee.mul(2));
      expect(await feeRecipient.getBalance()).to.equal(beforeBalance.add(fee));

      await expect(valve.connect(tester3).acceptTransfer(exId)).to.be.revertedWith("Invalid");
    });

    it("check acceptBatchTransfer 2", async function () {
      const exId = keccak256(solidityPack(["address", "uint256"], [tester1.address, wei(2)]));
      const beforeBalance = await feeRecipient.getBalance();

      await expect(valve.acceptTransfer(exId)).to.be.revertedWith("Invalid");

      await valve.connect(tester4).acceptTransfer(exId);

      const transfer = await valve.transfers(2);
      expect(transfer.status).to.equal(wei(1));
      expect(await token.balanceOf(valve.address, 2)).to.equal(wei(0));
      expect(await token.balanceOf(valve.address, 3)).to.equal(wei(0));
      expect(await token.balanceOf(tester4.address, 2)).to.equal(wei(1));
      expect(await token.balanceOf(tester4.address, 3)).to.equal(wei(10**4));
      expect(await ethers.provider.getBalance(valve.address)).to.equal(fee.mul(1));
      expect(await feeRecipient.getBalance()).to.equal(beforeBalance.add(fee));

      await expect(valve.connect(tester4).acceptTransfer(exId)).to.be.revertedWith("Invalid");
    });

    it("try to accept expired one 3", async function () {
      const exId = keccak256(solidityPack(["address", "uint256"], [tester1.address, wei(3)]));

      await advanceTimeAndBlock(validDuration.toNumber());

      await expect(valve.acceptTransfer(exId)).to.be.revertedWith("Invalid");

      await expect(valve.connect(tester5).acceptTransfer(exId)).to.be.revertedWith("Invalid");

      const transfer = await valve.transfers(3);
      expect(transfer.status).to.equal(wei(0));
      expect(await ethers.provider.getBalance(valve.address)).to.equal(fee.mul(1));

      await valve.connect(tester1).cancelTransfer(exId);
    });
  });
});
