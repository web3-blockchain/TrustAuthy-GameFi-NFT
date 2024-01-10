import { ethers } from 'hardhat';
import { TrustAuthyGame } from '../../../types';
import { JsonRpcProvider, inisrizeTrustAuthyGame } from '../../../lib/contractUtil';
import { utils } from 'ethers';

async function main() {
  const [deployer, user1] = await ethers.getSigners();
  console.log(`deployer address: ${await deployer.getAddress()}`);
  console.log(`deployer balance: ${await deployer.getBalance()}`);

  const erc721: TrustAuthyGame = await inisrizeTrustAuthyGame();
  const erc721Balance = await JsonRpcProvider.getBalance(erc721.address);
  console.log(utils.formatUnits(erc721Balance, 18));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
