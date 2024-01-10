# Solidity API

## WMultiSend

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

### SentMNT

```solidity
event SentMNT(address sender, address[] to, uint256[] amount)
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

