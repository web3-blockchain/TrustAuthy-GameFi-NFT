import { ethers } from 'hardhat';
import { BigNumber, providers } from 'ethers';
import { env } from '../../lib/config';
import { TrustAuthyGame } from '../../types';
import { inisrizeWProxy } from '../../lib/contractUtil';

export async function main(to: string) {
  const [deployer] = await ethers.getSigners();
  console.log(`deployer address: ${await deployer.getAddress()}`);
  console.log(`deployer balance: ${await deployer.getBalance()}`);

  const proxy = await inisrizeWProxy();
  const estimateGas: BigNumber = await proxy
    .connect(deployer)
    .estimateGas.upgradeImplementation(to);
  const options: providers.TransactionRequest = {
    gasLimit: estimateGas,
  };
  const transaction: providers.TransactionResponse = await proxy
    .connect(deployer)
    .upgradeImplementation(to, options);
  await transaction.wait();

  console.log(transaction);
}

const to = '0xb2e0EFb98f5D07349Bf80ba1dd08C62E42a2d368';

main(to).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
