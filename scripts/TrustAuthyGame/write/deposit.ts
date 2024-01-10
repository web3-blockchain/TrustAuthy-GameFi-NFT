import { ethers } from 'hardhat';
import { BigNumber, providers, utils } from 'ethers';
import { TrustAuthyGame } from '../../../types';
import { inisrizeWolfTribe } from '../../../lib/contractUtil';

async function main(amount: BigNumber, team: number) {
  const [deployer, user1, user2] = await ethers.getSigners();
  console.log(`user1 address: ${await user1.getAddress()}`);
  console.log(`user1 balance: ${await user1.getBalance()}`);

  const erc721: TrustAuthyGame = await inisrizeWolfTribe();
  const estimateGas: BigNumber = await erc721
    .connect(user1)
    .estimateGas.deposit(team, { value: amount });
  const options: providers.TransactionRequest = {
    gasLimit: estimateGas,
    value: amount,
  };
  const transaction: providers.TransactionResponse = await erc721
    .connect(user1)
    .deposit(team, options);
  await transaction.wait();

  console.log(transaction);
}

const amount = utils.parseUnits('0.000005', 18);
const team = 0;

main(amount, team).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
