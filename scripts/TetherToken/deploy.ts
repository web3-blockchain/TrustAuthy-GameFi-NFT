import { ethers } from 'hardhat';
import { TetherToken__factory } from '../../types';
import { BigNumberish, BytesLike } from 'ethers';
async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(`deployer address: ${await deployer.getAddress()}`);

  const _initialSupply: BigNumberish = BigInt(1000000000000 * 10 ** 18);

  const usdtTokenFactory: TetherToken__factory =
    await ethers.getContractFactory('TetherToken');
  const usdtToken = await usdtTokenFactory
    .connect(deployer)
    .deploy(_initialSupply, 'Tether', 'USDT', 6);

  console.log(`usdt deployed to ${usdtToken.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
