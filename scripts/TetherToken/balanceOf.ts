import { ethers } from 'hardhat';
import { inisrizeTetherToken } from '../../lib/contractUtil';
import { utils } from 'ethers';
import { env } from '../../lib/config';

async function main() {
  const [deployer, user1, user2, user3, user4, user5] =
    await ethers.getSigners();
  console.log(`deployer address: ${await deployer.getAddress()}`);
  const usdt = await inisrizeTetherToken();

  const deployerBalanceOf = await usdt
    .connect(deployer)
    .balanceOf(await deployer.getAddress());
  console.log(
    'deployerBalanceOf:',
    utils.formatUnits(deployerBalanceOf, 6),
    'USDT',
  );

  const user1BalanceOf = await usdt
    .connect(user1)
    .balanceOf(await user1.getAddress());
  console.log('user1BalanceOf:', utils.formatUnits(user1BalanceOf, 6), 'USDT');

  const user2BalanceOf = await usdt
    .connect(user2)
    .balanceOf(await user2.getAddress());
  console.log('user2BalanceOf:', utils.formatUnits(user2BalanceOf, 6), 'USDT');

  const user3BalanceOf = await usdt
    .connect(user3)
    .balanceOf(await user3.getAddress());
  console.log('user3BalanceOf:', utils.formatUnits(user3BalanceOf, 6), 'USDT');

  const user4BalanceOf = await usdt
    .connect(user4)
    .balanceOf(await user4.getAddress());
  console.log('user4BalanceOf:', utils.formatUnits(user4BalanceOf, 6), 'USDT');

  const user5BalanceOf = await usdt
    .connect(user5)
    .balanceOf(await user5.getAddress());
  console.log('user5BalanceOf:', utils.formatUnits(user5BalanceOf, 6), 'USDT');

  const tBalanceOf = await usdt.balanceOf(env.ERC1967PROXY_CONTRACT_ADDRESS);
  console.log('tBalanceOf:', utils.formatUnits(tBalanceOf, 6), 'USDT');

  const mBalanceOf = await usdt.balanceOf(env.WMULTISEND_CONTRACT_ADDRESS);
  console.log('mBalanceOf:', utils.formatUnits(mBalanceOf, 6), 'USDT');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
