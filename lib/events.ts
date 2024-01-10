import { CodeMintedEventFilter, TrustAuthyGame } from "../types/src/TrustAuthyGame";
import { JsonRpcProvider, inisrizeWolfTribe } from "./contractUtil";
const fromBlock = 21535039;
let currentBlock = fromBlock;

async function fetchDeposited(round: number) {
    const erc721: TrustAuthyGame = await inisrizeWolfTribe();
    const fromBlock = 21535039;
    const latestBlock = await JsonRpcProvider.getBlockNumber();
    const maxRange = 50000;
    let currentBlock = fromBlock;
    const teams: string[] = [];

    while (currentBlock < latestBlock) {
      const toBlock = Math.min(currentBlock + maxRange, latestBlock);
      const filterDeposited = erc721.filters.CodeMinted();
      const events = await erc721.queryFilter(filterDeposited, currentBlock, toBlock);

      events.forEach((event: { args: { team: { toString: () => string } } }) => {
        teams.push(event.args.team.toString());
      });

      currentBlock = toBlock + 1;
    }
    currentBlock = fromBlock;

    return
}

async function fetchCodeMinted() {
    const erc721: TrustAuthyGame = await inisrizeWolfTribe();
    const fromBlock = 21535039;
    const latestBlock = await JsonRpcProvider.getBlockNumber();
    const maxRange = 50000;
    let currentBlock = fromBlock;
    const teams: string[] = [];

    while (currentBlock < latestBlock) {
      const toBlock = Math.min(currentBlock + maxRange, latestBlock);
      const filterCodeMinted = erc721.filters.CodeMinted();
      const events = await erc721.queryFilter(filterCodeMinted, currentBlock, toBlock);

      events.forEach((event: { args: { team: { toString: () => string } } }) => {
        teams.push(event.args.team.toString());
      });

      currentBlock = toBlock + 1;
    }

    currentBlock = fromBlock;
}
