import { ethers } from 'hardhat';
import { JsonRpcProvider } from '../lib/contractUtil';

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(`deployer address: ${await deployer.getAddress()}`);
  console.log(`deployer balance: ${await deployer.getBalance()}`);
  let options = {
    gasPrice: (await JsonRpcProvider.getGasPrice()).mul(4),
  };

  const token = await (
    await ethers.getContractFactory('TrustAuthyGame')
  ).deploy(options);
  await token.deployed();

  console.log('token address: ', token.address);

  const tProxy = await (
    await ethers.getContractFactory('TProxy')
  ).deploy(token.address, [], options);
  await tProxy.deployed();

  console.log('TProxy address: ', tProxy.address);

  const whash = await (
    await ethers.getContractFactory('WHash')
  ).deploy(tProxy.address, options);
  await whash.deployed();

  console.log('whash address: ', whash.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
