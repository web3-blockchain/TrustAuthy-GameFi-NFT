// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

interface IWHash {
	function getCipher1() external view returns (string memory);

	function getCipher2() external view returns (string memory);

	function getCipher3() external view returns (string memory);
}
