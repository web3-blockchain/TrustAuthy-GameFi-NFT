import { ethers } from 'hardhat';
import { TrustAuthyGame } from '../../../types';
import { inisrizeWolfTribe } from '../../../lib/contractUtil';

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(`deployer address: ${await deployer.getAddress()}`);
  console.log(`deployer balance: ${await deployer.getBalance()}`);

  const erc721: TrustAuthyGame = await inisrizeWolfTribe();
  const response: string = await erc721.MINTER_ROLE();

  console.log(response);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
