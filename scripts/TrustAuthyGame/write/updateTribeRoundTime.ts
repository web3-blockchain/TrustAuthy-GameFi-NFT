import { ethers } from 'hardhat';
import { BigNumber, providers, utils } from 'ethers';
import { TrustAuthyGame } from '../../../types';
import { inisrizeTrustAuthyGame } from '../../../lib/contractUtil';

async function main(roundId: number, startTime: number, endTime: number) {
  const [deployer, user] = await ethers.getSigners();
  console.log(`deployer address: ${await deployer.getAddress()}`);
  console.log(`deployer balance: ${await deployer.getBalance()}`);

  const erc721: TrustAuthyGame = await inisrizeTrustAuthyGame();
  const estimateGas: BigNumber = await erc721
    .connect(deployer)
    .estimateGas.updateTribeRoundTime(roundId, startTime, endTime);
  const options: providers.TransactionRequest = {
    gasLimit: estimateGas,
  };
  const transaction: providers.TransactionResponse = await erc721
    .connect(deployer)
    .updateTribeRoundTime(roundId, startTime, endTime, options);
  await transaction.wait();

  console.log(transaction);
}

const roundId = 0;
const startTime = Math.floor(Date.now() / 1000) - 1;
const endTime = Math.floor(Date.now() / 1000);

main(roundId, startTime, endTime).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
