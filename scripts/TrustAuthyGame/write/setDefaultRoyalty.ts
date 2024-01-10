import { ethers } from 'hardhat';
import { env } from '../../../lib/config';
import { BigNumber, providers } from 'ethers';
import { TrustAuthyGame } from '../../../types';
import { inisrizeWolfTribe } from '../../../lib/contractUtil';

async function main(to: string) {
  const [deployer] = await ethers.getSigners();
  console.log(`deployer address: ${await deployer.getAddress()}`);
  console.log(`deployer balance: ${await deployer.getBalance()}`);

  const erc721: TrustAuthyGame = await inisrizeWolfTribe();
  const estimateGas: BigNumber = await erc721
    .connect(deployer)
    .estimateGas.setDefaultRoyalty(to, '10');
  const options: providers.TransactionRequest = {
    gasLimit: estimateGas,
  };
  const transaction: providers.TransactionResponse = await erc721
    .connect(deployer)
    .setDefaultRoyalty(to, '10', options);
  await transaction.wait();

  console.log(transaction);
}

const to = env.USER1_ADDRESS;

main(to).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
