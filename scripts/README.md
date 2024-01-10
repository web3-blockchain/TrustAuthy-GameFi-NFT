```
hh node --fork  https://rpc.mantle.xyz
```

```
npm run compile

npx hardhat run --network local scripts/deploy.ts
npx hardhat run --network local scripts/initialize.ts
npx hardhat run --network local scripts/TrustAuthyGame/write/createTribeRound1.ts
npx hardhat run --network local scripts/TrustAuthyGame/fetch/reorderAndDecryptCharacters.ts
npx hardhat run --network local scripts/TrustAuthyGame/write/codeMint.ts
npx hardhat run --network local scripts/TrustAuthyGame/fetch/tokenURI.ts
npx hardhat run --network local scripts/TrustAuthyGame/write/reveal.ts
npx hardhat run --network local scripts/TrustAuthyGame/write/endTribeRound.ts
```

```
npx hardhat run --network local scripts/TrustAuthyGame/write/createTribeRound1.ts
npx hardhat run --network local scripts/TrustAuthyGame/write/createTribeRound2.ts
npx hardhat run --network local scripts/TrustAuthyGame/write/createTribeRound3.ts
npx hardhat run --network local scripts/TetherToken/approve.ts
npx hardhat run --network local scripts/TrustAuthyGame/write/deposit.ts
npx hardhat run --network local scripts/TrustAuthyGame/fetch/tokenURI.ts

npx hardhat run --network local scripts/TrustAuthyGame/write/forceMint.ts
npx hardhat run --network local scripts/TrustAuthyGame/write/burn.ts
npx hardhat run --network local scripts/TrustAuthyGame/fetch/MINTER_ROLE.ts
npx hardhat run --network local scripts/TrustAuthyGame/fetch/DEFAULT_ADMIN_ROLE.ts
npx hardhat run --network local scripts/TrustAuthyGame/fetch/totalSupply.ts
npx hardhat run --network local scripts/TrustAuthyGame/fetch/getAllTribeRounds.ts
npx hardhat run --network local scripts/TrustAuthyGame/fetch/getTribeRound.ts
npx hardhat run --network local scripts/TrustAuthyGame/write/setupRole.ts
npx hardhat run --network local scripts/TrustAuthyGame/write/revokeRole.ts
npx hardhat run --network local scripts/TrustAuthyGame/write/setDefaultRoyalty.ts
npx hardhat run --network local scripts/TrustAuthyGame/write/deleteDefaultRoyalty.ts
npx hardhat run --network local scripts/TrustAuthyGame/write/pause.ts
npx hardhat run --network local scripts/TrustAuthyGame/write/unpause.ts

npx hardhat run --network mantle scripts/TrustAuthyGame/write/reveal.ts
npx hardhat run --network mantle scripts/TrustAuthyGame/write/unreveal.ts

npx hardhat run --network mantle scripts/TrustAuthyGame/write/deposit.ts
npx hardhat run --network mantle scripts/TrustAuthyGame/write/updateTribeRound.ts


npx hardhat run --network mantle scripts/TrustAuthyGame/fetch/tribeRoundNumByTokenId.ts
npx hardhat run --network mantle scripts/TrustAuthyGame/write/endTribeRound.ts
npx hardhat run --network mantle xxxxxxxxx
npx hardhat run --network mantle xxxxxxxxx
```

```
https://raw.githubusercontent.com/ZakAyesh/DynamicNFT/master/metadata/metadata2.json
```

```
npx hardhat verify --network mantleTest 0xaa3Caa7818A275C01C96144fEA078aFFfFbC8731
npx hardhat verify --network mantleTest 0xa8Fe326B96A7b94A2150182fd02B4B7D92cF4145 --constructor-args scripts/arguments.ts
```

```
npx hardhat run --network mantle scripts/WMultiSend/deploy.ts
npx hardhat run --network mantle scripts/WMultiSend/initialize.ts
npx hardhat run --network mantle scripts/WMultiSend/getReceiver.ts
npx hardhat run --network mantle scripts/WMultiSend/depositToMultiSend.ts
npx hardhat run --network mantle scripts/WMultiSend/sendMNT.ts
npx hardhat run --network mantle scripts/WMultiSend/setupRole.ts
npx hardhat run --network mantle scripts/WMultiSend/withdraw.ts
```

```
npx hardhat run --network mantle scripts/WMultiSend/deploy.ts
npx hardhat run --network mantle scripts/WMultiSend/initialize.ts

npx hardhat run --network mantle scripts/WMultiSendV2/deploy.ts
npx hardhat run --network mantle scripts/WMultiSendProxy/upgradeImplementation.ts
npx hardhat run --network mantle scripts/WMultiSendProxy/implementation.ts

npx hardhat run --network mantle scripts/TetherToken/transfer.ts
npx hardhat run --network mantle scripts/TetherToken/balanceOf.ts
```
