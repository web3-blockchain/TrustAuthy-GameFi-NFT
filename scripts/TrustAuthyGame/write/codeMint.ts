import { ethers } from 'hardhat';
import { BigNumber, providers, utils } from 'ethers';
import { TrustAuthyGame } from '../../../types';
import {
  JsonRpcProvider,
  inisrizeTrustAuthyGame,
} from '../../../lib/contractUtil';

async function main(code: string, team: number) {
  const [deployer, user1, user2] = await ethers.getSigners();
  console.log(`deployer address: ${await deployer.getAddress()}`);
  console.log(`deployer balance: ${await deployer.getBalance()}`);

  const erc721: TrustAuthyGame = await inisrizeTrustAuthyGame();
  const estimateGas: BigNumber = await erc721
    .connect(user2)
    .estimateGas.codeMint(code, team);
  const options: providers.TransactionRequest = {
    gasLimit: estimateGas,
    gasPrice: (await JsonRpcProvider.getGasPrice()).mul(2),
  };
  const transaction: providers.TransactionResponse = await erc721
    .connect(user2)
    .codeMint(code, team, options);
  await transaction.wait();

  console.log(transaction);
}

const code = 'TU1e03S';
const team = 0;

main(code, team).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
