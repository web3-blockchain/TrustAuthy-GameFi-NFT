import { ethers } from 'hardhat';
import { inisrizeTetherToken } from '../../lib/contractUtil';

async function main() {
  const [deployer, user] = await ethers.getSigners();
  console.log(`deployer address: ${await deployer.getAddress()}`);

  const usdt = await inisrizeTetherToken();
  let getBalance = await usdt.balanceOf(await deployer.getAddress());
  console.log('getBalance = ', getBalance.toString());

  getBalance = await usdt.balanceOf(await user.getAddress());
  console.log('getBalance = ', getBalance.toString());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
