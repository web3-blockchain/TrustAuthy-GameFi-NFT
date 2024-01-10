import { ethers } from 'hardhat';
import { BigNumber, providers } from 'ethers';
import { TrustAuthyGame } from '../../../types';
import { inisrizeWolfTribe } from '../../../lib/contractUtil';

export async function createTribeRounds(
  USDTprice: BigNumber,
  NTprice: BigNumber,
  startingId: number,
  endingId: number,
  startTime: number,
  endTime: number,
  baseUri: string,
  whash: string,
) {
  const [deployer, user] = await ethers.getSigners();
  console.log(`deployer address: ${await deployer.getAddress()}`);
  console.log(`deployer balance: ${await deployer.getBalance()}`);

  const erc721: TrustAuthyGame = await inisrizeWolfTribe();
  const estimateGas: BigNumber = await erc721
    .connect(deployer)
    .estimateGas.createTribeRound(
      USDTprice,
      NTprice,
      startingId,
      endingId,
      startTime,
      endTime,
      baseUri,
      whash,
    );
  const options: providers.TransactionRequest = {
    gasLimit: estimateGas,
  };
  const transaction: providers.TransactionResponse = await erc721
    .connect(deployer)
    .createTribeRound(
      USDTprice,
      NTprice,
      startingId,
      endingId,
      startTime,
      endTime,
      baseUri,
      whash,
      options,
    );
  await transaction.wait();

  console.log(transaction);
}
