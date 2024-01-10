import { ethers } from 'hardhat';
import { TrustAuthyGame } from '../../../types';
import { inisrizeTrustAuthyGame } from '../../../lib/contractUtil';

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(`deployer address: ${await deployer.getAddress()}`);
  console.log(`deployer balance: ${await deployer.getBalance()}`);

  const erc721: TrustAuthyGame = await inisrizeTrustAuthyGame();
  const n = await erc721.tribeRoundNumber();

  console.log(n);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
