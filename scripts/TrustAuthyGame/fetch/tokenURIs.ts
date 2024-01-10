import { TrustAuthyGame } from '../../../types';
import { inisrizeWolfTribe } from '../../../lib/contractUtil';

async function main() {
  const erc721: TrustAuthyGame = await inisrizeWolfTribe();
  const tokenIds = await erc721.totalSupply();

  for (let tokenId = 1; tokenId <= Number(tokenIds.toString()); tokenId++) {
    try {
      const response: string = await erc721.tokenURI(tokenId);
      console.log(`TokenID ${tokenId}: ${response}`);
    } catch (error) {
      console.error(`Error with TokenID ${tokenId}:`, error);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
