import { providers } from 'ethers';

import { env } from './config';
import { TetherToken, TetherToken__factory, WMultiSend, WMultiSendProxy, WMultiSendProxy__factory, WMultiSendV2, WMultiSendV2__factory, WMultiSend__factory, TProxy, WProxy__factory, TrustAuthyGame, TrustAuthyGameV2, TrustAuthyGameV2__factory, TrustAuthyGame__factory } from '../types';

export const JsonRpcProvider = new providers.JsonRpcProvider(env.NODE_URL);
export const StaticJsonRpcProvider = new providers.StaticJsonRpcProvider(
  env.NODE_URL,
);

export async function inisrizeTrustAuthyGame(): Promise<TrustAuthyGame> {
  return await TrustAuthyGame__factory.connect(
    env.ERC1967PROXY_CONTRACT_ADDRESS,
    JsonRpcProvider,
  );
}

export async function inisrizeTrustAuthyGameV2(): Promise<TrustAuthyGameV2> {
  return await TrustAuthyGameV2__factory.connect(
    env.ERC1967PROXY_CONTRACT_ADDRESS,
    JsonRpcProvider,
  );
}

export async function inisrizeTetherToken(): Promise<TetherToken> {
  return await TetherToken__factory.connect(
    env.TETHERTOKEN_CONTRACT_ADDRESS,
    JsonRpcProvider,
  );
}
export async function inisrizeWProxy(): Promise<TProxy> {
  return await WProxy__factory.connect(
    env.ERC1967PROXY_CONTRACT_ADDRESS,
    JsonRpcProvider,
  );
}

export async function inisrizeWMultiSendProxy(): Promise<WMultiSendProxy> {
  return await WMultiSendProxy__factory.connect(
    env.WMULTISEND_CONTRACT_ADDRESS,
    JsonRpcProvider,
  );
}

export async function inisrizeWMultiSend(): Promise<WMultiSendV2> {
  return await WMultiSendV2__factory.connect(
    env.WMULTISEND_CONTRACT_ADDRESS,
    JsonRpcProvider,
  );
}
