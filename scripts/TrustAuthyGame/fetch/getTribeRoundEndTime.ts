import { ethers } from 'hardhat';
import { TrustAuthyGame } from '../../../types';
import { inisrizeTrustAuthyGame } from '../../../lib/contractUtil';

async function main(round: number) {
  const [deployer, user1] = await ethers.getSigners();
  console.log(`deployer address: ${await deployer.getAddress()}`);
  console.log(`deployer balance: ${await deployer.getBalance()}`);

  const erc721: TrustAuthyGame = await inisrizeTrustAuthyGame();
  const tribeRound = await erc721.getTribeRound(round);
  const deadlineDate = new Date(Number(tribeRound.endTime.toString()) * 1000);
  console.log(deadlineDate);
}

const round = 1;

main(round).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
