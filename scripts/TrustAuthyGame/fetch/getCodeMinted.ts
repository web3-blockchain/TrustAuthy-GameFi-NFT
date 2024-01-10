import { TrustAuthyGame } from '../../../types';
import {
  JsonRpcProvider,
  inisrizeTrustAuthyGame,
} from '../../../lib/contractUtil';
const webhookUrl =
  'https://hooks.slack.com/services/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';
// 'https://hooks.slack.com/services/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'

async function main(round: number) {
  const erc721: TrustAuthyGame = await inisrizeTrustAuthyGame();
  const tribeRoundCount = (await erc721.getTribeRound(round)).count.toString();
  console.log(`tribeRoundCount:`, tribeRoundCount);

  const fromBlock = 21535039;
  const latestBlock = await JsonRpcProvider.getBlockNumber();
  const maxRange = 50000;
  let currentBlock = fromBlock;
  const teams: string[] = [];

  while (currentBlock < latestBlock) {
    const toBlock = Math.min(currentBlock + maxRange, latestBlock);
    const filterCodeMinted = erc721.filters.CodeMinted();
    const events = await erc721.queryFilter(
      filterCodeMinted,
      currentBlock,
      toBlock,
    );

    events.forEach((event: { args: { team: { toString: () => string } } }) => {
      teams.push(event.args.team.toString());
    });

    currentBlock = toBlock + 1;
  }

  const strings = convertNumbersToTeams(teams);
  const teamCounts = countElements(strings);
  const formattedTeamCounts = Object.entries(teamCounts)
    .map(
      ([team, count]) =>
        `*${team.charAt(0).toUpperCase() + team.slice(1)}:* ${count}`,
    )
    .join('\n');

  const message = {
    text: '販売・陣営報告',
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '*販売・陣営報告* :bar_chart:',
        },
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*販売個数:*\n${tribeRoundCount}`,
          },
          {
            type: 'mrkdwn',
            text: `*陣営数:*\n${formattedTeamCounts}`,
          },
        ],
      },
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: `報告時刻: ${new Date().toLocaleString()}`,
          },
        ],
      },
    ],
  };

  await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

const round = 0;

main(round).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

function convertNumbersToTeams(numbers: string[]): string[] {
  return numbers.map((number) => {
    switch (number) {
      case '0':
        return 'werewolf';
      case '1':
        return 'human';
      case '2':
        return 'vampire';
      default:
        return 'unknown';
    }
  });
}

function countElements(elements: string[]): Record<string, number> {
  const counts: Record<string, number> = {
    werewolf: 0,
    human: 0,
    vampire: 0,
  };

  elements.forEach((element) => {
    counts[element] = (counts[element] || 0) + 1;
  });

  return counts;
}
