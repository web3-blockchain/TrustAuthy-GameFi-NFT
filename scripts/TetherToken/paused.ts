import { ethers } from 'hardhat';
import { inisrizeTetherToken } from '../../lib/contractUtil';
import { env } from '../../lib/config';

async function main() {
  const [deployer, user] = await ethers.getSigners();
  console.log(`deployer address: ${await deployer.getAddress()}`);

  const usdt = await inisrizeTetherToken();
  const paused = await usdt.paused();
  console.log('paused = ', paused);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
