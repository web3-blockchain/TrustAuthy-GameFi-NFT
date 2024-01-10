// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract WHash is AccessControl {
	bytes32 public constant GETTOR_ROLE =
		keccak256("GETTOR_ROLE");

	constructor(address gettor) {
		_setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
		_setupRole(GETTOR_ROLE, msg.sender);
		_setupRole(GETTOR_ROLE, gettor);
	}

	function getCipher1()
		public
		view
		onlyRole(GETTOR_ROLE)
		returns (string memory)
	{
		return "STWXYchjebP5mnda8RJpBCKL9NH6kQMqrDyAEFG4fgt23";
	}

	function getCipher2()
		public
		view
		onlyRole(GETTOR_ROLE)
		returns (string memory)
	{
		return "GeA3THdU4B";
	}

	function getCipher3()
		public
		view
		onlyRole(GETTOR_ROLE)
		returns (string memory)
	{
		return "YUQGWXRSTc";
	}
}
