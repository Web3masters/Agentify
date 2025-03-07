require('dotenv').config();
// Use a minimal set of plugins to avoid version conflicts
require("@nomicfoundation/hardhat-verify");
require("@nomicfoundation/hardhat-ethers");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    aurora_testnet: {
      url: 'https://testnet.aurora.dev',
      chainId: 1313161555,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      gasPrice: 1000000000,
    },
    hardhat: {
      chainId: 1313161555,
      forking: {
        url: "https://testnet.aurora.dev",
        enabled: true,
      },
    }
  },
  etherscan: {
    apiKey: {
      aurora_testnet: process.env.AURORASCAN_API_KEY || "",
    },
    customChains: [
      {
        network: "aurora_testnet",
        chainId: 1313161555,
        urls: {
          apiURL: "https://explorer.testnet.aurora.dev/api",
          browserURL: "https://explorer.testnet.aurora.dev",
        },
      },
    ],
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
}