import { ethers } from 'hardhat';
import { TrustAuthyGame } from '../../../types';
import { inisrizeWolfTribe } from '../../../lib/contractUtil';

async function main(code: string) {
  const [deployer, user1] = await ethers.getSigners();
  console.log(`deployer address: ${await deployer.getAddress()}`);
  console.log(`deployer balance: ${await deployer.getBalance()}`);

  const erc721: TrustAuthyGame = await inisrizeWolfTribe();
  const response = await erc721.reorderAndDecryptCharacters(code);

  console.log(response);
}

const code = 'WY1G82e';

main(code).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
