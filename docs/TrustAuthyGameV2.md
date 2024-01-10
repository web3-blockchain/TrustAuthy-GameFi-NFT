# Solidity API

## TrustAuthyGameV2

### NotExists

```solidity
error NotExists(uint256 tokenId)
```

### InsufficientUSDTAllowance

```solidity
error InsufficientUSDTAllowance()
```

### InsufficientUSDT

```solidity
error InsufficientUSDT()
```

### InvalidTeamIndex

```solidity
error InvalidTeamIndex(uint256 teamIndex)
```

### InsufficientETHBalance

```solidity
error InsufficientETHBalance()
```

### InsufficientContractUSDTBalance

```solidity
error InsufficientContractUSDTBalance()
```

### InsufficientContractERC20Balance

```solidity
error InsufficientContractERC20Balance()
```

### RoundNotExists

```solidity
error RoundNotExists(uint256 roundId)
```

### InvalidTime

```solidity
error InvalidTime(uint256 startTime, uint256 endTime)
```

### InvalidRecipient

```solidity
error InvalidRecipient()
```

### InvalidRound

```solidity
error InvalidRound(uint256 roundId)
```

### InsufficientFunds

```solidity
error InsufficientFunds(uint256 sent, uint256 required)
```

### RoundHasEnded

```solidity
error RoundHasEnded(uint256 roundId)
```

### TribeRoundTimeUpdated

```solidity
event TribeRoundTimeUpdated(uint256 roundId, uint256 startTime, uint256 endTime)
```

### TokenRoyaltySet

```solidity
event TokenRoyaltySet(uint256 tokenId, address recipient, uint96 value)
```

### DefaultRoyaltySet

```solidity
event DefaultRoyaltySet(address recipient, uint96 value)
```

### DefaultRoyaltyDeleted

```solidity
event DefaultRoyaltyDeleted()
```

### UriSet

```solidity
event UriSet(uint256 tokenId, string uri)
```

### USDTDeposited

```solidity
event USDTDeposited(uint256 tokenId, address user, uint256 team, uint256 roundId, uint256 amount)
```

### Deposited

```solidity
event Deposited(uint256 tokenId, address user, uint256 team, uint256 roundId, uint256 amount)
```

### CodeMinted

```solidity
event CodeMinted(uint256 tokenId, address user, uint256 team, uint256 roundId, string code)
```

### ForceMint

```solidity
event ForceMint(uint256 tokenId, address user, uint256 team)
```

### TribeRound

```solidity
struct TribeRound {
  uint256 USDTprice;
  uint256 NTprice;
  uint256 startingId;
  uint256 endingId;
  uint256 startTime;
  uint256 endTime;
  uint256 count;
  string baseUri;
  bool revealed;
  contract IWHash whash;
  bool isEnd;
}
```

### MINTER_ROLE

```solidity
bytes32 MINTER_ROLE
```

### WITHDRAW_ROLE

```solidity
bytes32 WITHDRAW_ROLE
```

### initialize

```solidity
function initialize() public
```

### setTokenRoyalty

```solidity
function setTokenRoyalty(uint256 _tokenId, address _recipient, uint96 _value) external
```

### setDefaultRoyalty

```solidity
function setDefaultRoyalty(address _recipient, uint96 _value) public
```

### deleteDefaultRoyalty

```solidity
function deleteDefaultRoyalty() external
```

### supportsInterface

```solidity
function supportsInterface(bytes4 interfaceId) public view virtual returns (bool)
```

### pause

```solidity
function pause() external
```

### unpause

```solidity
function unpause() external
```

### _nextTokenId

```solidity
function _nextTokenId() internal returns (uint256)
```

### totalSupply

```solidity
function totalSupply() public view returns (uint256)
```

### _mintTo

```solidity
function _mintTo(address _to, uint256 _team) internal returns (uint256 tokenId)
```

### setUri

```solidity
function setUri(uint256 _tokenId, string _uri) public
```

### setMultipleUris

```solidity
function setMultipleUris(uint256[] _tokenIds, string[] _uris) external
```

### tokenURI

```solidity
function tokenURI(uint256 _tokenId) public view returns (string)
```

### depositUSDT

```solidity
function depositUSDT(uint256 _amount, uint256 _team) external
```

### deposit

```solidity
function deposit(uint256 _team) external payable
```

### codeMint

```solidity
function codeMint(string _code, uint256 _team) external
```

### forceMint

```solidity
function forceMint(address _to, uint256 _team) external
```

### setupRole

```solidity
function setupRole(bytes32 _role, address _account) external
```

### createTribeRound

```solidity
function createTribeRound(uint256 _USDTprice, uint256 _NTprice, uint256 _startingId, uint256 _endingId, uint256 _startTime, uint256 _endTime, string _baseUri, address _whash) external
```

### updateTribeRoundTime

```solidity
function updateTribeRoundTime(uint256 _roundId, uint256 _startTime, uint256 _endTime) external
```

### updateTribeRoundBaseUri

```solidity
function updateTribeRoundBaseUri(uint256 _roundId, string _baseUri) external
```

### updateTribeRoundWhash

```solidity
function updateTribeRoundWhash(uint256 _roundId, address _whash) external
```

### updateTribeRound

```solidity
function updateTribeRound(uint256 _roundId, uint256 _USDTprice, uint256 _NTprice, uint256 _startingId, uint256 _endingId) external
```

### endTribeRound

```solidity
function endTribeRound(uint256 _roundId) external
```

### onTribeRound

```solidity
function onTribeRound(uint256 _roundId) external
```

### reveal

```solidity
function reveal(uint256 _roundId) external
```

### unreveal

```solidity
function unreveal(uint256 _roundId) external
```

### getTribeRound

```solidity
function getTribeRound(uint256 _roundId) external view returns (struct TrustAuthyGameV2.TribeRound)
```

### getAllTribeRounds

```solidity
function getAllTribeRounds() external view returns (struct TrustAuthyGameV2.TribeRound[])
```

### _currentTribeRoundNumber

```solidity
function _currentTribeRoundNumber() internal view returns (uint256)
```

### tribeRoundNumber

```solidity
function tribeRoundNumber() external view returns (uint256)
```

### tribeRoundNumByTokenId

```solidity
function tribeRoundNumByTokenId(uint256 _tokenId) public view returns (uint256)
```

### _beforeTokenTransfer

```solidity
function _beforeTokenTransfer(address _from, address _to, uint256 _tokenId, uint256 _batchSize) internal
```

### isSBT

```solidity
function isSBT(uint256 _tokenId) public view returns (bool)
```

### withdrawERC20

```solidity
function withdrawERC20(address _erc20Address, uint256 _amount) external
```

### withdraw

```solidity
function withdraw(uint256 _amount) external
```

### withdrawUSDT

```solidity
function withdrawUSDT(uint256 _amount) external
```

### reorderAndDecryptCharacters

```solidity
function reorderAndDecryptCharacters(string _input) external view returns (bool)
```

