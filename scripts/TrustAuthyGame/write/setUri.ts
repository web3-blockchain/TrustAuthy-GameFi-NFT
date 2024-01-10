import { ethers } from 'hardhat';
import { BigNumber, providers } from 'ethers';
import { TrustAuthyGame } from '../../../types';
import {
  JsonRpcProvider,
  inisrizeTrustAuthyGame,
} from '../../../lib/contractUtil';

export async function main(tokenId: number, uri: string) {
  const [deployer, user1, user2] = await ethers.getSigners();
  console.log(`deployer address: ${await deployer.getAddress()}`);
  console.log(`deployer balance: ${await deployer.getBalance()}`);

  const erc721: TrustAuthyGame = await inisrizeTrustAuthyGame();
  const estimateGas: BigNumber = await erc721
    .connect(deployer)
    .estimateGas.setUri(tokenId, uri);
  const options: providers.TransactionRequest = {
    gasLimit: estimateGas,
    gasPrice: (await JsonRpcProvider.getGasPrice()).mul(2),
  };
  const transaction: providers.TransactionResponse = await erc721
    .connect(deployer)
    .setUri(tokenId, uri, options);
  await transaction.wait();

  console.log(transaction);
}

const tokenId = 1;
const uri = 'https://trust-authy-api.vercel.app/metadata/gameFi.json';

main(tokenId, uri).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
