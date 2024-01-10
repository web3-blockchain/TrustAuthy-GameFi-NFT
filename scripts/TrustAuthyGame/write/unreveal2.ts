import { ethers } from 'hardhat';
import { BigNumber, providers } from 'ethers';
import { TrustAuthyGame } from '../../../types';
import { inisrizeWolfTribe } from '../../../lib/contractUtil';

export async function maim(roundId: number) {
  const [deployer, user1] = await ethers.getSigners();
  console.log(`user1 address: ${await user1.getAddress()}`);
  console.log(`user1 balance: ${await user1.getBalance()}`);

  const erc721: TrustAuthyGame = await inisrizeWolfTribe();
  const estimateGas: BigNumber = await erc721
    .connect(user1)
    .estimateGas.unreveal(roundId, 2);
  const options: providers.TransactionRequest = {
    gasLimit: estimateGas,
  };
  const transaction: providers.TransactionResponse = await erc721
    .connect(user1)
    .unreveal(roundId, 2, options);
  await transaction.wait();

  console.log(transaction);
}

const roundId = 0;

maim(roundId).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
