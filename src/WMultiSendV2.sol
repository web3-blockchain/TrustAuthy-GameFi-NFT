// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract WMultiSendV2 is
	Initializable,
	AccessControlUpgradeable,
	ReentrancyGuardUpgradeable
{
	using SafeERC20 for IERC20;

	receive() external payable {}

	fallback() external payable {}

	error InsufficientMNTBalance();
	error InsufficientContractUSDTBalance();
	error InsufficientContractERC20Balance();

	event SentMNT(
		address indexed sender,
		address[] to,
		uint256[] amount
	);
	event BulkTransfer(
		address indexed sender,
		address[] to,
		uint256[] amount
	);
	event Withdrew(address indexed sender, uint256 amount);
	event WithdrewUSDT(address indexed sender, uint256 amount);
	event WithdrewERC20(
		address indexed sender,
		address erc20Address,
		uint256 amount
	);

	bytes32 public constant WITHDRAW_ROLE =
		keccak256("WITHDRAW_ROLE");
	address private receiver;
	IERC20 private immutable usdt =
		IERC20(0x3813e82e6f7098b9583FC0F33a962D02018B6803);

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
		emit Withdrew(msg.sender, _amount);
	}

	function bulkTransfer(
		address[] memory _to,
		uint256[] memory _amounts
	) external onlyRole(WITHDRAW_ROLE) nonReentrant {
		require(
			_to.length == _amounts.length,
			"_to and amounts length mismatch"
		);

		for (uint i = 0; i < _to.length; i++) {
			usdt.safeTransfer(_to[i], _amounts[i]);
		}

		emit BulkTransfer(msg.sender, _to, _amounts);
	}

	function getUSDTBalance() public view returns (uint256) {
		return usdt.balanceOf(address(this));
	}

	function withdrawUSDT(
		uint256 _amount
	) external onlyRole(WITHDRAW_ROLE) {
		if (getUSDTBalance() < _amount)
			revert InsufficientContractUSDTBalance();
		usdt.safeTransfer(receiver, _amount);
		emit WithdrewUSDT(msg.sender, _amount);
	}

	function withdrawERC20(
		address _erc20Address,
		uint256 _amount
	) external onlyRole(WITHDRAW_ROLE) {
		IERC20 token = IERC20(_erc20Address);
		if (token.balanceOf(address(this)) < _amount)
			revert InsufficientContractERC20Balance();
		token.safeTransfer(receiver, _amount);
		emit WithdrewERC20(msg.sender, _erc20Address, _amount);
	}
}
