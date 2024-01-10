import { ethers } from 'hardhat';
import { BigNumber, providers, utils } from 'ethers';
import { TrustAuthyGame } from '../../../types';
import {
  JsonRpcProvider,
  inisrizeTrustAuthyGame,
} from '../../../lib/contractUtil';

async function main(
  roundId: number,
  USDTprice: BigNumber,
  NTprice: BigNumber,
  startingId: number,
  endingId: number,
) {
  const [deployer, user] = await ethers.getSigners();
  console.log(`deployer address: ${await deployer.getAddress()}`);
  console.log(`deployer balance: ${await deployer.getBalance()}`);

  const erc721: TrustAuthyGame = await inisrizeTrustAuthyGame();
  const estimateGas: BigNumber = await erc721
    .connect(deployer)
    .estimateGas.updateTribeRound(
      roundId,
      USDTprice,
      NTprice,
      startingId,
      endingId,
    );
  const options: providers.TransactionRequest = {
    gasLimit: estimateGas,
    gasPrice: (await JsonRpcProvider.getGasPrice()).mul(2),
  };
  const transaction: providers.TransactionResponse = await erc721
    .connect(deployer)
    .updateTribeRound(
      roundId,
      USDTprice,
      NTprice,
      startingId,
      endingId,
      options,
    );
  await transaction.wait();

  console.log(transaction);
}

const roundId = 0;
const USDTprice = utils.parseUnits('0.0001', 6);
const NTprice = utils.parseUnits('0.0005', 18);
const startingId = 1;
const endingId = 500;

main(roundId, USDTprice, NTprice, startingId, endingId).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
