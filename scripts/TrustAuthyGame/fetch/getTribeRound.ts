import { ethers } from 'hardhat';
import { TrustAuthyGame } from '../../../types';
import { inisrizeTrustAuthyGame } from '../../../lib/contractUtil';

async function main(round: number) {
  const [deployer, user1] = await ethers.getSigners();
  console.log(`deployer address: ${await deployer.getAddress()}`);
  console.log(`deployer balance: ${await deployer.getBalance()}`);

  const erc721: TrustAuthyGame = await inisrizeTrustAuthyGame();
  const tribeRound = await erc721.getTribeRound(round);
  console.log(`tribeRound:`, tribeRound);
  console.log(`tribeRound:`, tribeRound.count.toString());
}

const round = 0;

main(round).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
