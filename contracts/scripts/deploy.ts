import { Contract, ContractFactory } from "ethers";
// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import hre, { ethers, network, upgrades } from "hardhat";
import { getImplementationAddress } from '@openzeppelin/upgrades-core';
import config from "./config.json";
import { waitSeconds } from "./utils";

async function main(): Promise<void> {
  // Hardhat always runs the compile task when running scripts through it.
  // If this runs in a standalone fashion you may want to call compile manually
  // to make sure everything is compiled
  // await run("compile");

  // We get the contract to deploy
  const params = (config as any)[network.name];

  // construction params

  const Multicall2: ContractFactory = await ethers.getContractFactory("Multicall2");
  const multicall2: Contract = await Multicall2.deploy();
  await multicall2.deployed();

  console.log("Multicall2 deployed to:", multicall2.address);

  // Deploy the Valve contract for erc20 token
  const Valve: ContractFactory = await ethers.getContractFactory("Valve");

  const valve = await upgrades.deployProxy(Valve, { initializer: "initialize" });
  await valve.deployed();
  const valveImpl = await getImplementationAddress(hre.network.provider, valve.address);
  console.log(`valve proxy deployed to: ${valve.address} & implementation deployed to: ${valveImpl}`);

  await valve.setFeeInfo(params.feeRecipient, params.feePercent);
  await valve.setValidDuration(params.validDuration);

  // Deploy the Valve721 contract for erc721 token
  const Valve721 = await ethers.getContractFactory("Valve721");

  const valve721 = await upgrades.deployProxy(Valve721, { initializer: "initialize" });
  await valve721.deployed();
  const valve721Impl = await getImplementationAddress(hre.network.provider, valve721.address);
  console.log(`valve721 proxy deployed to: ${valve721.address} & implementation deployed to: ${valve721Impl}`);

  await valve721.setFeeInfo(params.feeRecipient, ethers.utils.parseEther(params.erc721Fee));
  await valve721.setValidDuration(params.validDuration);

  // Deploy the Valve1155 contract for erc1155 token
  const Valve1155 = await ethers.getContractFactory("Valve1155");

  const valve1155 = await upgrades.deployProxy(Valve1155, { initializer: "initialize" });
  await valve1155.deployed();
  const valve1155Impl = await getImplementationAddress(hre.network.provider, valve1155.address);
  console.log(`valve1155 proxy deployed to: ${valve1155.address} & implementation deployed to: ${valve1155Impl}`);

  await valve1155.setFeeInfo(params.feeRecipient, ethers.utils.parseEther(params.erc1155Fee));
  await valve1155.setValidDuration(params.validDuration);

  await waitSeconds(5);

  // Verify Valve contract
  await hre.run("verify:verify", {
    address: valveImpl,
    contract: "contracts/Valve.sol:Valve",
    constructorArguments: [],
  });
  console.log(`valve verified to: ${valveImpl}`);

  // Verify Valve721 contract
  await hre.run("verify:verify", {
    address: valve721Impl,
    contract: "contracts/Valve721.sol:Valve721",
    constructorArguments: [],
  });
  console.log(`valve721 verified to: ${valve721Impl}`);

  // Verify Valve1155 contract
  await hre.run("verify:verify", {
    address: valve1155Impl,
    contract: "contracts/Valve1155.sol:Valve1155",
    constructorArguments: [],
  });
  console.log(`valve1155 verified to: ${valve1155Impl}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error: Error) => {
    console.error(error);
    process.exit(1);
  });
