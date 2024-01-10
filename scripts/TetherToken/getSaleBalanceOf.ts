import { ethers } from 'hardhat';
import { inisrizeTetherToken } from '../../lib/contractUtil';
import { env } from '../../lib/config';

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(`deployer address: ${await deployer.getAddress()}`);

  const usdt = await inisrizeTetherToken();
  const getBalance = await usdt.balanceOf(env.ERC1967PROXY_CONTRACT_ADDRESS);
  console.log('getBalance = ', getBalance.toString());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
