import { ethers } from 'hardhat';
import { BigNumber, providers, utils } from 'ethers';
import { TrustAuthyGame } from '../../../types';
import { inisrizeTrustAuthyGame } from '../../../lib/contractUtil';

async function main(roundId: number) {
  const [deployer, user] = await ethers.getSigners();
  console.log(`deployer address: ${await deployer.getAddress()}`);
  console.log(`deployer balance: ${await deployer.getBalance()}`);

  const erc721: TrustAuthyGame = await inisrizeTrustAuthyGame();
  const estimateGas: BigNumber = await erc721
    .connect(deployer)
    .estimateGas.onTribeRound(roundId);
  const options: providers.TransactionRequest = {
    gasLimit: estimateGas,
  };
  const transaction: providers.TransactionResponse = await erc721
    .connect(deployer)
    .onTribeRound(roundId, options);
  await transaction.wait();

  console.log(transaction);
}

const roundId = 0;

main(roundId).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
