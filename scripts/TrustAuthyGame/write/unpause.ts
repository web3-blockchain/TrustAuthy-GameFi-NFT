import { ethers } from 'hardhat';
import { BigNumber, providers } from 'ethers';
import { TrustAuthyGame } from '../../../types';
import {
  JsonRpcProvider,
  inisrizeTrustAuthyGame,
} from '../../../lib/contractUtil';

export async function main(tokenId: number) {
  const [deployer, user1] = await ethers.getSigners();
  console.log(`deployer address: ${await deployer.getAddress()}`);
  console.log(`deployer balance: ${await deployer.getBalance()}`);

  const erc721: TrustAuthyGame = await inisrizeTrustAuthyGame();
  const estimateGas: BigNumber = await erc721
    .connect(deployer)
    .estimateGas.unpause();
  const options: providers.TransactionRequest = {
    gasLimit: estimateGas,
    gasPrice: (await JsonRpcProvider.getGasPrice()).mul(2),
  };
  const transaction: providers.TransactionResponse = await erc721
    .connect(deployer)
    .unpause(options);
  await transaction.wait();

  console.log(transaction);
}

const tokenId = 1;

main(tokenId).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
