import { ethers } from 'hardhat';
import { JsonRpcProvider, inisrizeTetherToken } from '../lib/contractUtil';
import { env } from '../lib/config';
import { utils } from 'ethers';

async function main() {
  const [deployer, user1] = await ethers.getSigners();
  console.log(`deployer address: ${await deployer.getAddress()}`);
  const amount = utils.parseUnits('1');

  const gas = await JsonRpcProvider.getGasPrice();
  console.log(
    `Debug -----------------------------------------------------Debug`,
  );
  console.log(
    `Debug ~ file: sendTransaction.ts:12 ~ main ~ gas:`,
    gas.toString(),
  );
  console.log(
    `Debug ~ file: sendTransaction.ts:12 ~ main ~ gas:`,
    utils.parseUnits(gas.toString()),
  );
  console.log(
    `Debug -----------------------------------------------------Debug`,
  );

  const tx = await user1.sendTransaction({
    to: '0xE0AB9127450A1dC6468B979185Fb55C0a3a4Ea6a',
    value: amount,
    gasLimit: '21000',
    gasPrice: gas,
  });

  console.log('tx = ', tx);

  await tx.wait(1);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
