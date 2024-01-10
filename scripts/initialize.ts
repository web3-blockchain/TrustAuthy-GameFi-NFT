import { ethers } from 'hardhat';
import { BigNumber, providers } from 'ethers';
import { TrustAuthyGame } from '../types';
import { inisrizeWolfTribe } from '../lib/contractUtil';
import { env } from '../lib/config';

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(`deployer address: ${await deployer.getAddress()}`);
  console.log(`deployer balance: ${await deployer.getBalance()}`);

  const erc721: TrustAuthyGame = await inisrizeWolfTribe();
  const estimateGas: BigNumber = await erc721
    .connect(deployer)
    .estimateGas.initialize(
      'Sample GameFi NFT',
      'SGNFT',
      await deployer.getAddress(),
      await deployer.getAddress(),
      '0',
      env.TETHERTOKEN_CONTRACT_ADDRESS,
    );
  const options: providers.TransactionRequest = {
    gasLimit: estimateGas,
  };

  const transaction: providers.TransactionResponse = await erc721
    .connect(deployer)
    .initialize(
      'Sample GameFi NFT',
      'SGNFT',
      await deployer.getAddress(),
      await deployer.getAddress(),
      '0',
      env.TETHERTOKEN_CONTRACT_ADDRESS,
      options,
    );
  await transaction.wait();

  console.log(transaction);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
