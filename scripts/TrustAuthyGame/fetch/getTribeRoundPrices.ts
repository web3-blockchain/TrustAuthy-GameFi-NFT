import { ethers } from 'hardhat';
import { TrustAuthyGame } from '../../../types';
import { inisrizeWolfTribe } from '../../../lib/contractUtil';
import { utils } from 'ethers';

async function main(round: number) {
  const [deployer, user1] = await ethers.getSigners();
  console.log(`deployer address: ${await deployer.getAddress()}`);
  console.log(`deployer balance: ${await deployer.getBalance()}`);

  const erc721: TrustAuthyGame = await inisrizeWolfTribe();
  const tribeRound = await erc721.getTribeRound(round);
  console.log(utils.formatUnits(tribeRound.USDTprice, 6));
  console.log(utils.formatUnits(tribeRound.NTprice, 18));
}

const round = 0;

main(round).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
