import { ethers } from 'hardhat';
import { BigNumber, providers } from 'ethers';
import { JsonRpcProvider, inisrizeTProxy } from '../../lib/contractUtil';

export async function main(to: string) {
  const [deployer] = await ethers.getSigners();
  console.log(`deployer address: ${await deployer.getAddress()}`);
  console.log(`deployer balance: ${await deployer.getBalance()}`);

  const proxy = await inisrizeTProxy();
  const estimateGas: BigNumber = await proxy
    .connect(deployer)
    .estimateGas.upgradeImplementation(to);
  const options: providers.TransactionRequest = {
    gasLimit: estimateGas,
    gasPrice: (await JsonRpcProvider.getGasPrice()).mul(2),
  };
  const transaction: providers.TransactionResponse = await proxy
    .connect(deployer)
    .upgradeImplementation(to, options);
  await transaction.wait();

  console.log(transaction);
}

const to = '';

main(to).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
