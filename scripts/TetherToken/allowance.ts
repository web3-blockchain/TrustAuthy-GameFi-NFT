import { ethers } from 'hardhat';
import { inisrizeTetherToken } from '../../lib/contractUtil';
import { env } from '../../lib/config';
import { utils } from 'ethers';

async function main() {
  const [deployer, user] = await ethers.getSigners();
  console.log(`deployer address: ${await deployer.getAddress()}`);

  const usdt = await inisrizeTetherToken();
  const allowance = await usdt
    // .connect(user)
    .allowance(await user.getAddress(), env.ERC1967PROXY_CONTRACT_ADDRESS);
  console.log('allowance = ', utils.formatUnits(allowance.toString(), 6));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
