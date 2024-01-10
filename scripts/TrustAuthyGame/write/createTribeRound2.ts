import { utils } from 'ethers';
import { createTribeRounds } from './createTribeRounds';
import { env } from '../../../lib/config';

const USDTprice = utils.parseUnits('1', 6);
const NTprice = utils.parseUnits('5', 18);
const startingId = 101;
const endingId = 200;
const startTime = Math.floor(Date.now() / 1000);
const endTime = Math.floor(Date.now() / 1000) + 86400;
const baseUri =
  'https://ipfs.io/ipfs/Qmdb3eUWuubWSisbHwvgEc4PJSiJCfX78G6bqKy7chbz1N/100';
const whash = env.WHASH_CONTRACT_ADDRESS;
createTribeRounds(
  USDTprice,
  NTprice,
  startingId,
  endingId,
  startTime,
  endTime,
  baseUri,
  whash,
).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
