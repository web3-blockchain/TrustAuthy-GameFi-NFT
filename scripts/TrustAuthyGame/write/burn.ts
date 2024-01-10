import { ethers } from 'hardhat';
import { BigNumber, providers } from 'ethers';
import { TrustAuthyGame } from '../../../types';
import { inisrizeTrustAuthyGame } from '../../../lib/contractUtil';

export async function main(tokenId: number) {
  const [deployer, user1, user2] = await ethers.getSigners();
  console.log(`user2 address: ${await user2.getAddress()}`);
  console.log(`user2 balance: ${await user2.getBalance()}`);

  const erc721: TrustAuthyGame = await inisrizeTrustAuthyGame();
  const estimateGas: BigNumber = await erc721
    .connect(user2)
    .estimateGas.burn(tokenId);
  const options: providers.TransactionRequest = {
    gasLimit: estimateGas,
  };
  const transaction: providers.TransactionResponse = await erc721
    .connect(user2)
    .burn(tokenId, options);
  await transaction.wait();

  console.log(transaction);
}

const tokenId = 1;

main(tokenId).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
