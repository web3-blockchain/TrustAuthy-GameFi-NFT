// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract WMultiSend is
	Initializable,
	AccessControlUpgradeable,
	ReentrancyGuardUpgradeable
{
	receive() external payable {}
	fallback() external payable {}

	error InsufficientMNTBalance();

	event SentMNT(address indexed sender, address[] to, uint256[] amount);

	bytes32 public constant WITHDRAW_ROLE =
		keccak256("WITHDRAW_ROLE");
	address private receiver;

	function initialize(
		address _defaultAdmin,
		address _withdrawRole,
		address _receiver
	) external initializer {
		__AccessControl_init();
		__ReentrancyGuard_init();

		_setupRole(DEFAULT_ADMIN_ROLE, _defaultAdmin);
		_setupRole(WITHDRAW_ROLE, _withdrawRole);

		receiver = _receiver;
	}

	function setupRole(
		bytes32 _role,
		address _account
	) external nonReentrant onlyRole(DEFAULT_ADMIN_ROLE) {
		if (_account != address(0)) {
			_setupRole(_role, _account);
		}
	}

	function setReceiver(
		address _receiver
	) external onlyRole(DEFAULT_ADMIN_ROLE) {
		receiver = _receiver;
	}

	function getReceiver()
		external
		view
		onlyRole(DEFAULT_ADMIN_ROLE)
		returns (address)
	{
		return receiver;
	}

	function sendMNT(
		address[] memory _to,
		uint256[] memory _amount
	) external payable onlyRole(WITHDRAW_ROLE) nonReentrant {
		require(
			_to.length == _amount.length,
			"To and Amount arrays must be of the same length"
		);
		require(
			_to.length <= 100,
			"Cannot send to more than 100 addresses at a time"
		);

		uint256 totalAmount = 0;
		for (uint256 i = 0; i < _to.length; i++) {
			require(
				_to[i] != address(0),
				"Cannot send to zero address"
			);
			require(
				_amount[i] > 0,
				"Amount must be greater than 0"
			);
			totalAmount += _amount[i];
		}

		require(
			address(this).balance >= totalAmount,
			"Insufficient balance in contract"
		);

		for (uint256 i = 0; i < _to.length; i++) {
			payable(_to[i]).transfer(_amount[i]);
		}

		emit SentMNT(msg.sender, _to, _amount);
	}

	function withdraw(
		uint256 _amount
	) external onlyRole(WITHDRAW_ROLE) nonReentrant {
		if (address(this).balance < _amount)
			revert InsufficientMNTBalance();
		payable(receiver).transfer(_amount);
	}
}
