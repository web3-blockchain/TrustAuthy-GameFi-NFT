import 'dotenv';
import 'solidity-docgen';
import 'solidity-coverage';
import 'hardhat-gas-reporter';
import '@typechain/hardhat';
import 'hardhat-deploy-ethers';
import 'hardhat-contract-sizer';
import '@nomicfoundation/hardhat-verify';

import { env } from './lib/config';
import { HardhatUserConfig } from 'hardhat/config';

const defultNetworksUserConfig = function () {
  return {
    chainId: env.CHAIN_ID,
    url: env.NODE_URL,

    accounts: env.ACCOUNTS,
  };
};

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  networks: {
    local: defultNetworksUserConfig(),
    goerli: defultNetworksUserConfig(),
    sepolia: defultNetworksUserConfig(),
    mumbai: defultNetworksUserConfig(),
    polygon: defultNetworksUserConfig(),
    mainnet: defultNetworksUserConfig(),
    mantleTest: defultNetworksUserConfig(),
    mantle: defultNetworksUserConfig(),
  },

  docgen: {
    outputDir: './docs',
    pages: 'files',
  },

  typechain: {
    outDir: './types',
    target: 'ethers-v5',
  },

  gasReporter: {
    enabled: true,
    currency: 'USD',
    fast: true,
    onlyCalledMethods: true,
  },

  contractSizer: {
    // alphaSort: false,
    // disambiguatePaths: false,
    // runOnCompile: true,
    // strict: false,
  },

  paths: {
    sources: './src',
    cache: './cache',
    artifacts: './artifacts',
  },

  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
    customChains: [
      {
        network: 'mantleTest',
        chainId: 5001,
        urls: {
          apiURL: 'https://explorer.mantle.xyz/api',
          browserURL: 'https://explorer.mantle.xyz',
        },
      },
    ],
  },

  solidity: {
    compilers: [
      {
        version: '0.8.18',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: '0.4.17',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
};

export default config;
