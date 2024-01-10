import { ethers } from 'hardhat';
import { inisrizeTetherToken } from '../../lib/contractUtil';
import { env } from '../../lib/config';
import { utils } from 'ethers';

async function main() {
  const [deployer, user1, user2, user3, user4, user5] =
    await ethers.getSigners();
  console.log(`deployer address: ${await deployer.getAddress()}`);
  const amount = utils.parseUnits('10', 6);

  const usdt = await inisrizeTetherToken();
  const tx = await usdt
    .connect(user5)
    .transfer(env.WMULTISEND_CONTRACT_ADDRESS, amount);
  console.log('tx = ', tx);

  await tx.wait(1);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
