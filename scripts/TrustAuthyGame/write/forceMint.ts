import { ethers } from 'hardhat';
import { env } from '../../../lib/config';
import { BigNumber, providers } from 'ethers';
import { TrustAuthyGame } from '../../../types';
import {
  JsonRpcProvider,
  inisrizeTrustAuthyGame,
} from '../../../lib/contractUtil';

export async function main(to: string, team: number) {
  const [deployer] = await ethers.getSigners();
  console.log(`deployer address: ${await deployer.getAddress()}`);
  console.log(`deployer balance: ${await deployer.getBalance()}`);

  const erc721: TrustAuthyGame = await inisrizeTrustAuthyGame();
  const estimateGas: BigNumber = await erc721
    .connect(deployer)
    .estimateGas.forceMint(to, team);
  const options: providers.TransactionRequest = {
    gasLimit: estimateGas,
    gasPrice: (await JsonRpcProvider.getGasPrice()).mul(2),
  };
  const transaction: providers.TransactionResponse = await erc721
    .connect(deployer)
    .forceMint(to, team, options);
  await transaction.wait();

  console.log(transaction);
}

const to = env.USER1_ADDRESS;
const team = 0;

main(to, team).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
