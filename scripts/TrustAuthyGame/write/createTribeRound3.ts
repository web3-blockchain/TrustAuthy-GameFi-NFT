import { utils } from 'ethers';
import { createTribeRounds } from './createTribeRounds';
import { env } from '../../../lib/config';

const USDTprice = utils.parseUnits('1', 6);
const NTprice = utils.parseUnits('5', 18);
const startingId = 201;
const endingId = 300;
const startTime = Math.floor(Date.now() / 1000);
const endTime = Math.floor(Date.now() / 1000) + 86400;
const baseUri =
  'https://raw.githubusercontent.com/ZakAyesh/DynamicNFT/master/metadata/metadata2.json';
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
