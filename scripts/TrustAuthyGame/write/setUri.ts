import { ethers } from 'hardhat';
import { BigNumber, providers } from 'ethers';
import { TrustAuthyGame } from '../../../types';
import { inisrizeTrustAuthyGame } from '../../../lib/contractUtil';

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
  };
  const transaction: providers.TransactionResponse = await erc721
    .connect(deployer)
    .setUri(tokenId, uri, options);
  await transaction.wait();

  console.log(transaction);
}

const tokenId = 1;
const uri =
  'https://wwc-tribe.vercel.app/testnet/metadata/Werewolf_Defeat.json';

main(tokenId, uri).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
