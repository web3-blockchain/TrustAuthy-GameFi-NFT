import { ethers } from 'hardhat';
import { BigNumber, providers, utils } from 'ethers';
import { TrustAuthyGameV2 } from '../../types';
import { inisrizeTrustAuthyGameV2 } from '../../lib/contractUtil';

async function main(tokenIds: number[], uris: string[]) {
  const [deployer] = await ethers.getSigners();
  console.log(`deployer address: ${await deployer.getAddress()}`);
  console.log(`deployer balance: ${await deployer.getBalance()}`);

  const erc721: TrustAuthyGameV2 = await inisrizeTrustAuthyGameV2();
  const estimateGas: BigNumber = await erc721
    .connect(deployer)
    .estimateGas.setMultipleUris(tokenIds, uris);
  const options: providers.TransactionRequest = {
    gasLimit: estimateGas,
  };
  const transaction: providers.TransactionResponse = await erc721
    .connect(deployer)
    .setMultipleUris(tokenIds, uris, options);
  await transaction.wait();

  console.log(transaction);
}

const tokenIds = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
];

const uris = [
  'https://trust-authy-api.vercel.app/metadata/gameFi.json',
  'https://trust-authy-api.vercel.app/metadata/gameFi.json',
  'https://trust-authy-api.vercel.app/metadata/gameFi.json',
  'https://trust-authy-api.vercel.app/metadata/gameFi.json',
  'https://trust-authy-api.vercel.app/metadata/gameFi.json',
  'https://trust-authy-api.vercel.app/metadata/gameFi.json',
  'https://trust-authy-api.vercel.app/metadata/gameFi.json',
  'https://trust-authy-api.vercel.app/metadata/gameFi.json',
  'https://trust-authy-api.vercel.app/metadata/gameFi.json',
  'https://trust-authy-api.vercel.app/metadata/gameFi.json',
  'https://trust-authy-api.vercel.app/metadata/gameFi.json',
  'https://trust-authy-api.vercel.app/metadata/gameFi.json',
  'https://trust-authy-api.vercel.app/metadata/gameFi.json',
  'https://trust-authy-api.vercel.app/metadata/gameFi.json',
  'https://trust-authy-api.vercel.app/metadata/gameFi.json',
  'https://trust-authy-api.vercel.app/metadata/gameFi.json',
  'https://trust-authy-api.vercel.app/metadata/gameFi.json',
  'https://trust-authy-api.vercel.app/metadata/gameFi.json',
];

main(tokenIds, uris).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
