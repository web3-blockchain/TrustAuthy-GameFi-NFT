// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";

contract WMultiSendProxy is ERC1967Proxy {
	constructor(
		address _logic,
		bytes memory _data
	) ERC1967Proxy(_logic, _data) {}

	function upgradeImplementation(address _impl) public {
		_upgradeTo(_impl);
	}

	function implementation()
		external
		view
		returns (address impl)
	{
		return _implementation();
	}
}
