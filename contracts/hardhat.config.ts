import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "@openzeppelin/hardhat-upgrades";
import "@nomiclabs/hardhat-etherscan";
import "hardhat-contract-sizer";

import "./tasks/accounts";
import "./tasks/clean";

import { resolve } from "path";

import { config as dotenvConfig } from "dotenv";
import { HardhatUserConfig } from "hardhat/config";

dotenvConfig({ path: resolve(__dirname, "./.env") });

const chainIds = {
  hardhat: 31337,
  mainnet: 1,
  bsc: 56,
  matic: 137,
  avax: 43114,
  ftm: 250,
  optimism: 10,
  bsct: 97,
};

// Ensure that we have all the environment variables we need.
let PRIVATEKEY: string;
if (!process.env.PRIVATEKEY) {
  throw new Error("Please set your PRIVATEKEY in a .env file");
} else {
  PRIVATEKEY = process.env.PRIVATEKEY;
}

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  gasReporter: {
    currency: "USD",
    enabled: process.env.REPORT_GAS ? true : false,
    excludeContracts: [],
    src: "./contracts",
  },
  networks: {
    hardhat: {},
    optimism: {
      accounts: [PRIVATEKEY],
      url: "https://mainnet.optimism.io",
      chainId: chainIds.optimism,
    },
    matic: {
      accounts: [PRIVATEKEY],
      url: "https://polygon-rpc.com/",
      chainId: chainIds.matic,
      gasPrice: 35000000000,
    },
    ftm: {
      accounts: [PRIVATEKEY],
      url: "https://rpc.ankr.com/fantom/",
      chainId: chainIds.ftm,
    },
    avax: {
      accounts: [PRIVATEKEY],
      url: "https://api.avax.network/ext/bc/C/rpc",
      chainId: chainIds.avax,
    },
    bsc: {
      accounts: [PRIVATEKEY],
      url: "https://bsc-dataseed.binance.org/",
      chainId: chainIds.bsc,
    },
    bsct: {
      accounts: [PRIVATEKEY],
      url: "https://data-seed-prebsc-1-s3.binance.org:8545/",
      chainId: chainIds.bsct,
    },
    mainnet: {
      accounts: [PRIVATEKEY],
      url: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
      chainId: chainIds.mainnet,
    },
  },
  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
    sources: "./contracts",
    tests: "./test",
  },
  contractSizer: {
    alphaSort: true,
    runOnCompile: true,
    disambiguatePaths: false,
  },
  solidity: {
    version: "0.8.2",
    settings: {
      metadata: {
        // Not including the metadata hash
        // https://github.com/paulrberg/solidity-template/issues/31
        bytecodeHash: "none",
      },
      // You should disable the optimizer when debugging
      // https://hardhat.org/hardhat-network/#solidity-optimizer-support
      optimizer: {
        enabled: true,
        runs: 800,
      },
    },
  },
  etherscan: {
    apiKey: process.env.BSCSCAN,
  },
  mocha: {
    timeout: 200000,
  },
  typechain: {
    outDir: "typechain",
    target: "ethers-v5",
  },
};

export default config;
