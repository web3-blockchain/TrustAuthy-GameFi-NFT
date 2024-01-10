import { TrustAuthyGame } from '../../../types';
import { JsonRpcProvider, inisrizeTrustAuthyGame } from '../../../lib/contractUtil';
import chalk from 'chalk';

async function main() {
  const erc721: TrustAuthyGame = await inisrizeTrustAuthyGame();

  const fromBlock = 21535039;
  const latestBlock = await JsonRpcProvider.getBlockNumber();
  const maxRange = 50000;
  let currentBlock = fromBlock;

  // テーブルヘッダーをループの外に移動
  console.log(
    `| Token ID | User                                      | Team     |`,
  );
  console.log(
    `|----------|------------------------------------------|----------|`,
  );

  while (currentBlock < latestBlock) {
    const toBlock = Math.min(currentBlock + maxRange, latestBlock);

    const filter = erc721.filters.CodeMinted();
    const events = await erc721.queryFilter(filter, currentBlock, toBlock);

    for (const event of events) {
      const team = convertNumbersToTeams(event.args.team.toString());
      const code = event.args.code;
      console.log(
        `| ${event.args.tokenId
          .toString()
          .padEnd(8)} | ${event.args.user.padEnd(42)} | ${getTeamColor(
          team,
        ).padEnd(8)} | ${code.padEnd(8)} |`,
      );
    }

    currentBlock = toBlock + 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

function convertNumbersToTeams(n: string): string {
  switch (n) {
    case '0':
      return 'werewolf';
    case '1':
      return 'human';
    case '2':
      return 'vampire';
    default:
      return 'unknown';
  }
}

function getTeamColor(team: string) {
  switch (team) {
    case 'werewolf':
      return chalk.blue(team);
    case 'human':
      return chalk.yellow(team);
    case 'vampire':
      return chalk.green(team);
    default:
      return team;
  }
}
