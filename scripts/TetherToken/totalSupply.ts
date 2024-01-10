import { ethers } from 'hardhat';
import { inisrizeTetherToken } from '../../lib/contractUtil';

async function main() {
  const [deployer, user] = await ethers.getSigners();
  console.log(`deployer address: ${await deployer.getAddress()}`);

  const usdt = await inisrizeTetherToken();
  let totalSupply = await usdt.totalSupply();
  console.log('totalSupply = ', totalSupply.toString());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
