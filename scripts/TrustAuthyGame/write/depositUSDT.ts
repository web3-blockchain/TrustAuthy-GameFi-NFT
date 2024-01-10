import { ethers } from 'hardhat';
import { BigNumber, providers, utils } from 'ethers';
import { TrustAuthyGame } from '../../../types';
import { inisrizeTrustAuthyGame } from '../../../lib/contractUtil';

async function main(amount: BigNumber, team: number) {
  const [deployer, user] = await ethers.getSigners();
  console.log(`user address: ${await user.getAddress()}`);
  console.log(`user balance: ${await user.getBalance()}`);

  const erc721: TrustAuthyGame = await inisrizeTrustAuthyGame();
  const estimateGas: BigNumber = await erc721
    .connect(user)
    .estimateGas.depositUSDT(amount, team);
  const options: providers.TransactionRequest = {
    gasLimit: estimateGas,
  };
  const transaction: providers.TransactionResponse = await erc721
    .connect(user)
    .depositUSDT(amount, team, options);
  await transaction.wait();

  console.log(transaction);
}

const amount = utils.parseUnits('20', 6);
const team = 0;

main(amount, team).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
