# Solidity API

## WMultiSendV2

### receive

```solidity
receive() external payable
```

### fallback

```solidity
fallback() external payable
```

### InsufficientMNTBalance

```solidity
error InsufficientMNTBalance()
```

### InsufficientContractUSDTBalance

```solidity
error InsufficientContractUSDTBalance()
```

### InsufficientContractERC20Balance

```solidity
error InsufficientContractERC20Balance()
```

### SentMNT

```solidity
event SentMNT(address sender, address[] to, uint256[] amount)
```

### BulkTransfer

```solidity
event BulkTransfer(address sender, address[] to, uint256[] amount)
```

### Withdrew

```solidity
event Withdrew(address sender, uint256 amount)
```

### WithdrewUSDT

```solidity
event WithdrewUSDT(address sender, uint256 amount)
```

### WithdrewERC20

```solidity
event WithdrewERC20(address sender, address erc20Address, uint256 amount)
```

### WITHDRAW_ROLE

```solidity
bytes32 WITHDRAW_ROLE
```

### initialize

```solidity
function initialize(address _defaultAdmin, address _withdrawRole, address _receiver) external
```

### setupRole

```solidity
function setupRole(bytes32 _role, address _account) external
```

### setReceiver

```solidity
function setReceiver(address _receiver) external
```

### getReceiver

```solidity
function getReceiver() external view returns (address)
```

### sendMNT

```solidity
function sendMNT(address[] _to, uint256[] _amount) external payable
```

### withdraw

```solidity
function withdraw(uint256 _amount) external
```

### bulkTransfer

```solidity
function bulkTransfer(address[] _to, uint256[] _amounts) external
```

### getUSDTBalance

```solidity
function getUSDTBalance() public view returns (uint256)
```

### withdrawUSDT

```solidity
function withdrawUSDT(uint256 _amount) external
```

### withdrawERC20

```solidity
function withdrawERC20(address _erc20Address, uint256 _amount) external
```

