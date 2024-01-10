import { ethers } from 'hardhat';
import { inisrizeTetherToken } from '../../lib/contractUtil';
import { utils } from 'ethers';

async function main() {
  const [deployer, user] = await ethers.getSigners();
  console.log(`deployer address: ${await deployer.getAddress()}`);
  const amount = utils.parseEther('1');

  const usdt = await inisrizeTetherToken();
  const tx = await usdt.connect(deployer).transferFrom(deployer, user, amount);
  console.log('tx = ', tx);

  await tx.wait(1);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
