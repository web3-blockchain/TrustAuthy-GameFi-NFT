import { ethers } from 'hardhat';
import { BigNumber, providers, utils } from 'ethers';
import { TrustAuthyGame } from '../../../types';
import {
  JsonRpcProvider,
  inisrizeTetherToken,
  inisrizeTrustAuthyGame,
} from '../../../lib/contractUtil';

async function main() {
  const [deployer, user1, user2] = await ethers.getSigners();
  console.log(`deployer address: ${await deployer.getAddress()}`);
  console.log(`deployer balance: ${await deployer.getBalance()}`);

  const erc721: TrustAuthyGame = await inisrizeTrustAuthyGame();
  const usdt = await inisrizeTetherToken();

  const balance = await usdt.balanceOf(erc721.address);
  console.log(balance.toString());

  if (Number(balance.toString()) > 0) {
    const estimateGas: BigNumber = await erc721
      .connect(deployer)
      .estimateGas.withdrawUSDT(balance);
    const options: providers.TransactionRequest = {
      gasLimit: estimateGas,
    };
    const transaction: providers.TransactionResponse = await erc721
      .connect(deployer)
      .withdrawUSDT(balance, options);
    await transaction.wait(1);

    console.log(transaction);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
