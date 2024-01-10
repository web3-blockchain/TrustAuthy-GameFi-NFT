import { ethers } from 'hardhat';
import { env } from '../../../lib/config';
import { BigNumber, providers } from 'ethers';
import { TrustAuthyGame } from '../../../types';
import { inisrizeWolfTribe } from '../../../lib/contractUtil';

export async function main(to: string) {
  const [deployer, user1, user2] = await ethers.getSigners();
  console.log(`deployer address: ${await deployer.getAddress()}`);
  console.log(`deployer balance: ${await deployer.getBalance()}`);

  const erc721: TrustAuthyGame = await inisrizeWolfTribe();
  const role: string = await erc721.DEFAULT_ADMIN_ROLE();

  const estimateGas: BigNumber = await erc721
    .connect(deployer)
    .estimateGas.revokeRole(role, to);
  const options: providers.TransactionRequest = {
    gasLimit: estimateGas,
  };
  const transaction: providers.TransactionResponse = await erc721
    .connect(deployer)
    .revokeRole(role, to, options);
  await transaction.wait();

  console.log(transaction);
}

const to = env.USER1_ADDRESS;

main(to).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
