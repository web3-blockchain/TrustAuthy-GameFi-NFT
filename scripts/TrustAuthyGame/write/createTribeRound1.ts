import { utils } from 'ethers';
import { createTribeRounds } from './createTribeRounds';
import { env } from '../../../lib/config';

const USDTprice = utils.parseUnits('20', 6);
const NTprice = utils.parseUnits('40', 18);
const startingId = 1;
const endingId = 500;
const startTime = Math.floor(Date.now() / 1000);
const oneWeekInSeconds = 86400 * 30;
const endTime = Math.floor(Date.now() / 1000) + oneWeekInSeconds;
const baseUri = 'https://trust-authy-api.vercel.app/metadata/gameFi.json';
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
