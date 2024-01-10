import { ethers } from 'hardhat';
import { env } from '../../../lib/config';
import { BigNumber, providers } from 'ethers';
import { TrustAuthyGame } from '../../../types';
import { inisrizeWolfTribe } from '../../../lib/contractUtil';

export async function transferFrom(from: string, to: string, tokenId: number) {
  const [deployer, user1] = await ethers.getSigners();
  console.log(`deployer address: ${await deployer.getAddress()}`);
  console.log(`deployer balance: ${await deployer.getBalance()}`);

  const erc721: TrustAuthyGame = await inisrizeWolfTribe();
  const estimateGas: BigNumber = await erc721
    .connect(deployer)
    .estimateGas.transferFrom(from, to, tokenId);
  const options: providers.TransactionRequest = {
    gasLimit: estimateGas,
  };
  const transaction: providers.TransactionResponse = await erc721
    .connect(deployer)
    .transferFrom(from, to, tokenId, options);
  await transaction.wait();

  console.log(transaction);
}

const from = env.DEPLOYER_ADDRESS;
const to = env.USER1_ADDRESS;
const tokenId = 1;

transferFrom(from, to, tokenId).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
