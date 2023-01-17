import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import chai from "chai";
import { deployContract, solidity } from "ethereum-waffle";
import { keccak256, solidityPack } from "ethers/lib/utils";
import hre, { upgrades, ethers } from "hardhat";
import { Artifact } from "hardhat/types";
import { Valve, TestToken } from "../typechain";

import {
  advanceTimeAndBlock,
  ether,
  getLatestBlockTimestamp,
  getSnapShot,
  revertEvm,
  TranferStatus,
  wei,
  ZERO_ADDRESS,
} from "./utils";

const { expect } = chai;

chai.use(solidity);

describe("Valve", function () {
  let owner: SignerWithAddress;
  let tester1: SignerWithAddress;
  let tester2: SignerWithAddress;
  let tester3: SignerWithAddress;
  let tester4: SignerWithAddress;
  let tester5: SignerWithAddress;
  let feeRecipient: SignerWithAddress;
  let valve: Valve;
  let token: TestToken;
  const feePercent = wei(1000); // 10%
  const validDuration = wei(3600); // 1 hour
  let timestamp: number;

  before(async function () {
    const signers: SignerWithAddress[] = await hre.ethers.getSigners();

    owner = signers[0];
    tester1 = signers[1];
    tester2 = signers[2];
    feeRecipient = signers[3];
    tester3 = signers[4];
    tester4 = signers[5];
    tester5 = signers[6];

    const TestTokenArtifact: Artifact = await hre.artifacts.readArtifact("TestToken");
    token = <TestToken>(<unknown>await deployContract(owner, TestTokenArtifact, []));

    const VestingArtifact = await ethers.getContractFactory("Valve");
    valve = <Valve>(<unknown>await upgrades.deployProxy(VestingArtifact, [], { initializer: "initialize" }));
  });

  describe("check ownable functions", function () {
    it("setFeeInfo", async () => {
      await expect(valve.connect(tester1).setFeeInfo(feeRecipient.address, feePercent)).to.be.revertedWith(
        "Ownable: caller is not the owner",
      );

      await expect(valve.setFeeInfo(ZERO_ADDRESS, feePercent)).to.be.revertedWith("Invalid feeRecipient");

      await expect(valve.setFeeInfo(feeRecipient.address, 10001)).to.be.revertedWith("Invalid feePercent");

      await valve.setFeeInfo(feeRecipient.address, feePercent);

      expect(await valve.feeRecipient()).to.equal(feeRecipient.address);
      expect(await valve.feePercent()).to.equal(feePercent);
    });

    it("setValidDuration", async () => {
      await expect(valve.connect(tester1).setValidDuration(validDuration)).to.be.revertedWith(
        "Ownable: caller is not the owner",
      );
      await valve.setValidDuration(validDuration);
      expect(await valve.validDuration()).to.equal(validDuration);
    });
  });

  describe("check for eth", function () {
    let snapshotID: any;
    before(async () => {
      snapshotID = await getSnapShot();
    });
    after(async () => {
      await revertEvm(snapshotID);
    });

    it("create with confirmation", async () => {
      await expect(valve.connect(tester1).createTransfer(ZERO_ADDRESS, tester2.address, 0, false)).to.be.revertedWith(
        "No eth",
      );
      await valve.connect(tester1).createTransfer(ZERO_ADDRESS, tester2.address, 0, false, { value: ether(10) });
      timestamp = await getLatestBlockTimestamp();

      expect(await ethers.provider.getBalance(valve.address)).to.equal(ether(10));

      const transfer = await valve.transfers(0);
      const exId = keccak256(solidityPack(["address", "uint256"], [tester1.address, wei(0)]));
      expect(transfer.id).to.equal(wei(0));
      expect(transfer.token).to.equal(ZERO_ADDRESS);
      expect(transfer.from).to.equal(tester1.address);
      expect(transfer.to).to.equal(tester2.address);
      expect(transfer.amount).to.equal(ether(10));
      expect(transfer.expireAt).to.equal(wei(validDuration.toNumber() + timestamp));
      expect(transfer.status).to.equal(TranferStatus.Init);
      expect(transfer.exId).to.equal(exId);

      expect(await valve.transferCreators(tester1.address, 0)).to.equal(wei(0));
      expect(await valve.transferInfo(exId)).to.equal(wei(0));
    });

    it("create more with confirmation", async () => {
      await valve.connect(tester1).createTransfer(ZERO_ADDRESS, tester3.address, 0, false, { value: ether(10) });
      await valve.connect(tester1).createTransfer(ZERO_ADDRESS, tester4.address, 0, false, { value: ether(10) });
      await valve.connect(tester1).createTransfer(ZERO_ADDRESS, tester5.address, 0, false, { value: ether(10) });
      expect(await ethers.provider.getBalance(valve.address)).to.equal(ether(40));
    });

    it("check cancelTransfer 0", async () => {
      const exId = keccak256(solidityPack(["address", "uint256"], [tester1.address, wei(0)]));

      await expect(valve.cancelTransfer(exId)).to.be.revertedWith("Invalid");

      await valve.connect(tester1).cancelTransfer(exId);

      const transfer = await valve.transfers(0);
      expect(transfer.status).to.equal(TranferStatus.Cancelled);
      expect(await ethers.provider.getBalance(valve.address)).to.equal(ether(30));

      await expect(valve.connect(tester1).cancelTransfer(exId)).to.be.revertedWith("Invalid");
    });

    it("check acceptTransfer 1", async () => {
      const exId = keccak256(solidityPack(["address", "uint256"], [tester1.address, wei(1)]));

      await expect(valve.acceptTransfer(exId)).to.be.revertedWith("Invalid");

      await valve.connect(tester3).acceptTransfer(exId);

      const transfer = await valve.transfers(1);
      expect(transfer.status).to.equal(TranferStatus.Sent);
      expect(await ethers.provider.getBalance(valve.address)).to.equal(ether(20));

      await expect(valve.connect(tester3).acceptTransfer(exId)).to.be.revertedWith("Invalid");
    });

    it("try to accept expired one 2", async () => {
      const exId = keccak256(solidityPack(["address", "uint256"], [tester1.address, wei(2)]));

      await advanceTimeAndBlock(validDuration.toNumber());

      await expect(valve.acceptTransfer(exId)).to.be.revertedWith("Invalid");

      await expect(valve.connect(tester4).acceptTransfer(exId)).to.be.revertedWith("Invalid");

      const transfer = await valve.transfers(2);
      expect(transfer.status).to.equal(TranferStatus.Init);

      await valve.connect(tester1).cancelTransfer(exId);
    });

    it("create directly", async () => {
      await expect(valve.connect(tester1).createTransfer(ZERO_ADDRESS, tester2.address, 0, true)).to.be.revertedWith(
        "No eth",
      );
      const beforeBalance = await tester2.getBalance();
      await valve.connect(tester1).createTransfer(ZERO_ADDRESS, tester2.address, 0, true, { value: ether(10) });
      timestamp = await getLatestBlockTimestamp();

      expect(await ethers.provider.getBalance(valve.address)).to.equal(ether(10));

      const transfer = await valve.transfers(4);
      const exId = keccak256(solidityPack(["address", "uint256"], [tester1.address, wei(4)]));
      expect(transfer.id).to.equal(wei(4));
      expect(transfer.token).to.equal(ZERO_ADDRESS);
      expect(transfer.from).to.equal(tester1.address);
      expect(transfer.to).to.equal(tester2.address);
      expect(transfer.amount).to.equal(ether(10));
      expect(transfer.expireAt).to.equal(wei(validDuration.toNumber() + timestamp));
      expect(transfer.status).to.equal(TranferStatus.Sent);
      expect(transfer.exId).to.equal(exId);

      const fee = ether(10)
        .mul(await valve.feePercent())
        .div(1e4);
      expect(await tester2.getBalance()).to.equal(beforeBalance.add(ether(10).sub(fee)));

      expect(await valve.transferCreators(tester1.address, 4)).to.equal(wei(4));
      expect(await valve.transferInfo(exId)).to.equal(wei(4));
      await expect(valve.connect(tester3).acceptTransfer(exId)).to.be.revertedWith("Invalid");
    });
  });

  describe("check for token", function () {
    it("create with confirmation", async () => {
      await token.connect(tester1).mint(ether(100));
      await token.connect(tester1).approve(valve.address, ether(100));
      await valve.connect(tester1).createTransfer(token.address, tester2.address, ether(10), false);
      timestamp = await getLatestBlockTimestamp();

      expect(await token.balanceOf(valve.address)).to.equal(ether(10));

      const transfer = await valve.transfers(0);
      const exId = keccak256(solidityPack(["address", "uint256"], [tester1.address, wei(0)]));
      expect(transfer.id).to.equal(wei(0));
      expect(transfer.token).to.equal(token.address);
      expect(transfer.from).to.equal(tester1.address);
      expect(transfer.to).to.equal(tester2.address);
      expect(transfer.amount).to.equal(ether(10));
      expect(transfer.expireAt).to.equal(wei(validDuration.toNumber() + timestamp));
      expect(transfer.status).to.equal(TranferStatus.Init);
      expect(transfer.exId).to.equal(exId);

      expect(await valve.transferCreators(tester1.address, 0)).to.equal(wei(0));
      expect(await valve.transferInfo(exId)).to.equal(wei(0));
    });

    it("create more with confirmation", async () => {
      await valve.connect(tester1).createTransfer(token.address, tester3.address, ether(10), false);
      await valve.connect(tester1).createTransfer(token.address, tester4.address, ether(10), false);
      await valve.connect(tester1).createTransfer(token.address, tester5.address, ether(10), false);
      expect(await token.balanceOf(valve.address)).to.equal(ether(40));
    });

    it("check cancelTransfer 0", async () => {
      const exId = keccak256(solidityPack(["address", "uint256"], [tester1.address, wei(0)]));

      await expect(valve.cancelTransfer(exId)).to.be.revertedWith("Invalid");

      await valve.connect(tester1).cancelTransfer(exId);

      const transfer = await valve.transfers(0);
      expect(transfer.status).to.equal(TranferStatus.Cancelled);
      expect(await token.balanceOf(valve.address)).to.equal(ether(30));

      await expect(valve.connect(tester1).cancelTransfer(exId)).to.be.revertedWith("Invalid");
    });

    it("check acceptTransfer 1", async () => {
      const exId = keccak256(solidityPack(["address", "uint256"], [tester1.address, wei(1)]));

      await expect(valve.acceptTransfer(exId)).to.be.revertedWith("Invalid");

      await valve.connect(tester3).acceptTransfer(exId);

      const transfer = await valve.transfers(1);
      expect(transfer.status).to.equal(TranferStatus.Sent);
      expect(await token.balanceOf(valve.address)).to.equal(ether(20));

      await expect(valve.connect(tester3).acceptTransfer(exId)).to.be.revertedWith("Invalid");
    });

    it("try to accept expired one 2", async () => {
      const exId = keccak256(solidityPack(["address", "uint256"], [tester1.address, wei(2)]));

      await advanceTimeAndBlock(validDuration.toNumber());

      await expect(valve.acceptTransfer(exId)).to.be.revertedWith("Invalid");

      await expect(valve.connect(tester4).acceptTransfer(exId)).to.be.revertedWith("Invalid");

      const transfer = await valve.transfers(2);
      expect(transfer.status).to.equal(TranferStatus.Init);

      await valve.connect(tester1).cancelTransfer(exId);
    });

    it("create directly", async () => {
      const beforeBalance = await token.balanceOf(tester2.address);
      await valve.connect(tester1).createTransfer(token.address, tester2.address, ether(10), true);
      timestamp = await getLatestBlockTimestamp();

      expect(await token.balanceOf(valve.address)).to.equal(ether(10));

      const transfer = await valve.transfers(4);
      const exId = keccak256(solidityPack(["address", "uint256"], [tester1.address, wei(4)]));
      expect(transfer.id).to.equal(wei(4));
      expect(transfer.token).to.equal(token.address);
      expect(transfer.from).to.equal(tester1.address);
      expect(transfer.to).to.equal(tester2.address);
      expect(transfer.amount).to.equal(ether(10));
      expect(transfer.expireAt).to.equal(wei(validDuration.toNumber() + timestamp));
      expect(transfer.status).to.equal(TranferStatus.Sent);
      expect(transfer.exId).to.equal(exId);

      const fee = ether(10)
        .mul(await valve.feePercent())
        .div(1e4);
      expect(await token.balanceOf(tester2.address)).to.equal(beforeBalance.add(ether(10).sub(fee)));

      expect(await valve.transferCreators(tester1.address, 4)).to.equal(wei(4));
      expect(await valve.transferInfo(exId)).to.equal(wei(4));
    });
  });
});
