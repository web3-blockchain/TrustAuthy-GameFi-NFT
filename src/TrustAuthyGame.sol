// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/common/ERC2981Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "./hash/IWHash.sol";

contract TrustAuthyGame is
	Initializable,
	ERC721Upgradeable,
	ERC721PausableUpgradeable,
	ERC721BurnableUpgradeable,
	ERC2981Upgradeable,
	AccessControlUpgradeable,
	ReentrancyGuardUpgradeable
{
	using SafeERC20 for IERC20;

	error NotExists(uint256 tokenId);
	error InsufficientUSDTAllowance();
	error InsufficientUSDT();
	error InvalidTeamIndex(uint256 teamIndex);
	error InsufficientETHBalance();
	error InsufficientContractUSDTBalance();
	error InsufficientContractERC20Balance();
	error RoundNotExists(uint256 roundId);
	error InvalidTime(uint256 startTime, uint256 endTime);
	error InvalidRecipient();
	error InvalidRound(uint256 roundId);
	error InsufficientFunds(uint256 sent, uint256 required);
	error RoundHasEnded(uint256 roundId);

	event TribeRoundTimeUpdated(
		uint256 indexed roundId,
		uint256 startTime,
		uint256 endTime
	);
	event TokenRoyaltySet(
		uint256 indexed tokenId,
		address indexed recipient,
		uint96 value
	);
	event DefaultRoyaltySet(
		address indexed recipient,
		uint96 value
	);
	event DefaultRoyaltyDeleted();
	event UriSet(uint256 indexed tokenId, string uri);
	event USDTDeposited(
		uint256 indexed tokenId,
		address user,
		uint256 indexed team,
		uint256 indexed roundId,
		uint256 amount
	);
	event Deposited(
		uint256 indexed tokenId,
		address user,
		uint256 indexed team,
		uint256 indexed roundId,
		uint256 amount
	);
	event CodeMinted(
		uint256 indexed tokenId,
		address user,
		uint256 indexed team,
		uint256 indexed roundId,
		string code
	);
	event ForceMint(
		uint256 indexed tokenId,
		address user,
		uint256 indexed team
	);

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
		IWHash whash;
		bool isEnd;
	}

	bytes32 public constant MINTER_ROLE =
		keccak256("MINTER_ROLE");
	bytes32 public constant WITHDRAW_ROLE =
		keccak256("WITHDRAW_ROLE");
	IERC20 private usdt;
	uint256 private tokenIds;
	TribeRound[] private rounds;
	address private receiver;
	mapping(uint256 => string) private uris;
	mapping(uint256 => uint256) private team;
	mapping(string => bool) private isUsedCode;

	function initialize(
		string calldata _name,
		string calldata _symbol,
		address _defaultAdmin,
		address _royaltyReceiver,
		uint96 _royaltyFeeNumerator,
		address _usdt
	) public initializer {
		__AccessControl_init();
		__ReentrancyGuard_init();
		__ERC721_init(_name, _symbol);
		__ERC2981_init();
		__ERC721Burnable_init();

		_setupRole(DEFAULT_ADMIN_ROLE, _defaultAdmin);
		_setupRole(MINTER_ROLE, _defaultAdmin);
		_setupRole(WITHDRAW_ROLE, _defaultAdmin);
		receiver = _defaultAdmin;

		setDefaultRoyalty(
			_royaltyReceiver,
			_royaltyFeeNumerator
		);
		usdt = IERC20(_usdt);
		tokenIds = 1;
	}

	function setTokenRoyalty(
		uint256 _tokenId,
		address _recipient,
		uint96 _value
	) external onlyRole(DEFAULT_ADMIN_ROLE) nonReentrant {
		if (!_exists(_tokenId)) revert NotExists(_tokenId);
		if (_recipient == address(0)) revert InvalidRecipient();

		_setTokenRoyalty(_tokenId, _recipient, _value);
		emit TokenRoyaltySet(_tokenId, _recipient, _value);
	}

	function setDefaultRoyalty(
		address _recipient,
		uint96 _value
	) public onlyRole(DEFAULT_ADMIN_ROLE) nonReentrant {
		if (_recipient == address(0)) revert InvalidRecipient();

		_setDefaultRoyalty(_recipient, _value);
		emit DefaultRoyaltySet(_recipient, _value);
	}

	function deleteDefaultRoyalty()
		external
		onlyRole(DEFAULT_ADMIN_ROLE)
		nonReentrant
	{
		_deleteDefaultRoyalty();
		emit DefaultRoyaltyDeleted();
	}

	function supportsInterface(
		bytes4 interfaceId
	)
		public
		view
		virtual
		override(
			ERC721Upgradeable,
			ERC2981Upgradeable,
			AccessControlUpgradeable
		)
		returns (bool)
	{
		return super.supportsInterface(interfaceId);
	}

	function pause() external onlyRole(DEFAULT_ADMIN_ROLE) {
		_pause();
	}

	function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) {
		_unpause();
	}

	function _nextTokenId() internal returns (uint256) {
		return tokenIds++;
	}

	function totalSupply() public view returns (uint256) {
		return tokenIds - 1;
	}

	function _mintTo(
		address _to,
		uint256 _team
	) internal returns (uint256 tokenId) {
		tokenId = _nextTokenId();
		_safeMint(_to, tokenId);

		uint256 roundId = tribeRoundNumByTokenId(tokenId);
		TribeRound storage tr = rounds[roundId];
		tr.count = tr.count += 1;
		team[tokenId] = _team;
	}

	function _url(
		uint256 _tokenId
	) private view returns (string memory) {
		if (!_exists(_tokenId)) revert NotExists(_tokenId);
		return uris[_tokenId];
	}

	function _setUri(
		uint256 _tokenId,
		string memory _uri
	) private {
		if (!_exists(_tokenId)) revert NotExists(_tokenId);
		uris[_tokenId] = _uri;
	}

	function setUri(
		uint256 _tokenId,
		string memory _uri
	) public onlyRole(DEFAULT_ADMIN_ROLE) {
		_setUri(_tokenId, _uri);
	}

	function setMultipleUris(
		uint256[] memory _tokenIds,
		string[] memory _uris
	) external onlyRole(DEFAULT_ADMIN_ROLE) {
		require(
			_tokenIds.length == _uris.length,
			"TokenIds and URIs length mismatch"
		);

		for (uint256 i = 0; i < _tokenIds.length; i++) {
			_setUri(_tokenIds[i], _uris[i]);
		}
	}

	function tokenURI(
		uint256 _tokenId
	)
		public
		view
		override(ERC721Upgradeable)
		returns (string memory)
	{
		if (!_exists(_tokenId)) revert NotExists(_tokenId);
		uint256 roundId = tribeRoundNumByTokenId(_tokenId);
		TribeRound memory tr = rounds[roundId];

		if (tr.revealed == false) {
			return tr.baseUri;
		} else {
			string memory currentTokenUri = _url(_tokenId);

			return
				bytes(currentTokenUri).length > 0
					? string(abi.encodePacked(currentTokenUri))
					: tr.baseUri;
		}
	}

	function depositUSDT(
		uint256 _amount,
		uint256 _team
	) external nonReentrant {
		uint256 roundId = _currentTribeRoundNumber();
		if (rounds[roundId].isEnd) revert RoundHasEnded(roundId);

		if (_amount < rounds[roundId].USDTprice)
			revert InsufficientUSDT();
		if (usdt.allowance(msg.sender, address(this)) < _amount)
			revert InsufficientUSDTAllowance();

		usdt.safeTransferFrom(
			msg.sender,
			address(this),
			_amount
		);

		uint256 tokenId = _mintTo(msg.sender, _team);
		emit USDTDeposited(
			tokenId,
			msg.sender,
			_team,
			roundId,
			_amount
		);
	}

	function deposit(
		uint256 _team
	) external payable nonReentrant {
		require(
			msg.value > 0,
			"NATIVE TOKEN amount must be positive"
		);
		uint256 roundId = _currentTribeRoundNumber();
		if (rounds[roundId].isEnd) revert RoundHasEnded(roundId);

		if (msg.value < rounds[roundId].NTprice)
			revert InsufficientFunds(
				msg.value,
				rounds[roundId].NTprice
			);

		_mintTo(msg.sender, _team);
		uint256 tokenId = _mintTo(msg.sender, _team);
		emit Deposited(
			tokenId,
			msg.sender,
			_team,
			roundId,
			msg.value
		);
	}

	function codeMint(
		string memory _code,
		uint256 _team
	) external nonReentrant {
		require(
			isRegisteredCode(_code),
			"is not Registered Code"
		);
		require(isNotUsedCode(_code), "is Used Code");

		uint256 tokenId = _mintTo(msg.sender, _team);
		isUsedCode[_code] = true;
		uint256 roundId = _currentTribeRoundNumber();
		if (rounds[roundId].isEnd) revert RoundHasEnded(roundId);

		emit CodeMinted(
			tokenId,
			msg.sender,
			_team,
			roundId,
			_code
		);
	}

	function isNotUsedCode(
		string memory _code
	) private view returns (bool) {
		return !isUsedCode[_code];
	}

	function isRegisteredCode(
		string memory _code
	) private view returns (bool) {
		return _reorderAndDecryptCharacters(_code);
	}

	function forceMint(
		address _to,
		uint256 _team
	) external onlyRole(DEFAULT_ADMIN_ROLE) nonReentrant {
		uint256 tokenId = _mintTo(_to, _team);

		emit ForceMint(tokenId, _to, _team);
	}

	function setupRole(
		bytes32 _role,
		address _account
	) external nonReentrant onlyRole(DEFAULT_ADMIN_ROLE) {
		if (_account != address(0)) {
			_setupRole(_role, _account);
		}
	}

	function createTribeRound(
		uint256 _USDTprice,
		uint256 _NTprice,
		uint256 _startingId,
		uint256 _endingId,
		uint256 _startTime,
		uint256 _endTime,
		string calldata _baseUri,
		address _whash
	) external onlyRole(DEFAULT_ADMIN_ROLE) nonReentrant {
		require(
			_endingId >= _startingId,
			"Ending ID must be greater than or equal to starting ID"
		);
		if (_startTime >= _endTime)
			revert InvalidTime(_startTime, _endTime);

		rounds.push(
			TribeRound(
				_USDTprice,
				_NTprice,
				_startingId,
				_endingId,
				_startTime,
				_endTime,
				0,
				_baseUri,
				false,
				IWHash(_whash),
				false
			)
		);
	}

	function updateTribeRoundTime(
		uint256 _roundId,
		uint256 _startTime,
		uint256 _endTime
	) external onlyRole(DEFAULT_ADMIN_ROLE) {
		if (_roundId >= rounds.length)
			revert RoundNotExists(_roundId);
		if (_startTime >= _endTime)
			revert InvalidTime(_startTime, _endTime);

		rounds[_roundId].startTime = _startTime;
		rounds[_roundId].endTime = _endTime;
		emit TribeRoundTimeUpdated(
			_roundId,
			_startTime,
			_endTime
		);
	}

	function updateTribeRoundBaseUri(
		uint256 _roundId,
		string memory _baseUri
	) external onlyRole(DEFAULT_ADMIN_ROLE) {
		if (_roundId >= rounds.length)
			revert RoundNotExists(_roundId);
		rounds[_roundId].baseUri = _baseUri;
	}

	function updateTribeRoundWhash(
		uint256 _roundId,
		address _whash
	) external onlyRole(DEFAULT_ADMIN_ROLE) {
		if (_roundId >= rounds.length)
			revert RoundNotExists(_roundId);
		rounds[_roundId].whash = IWHash(_whash);
	}

	function updateTribeRound(
		uint256 _roundId,
		uint256 _USDTprice,
		uint256 _NTprice,
		uint256 _startingId,
		uint256 _endingId
	) external onlyRole(DEFAULT_ADMIN_ROLE) nonReentrant {
		if (_roundId >= rounds.length)
			revert RoundNotExists(_roundId);

		require(
			_endingId >= _startingId,
			"Ending ID must be greater than or equal to starting ID"
		);

		rounds[_roundId].USDTprice = _USDTprice;
		rounds[_roundId].NTprice = _NTprice;
		rounds[_roundId].startingId = _startingId;
		rounds[_roundId].endingId = _endingId;
	}

	function endTribeRound(
		uint256 _roundId
	) external onlyRole(DEFAULT_ADMIN_ROLE) {
		if (_roundId >= rounds.length)
			revert RoundNotExists(_roundId);
		rounds[_roundId].isEnd = true;
	}

	function onTribeRound(
		uint256 _roundId
	) external onlyRole(DEFAULT_ADMIN_ROLE) {
		if (_roundId >= rounds.length)
			revert RoundNotExists(_roundId);
		rounds[_roundId].isEnd = false;
	}

	function reveal(
		uint256 _roundId
	) external onlyRole(DEFAULT_ADMIN_ROLE) {
		if (_roundId >= rounds.length)
			revert RoundNotExists(_roundId);
		rounds[_roundId].revealed = true;
	}

	function unreveal(
		uint256 _roundId
	) external onlyRole(DEFAULT_ADMIN_ROLE) {
		if (_roundId >= rounds.length)
			revert RoundNotExists(_roundId);
		rounds[_roundId].revealed = false;
	}

	function getTribeRound(
		uint256 _roundId
	) external view returns (TribeRound memory) {
		if (_roundId >= rounds.length)
			revert RoundNotExists(_roundId);
		return rounds[_roundId];
	}

	function getAllTribeRounds()
		external
		view
		returns (TribeRound[] memory)
	{
		return rounds;
	}

	function _currentTribeRoundNumber()
		internal
		view
		returns (uint256)
	{
		uint256 roundsCount = rounds.length;

		for (uint256 i = 0; i < roundsCount; ) {
			// solhint-disable-next-line not-rely-on-time
			if (
				(rounds[i].endTime >= block.timestamp &&
					rounds[i].startTime <= block.timestamp) ||
				rounds[i].startTime > block.timestamp
			) {
				return i;
			}

			unchecked {
				++i;
			}
		}

		return roundsCount > 0 ? roundsCount - 1 : 0;
	}

	function tribeRoundNumber() external view returns (uint256) {
		return _currentTribeRoundNumber();
	}

	function tribeRoundNumByTokenId(
		uint256 _tokenId
	) public view returns (uint256) {
		if (totalSupply() < _tokenId) revert NotExists(_tokenId);
		uint256 roundsCount = rounds.length;

		for (uint256 i = 0; i < roundsCount; ) {
			// solhint-disable-next-line not-rely-on-time
			if (
				(rounds[i].startingId <= _tokenId &&
					rounds[i].endingId >= _tokenId)
			) {
				return i;
			}

			unchecked {
				++i;
			}
		}

		return roundsCount > 0 ? roundsCount - 1 : 0;
	}

	function _beforeTokenTransfer(
		address _from,
		address _to,
		uint256 _tokenId,
		uint256 _batchSize
	)
		internal
		override(ERC721Upgradeable, ERC721PausableUpgradeable)
		whenNotPaused
	{
		super._beforeTokenTransfer(
			_from,
			_to,
			_tokenId,
			_batchSize
		);
		if (isSBT(_tokenId)) {
			require(
				_from == address(0) || _to == address(0),
				"SBT: transfer not allowed"
			);
		}
	}

	function isSBT(uint256 _tokenId) public view returns (bool) {
		uint256 roundId = tribeRoundNumByTokenId(_tokenId);
		TribeRound memory tr = rounds[roundId];
		if (tr.endTime < block.timestamp) {
			return true;
		}
		return false;
	}

	function withdrawERC20(
		address _erc20Address,
		uint256 _amount
	) external onlyRole(WITHDRAW_ROLE) nonReentrant {
		IERC20 token = IERC20(_erc20Address);
		if (token.balanceOf(address(this)) < _amount)
			revert InsufficientContractERC20Balance();
		token.safeTransfer(receiver, _amount);
	}

	function withdraw(
		uint256 _amount
	) external onlyRole(WITHDRAW_ROLE) nonReentrant {
		if (address(this).balance < _amount)
			revert InsufficientETHBalance();
		payable(receiver).transfer(_amount);
	}

	function withdrawUSDT(
		uint256 _amount
	) external onlyRole(WITHDRAW_ROLE) nonReentrant {
		if (usdt.balanceOf(address(this)) < _amount)
			revert InsufficientContractUSDTBalance();
		usdt.safeTransfer(receiver, _amount);
	}

	function reorderAndDecryptCharacters(
		string memory _input
	) external view onlyRole(DEFAULT_ADMIN_ROLE) returns (bool) {
		return _reorderAndDecryptCharacters(_input);
	}

	function _reorderAndDecryptCharacters(
		string memory _input
	) private view returns (bool) {
		uint256 roundId = _currentTribeRoundNumber();
		TribeRound storage tr = rounds[roundId];
		string memory cipher1 = tr.whash.getCipher1();
		string memory cipher2 = tr.whash.getCipher2();
		string memory cipher3 = tr.whash.getCipher3();

		bytes memory inputBytes = bytes(_input);
		require(
			inputBytes.length == 7,
			"Input string must be 7 characters long"
		);

		bytes memory sortedBytes = new bytes(7);
		sortedBytes[0] = inputBytes[0];
		sortedBytes[1] = inputBytes[3];
		sortedBytes[2] = inputBytes[1];
		sortedBytes[3] = inputBytes[6];
		sortedBytes[4] = inputBytes[2];
		sortedBytes[5] = inputBytes[5];
		sortedBytes[6] = inputBytes[4];

		string memory abc = string(
			abi.encodePacked(
				sortedBytes[4],
				sortedBytes[5],
				sortedBytes[6]
			)
		);

		uint16 A_1_index_uint = getIndexOrRevert(
			cipher1,
			sortedBytes[0]
		);
		uint16 B_2_index_uint = getIndexOrRevert(
			cipher2,
			sortedBytes[1]
		);
		uint16 C_3_index_uint = getIndexOrRevert(
			cipher3,
			sortedBytes[2]
		);

		string memory c_str = string(
			abi.encodePacked(sortedBytes[6])
		);

		int16 D_1_index = findIndex(cipher1, sortedBytes[3]);
		require(D_1_index >= 0, "Index must be non-negative.");

		return (calculateAndCompare(
			A_1_index_uint,
			B_2_index_uint,
			C_3_index_uint,
			abc
		) && stringToUint16(c_str) == uint16(D_1_index));
	}

	function findIndex(
		string memory str,
		bytes1 character
	) private pure returns (int16) {
		bytes memory strBytes = bytes(str);
		for (uint16 i = 0; i < strBytes.length; i++) {
			if (strBytes[i] == character) {
				return int16(i);
			}
		}
		return -1;
	}

	function calculateAndCompare(
		uint16 A_1_index_uint,
		uint16 B_2_index_uint,
		uint16 C_3_index_uint,
		string memory abc
	) private pure returns (bool) {
		uint16 result;
		unchecked {
			uint32 temp = (uint32(A_1_index_uint) * 64) +
				uint32(B_2_index_uint);
			result = uint16(temp * (C_3_index_uint + 1));
		}

		if (result >= 1000) {
			result = result % 1000;
		}

		return stringToUint16(abc) == result;
	}

	function getIndexOrRevert(
		string memory str,
		bytes1 character
	) private pure returns (uint16) {
		int16 index = findIndex(str, character);
		require(index >= 0, "Index must be non-negative.");
		return uint16(index);
	}

	function stringToUint16(
		string memory str
	) private pure returns (uint16) {
		bytes memory b = bytes(str);
		uint16 result = 0;
		for (uint i = 0; i < b.length; i++) {
			require(
				b[i] >= 0x30 && b[i] <= 0x39,
				"Invalid character"
			);
			uint8 digit = uint8(b[i]) - 48;
			result = result * 10 + uint16(digit);
		}
		return result;
	}
}
