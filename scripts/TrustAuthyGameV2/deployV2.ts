import { ethers } from 'hardhat';
import { utils } from 'ethers';

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(`deployer address: ${await deployer.getAddress()}`);
  console.log(`deployer balance: ${await deployer.getBalance()}`);
  let options = {
    gasPrice: utils.parseUnits('100', 'gwei'),
  };

  const token = await (
    await ethers.getContractFactory('TrustAuthyGameV2')
  ).deploy(options);
  await token.deployed();

  console.log('token address: ', token.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
