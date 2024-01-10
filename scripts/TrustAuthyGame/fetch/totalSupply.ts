import { ethers } from 'hardhat';
import { TrustAuthyGame } from '../../../types';
import { inisrizeWolfTribe } from '../../../lib/contractUtil';

async function main() {
  const [deployer, user1] = await ethers.getSigners();
  console.log(`deployer address: ${await deployer.getAddress()}`);
  console.log(`deployer balance: ${await deployer.getBalance()}`);

  const erc721: TrustAuthyGame = await inisrizeWolfTribe();
  const total = await erc721.totalSupply();

  console.log(total);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
