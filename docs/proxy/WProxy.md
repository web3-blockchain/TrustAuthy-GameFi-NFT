# Solidity API

## TProxy

### constructor

```solidity
constructor(address _logic, bytes _data) public
```

### upgradeImplementation

```solidity
function upgradeImplementation(address _impl) public
```

### implementation

```solidity
function implementation() external view returns (address impl)
```

