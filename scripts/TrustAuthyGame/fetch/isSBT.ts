import { ethers } from 'hardhat';
import { TrustAuthyGame } from '../../../types';
import { inisrizeTrustAuthyGame } from '../../../lib/contractUtil';

async function main(tokenId: number) {
  const [deployer] = await ethers.getSigners();
  console.log(`deployer address: ${await deployer.getAddress()}`);
  console.log(`deployer balance: ${await deployer.getBalance()}`);

  const erc721: TrustAuthyGame = await inisrizeTrustAuthyGame();
  const response = await erc721.isSBT(tokenId);

  console.log(response);
}

const tokenId = 1;

main(tokenId).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
