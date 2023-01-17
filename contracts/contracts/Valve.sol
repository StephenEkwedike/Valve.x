// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import "hardhat/console.sol";

contract Valve is Initializable, OwnableUpgradeable, ReentrancyGuardUpgradeable, PausableUpgradeable {
    using SafeERC20 for IERC20;

    enum TransferStatus {
        Init,
        Sent,
        Cancelled
    }

    struct TokenTransfer {
        uint256 id;
        IERC20 token; // 0x0 for eth
        address from;
        address to;
        uint256 amount;
        uint256 expireAt;
        TransferStatus status;
        bytes32 exId;
    }

    uint256 private constant MULTIPLIER = 1e4;
    address public feeRecipient;
    uint256 public feePercent;

    uint256 public validDuration;
    TokenTransfer[] public transfers;
    mapping(address => uint256[]) public transferCreators;
    mapping(address => uint256[]) public transferReceivers;
    mapping(bytes32 => uint256) public transferInfo;

    event Pause();
    event Unpause();
    event NewTransfer(
        address from,
        uint256 id,
        IERC20 token,
        address to,
        uint256 amount,
        uint256 expireAt,
        TransferStatus status,
        bytes32 exId
    );
    event TransferAccepted(uint256 id, bytes32 exId);
    event TransferCancelled(uint256 id, bytes32 exId);

    function initialize() public initializer {
        __Context_init_unchained();
        __Ownable_init_unchained();
        __ReentrancyGuard_init_unchained();
        __Pausable_init_unchained();

        validDuration = 5 minutes;
    }

    function getTransfers() external view returns (TokenTransfer[] memory) {
        return transfers;
    }

    function getTransferCount() external view returns (uint256) {
        return transfers.length;
    }

    function getUserTransferCount(address user) external view returns (uint256) {
        return transferCreators[user].length;
    }

    function getUserTransfers(address user) external view returns (TokenTransfer[] memory ts) {
        uint256 size = transferCreators[user].length;
        ts = new TokenTransfer[](size);

        for (uint256 index = 0; index < size; index++) {
            ts[index] = transfers[transferCreators[user][index]];
        }
    }

    function getUserSubTransfers(
        address user,
        uint256 fIndex,
        uint256 count
    ) external view returns (TokenTransfer[] memory ts, uint256 size) {
        size = transferCreators[user].length;

        uint256 realCount = count;

        if (fIndex + realCount >= size) {
            realCount = size - fIndex;
        }

        ts = new TokenTransfer[](realCount);

        for (uint256 index = 0; index < realCount; index++) {
            ts[index] = transfers[transferCreators[user][index + fIndex]];
        }
    }

    function getUserReceiveCount(address user) external view returns (uint256) {
        return transferReceivers[user].length;
    }

    function getUserReceives(address user) external view returns (TokenTransfer[] memory ts) {
        uint256 size = transferReceivers[user].length;
        ts = new TokenTransfer[](size);

        for (uint256 index = 0; index < size; index++) {
            ts[index] = transfers[transferReceivers[user][index]];
        }
    }

    function getUserSubReceives(
        address user,
        uint256 fIndex,
        uint256 count
    ) external view returns (TokenTransfer[] memory ts, uint256 size) {
        size = transferReceivers[user].length;

        uint256 realCount = count;

        if (fIndex + realCount >= size) {
            realCount = size - fIndex;
        }

        ts = new TokenTransfer[](realCount);

        for (uint256 index = 0; index < realCount; index++) {
            ts[index] = transfers[transferReceivers[user][index + fIndex]];
        }
    }

    /**
     * @notice create a new transfer
     *
     * @param token address of token, 0x0 for eth
     * @param to address of to
     * @param amount valid for erc20
     */
    function createTransfer(
        IERC20 token,
        address to,
        uint256 amount,
        bool isDirect
    ) external payable nonReentrant whenNotPaused {
        uint256 realAmount = msg.value;
        TransferStatus status;
        if (isDirect) {
            if (address(token) == address(0)) {
                // send eth
                require(msg.value > 0, "No eth");
                uint256 feeAmount = (msg.value * feePercent) / MULTIPLIER;
                uint256 restAmount = msg.value - feeAmount;

                to.call{ value: restAmount }("");

                if (feeAmount > 0) {
                    feeRecipient.call{ value: feeAmount }("");
                }
            } else {
                // send token
                realAmount = amount;
                uint256 feeAmount = (amount * feePercent) / MULTIPLIER;
                uint256 restAmount = amount - feeAmount;

                token.safeTransferFrom(msg.sender, to, restAmount);

                if (feeAmount > 0) {
                    token.safeTransferFrom(msg.sender, feeRecipient, feeAmount);
                }
            }

            status = TransferStatus.Sent;
        } else {
            if (address(token) == address(0)) {
                // eth
                require(msg.value > 0, "No eth");
            } else {
                // erc20
                uint256 prevBalance = token.balanceOf(address(this));
                token.safeTransferFrom(msg.sender, address(this), amount);
                realAmount = token.balanceOf(address(this)) - prevBalance;
            }

            status = TransferStatus.Init;
        }

        uint256 id = transfers.length;
        bytes32 exId = keccak256(abi.encodePacked(msg.sender, id));

        transfers.push(
            TokenTransfer(
                id,
                token,
                msg.sender,
                to,
                realAmount,
                block.timestamp + validDuration,
                status,
                exId
            )
        );
        transferCreators[msg.sender].push(id);
        transferReceivers[to].push(id);
        transferInfo[exId] = id;

        emit NewTransfer(msg.sender, id, token, to, realAmount, block.timestamp + validDuration, status, exId);
    }

    /**
     * @notice acceptTransfer
     *
     * @param exId bytes32 exId
     */
    function acceptTransfer(bytes32 exId) external nonReentrant whenNotPaused {
        uint256 id = transferInfo[exId];
        TokenTransfer storage transfer = transfers[id];

        require(transfer.status == TransferStatus.Init && block.timestamp <= transfer.expireAt, "Invalid");
        require(msg.sender == transfer.to, "Invalid");

        uint256 feeAmount = (transfer.amount * feePercent) / MULTIPLIER;
        uint256 restAmount = transfer.amount - feeAmount;

        if (address(transfer.token) == address(0)) {
            // send eth
            msg.sender.call{ value: restAmount }("");

            if (feeAmount > 0) {
                feeRecipient.call{ value: feeAmount }("");
            }
        } else {
            // send token
            transfer.token.safeTransfer(msg.sender, restAmount);

            if (feeAmount > 0) {
                transfer.token.safeTransfer(feeRecipient, feeAmount);
            }
        }

        transfer.status = TransferStatus.Sent;

        emit TransferAccepted(id, exId);
    }

    /**
     * @notice cancelTransfer
     *
     * @param exId bytes32 exId
     */
    function cancelTransfer(bytes32 exId) external nonReentrant whenNotPaused {
        uint256 id = transferInfo[exId];
        TokenTransfer storage transfer = transfers[id];

        require(transfer.status == TransferStatus.Init, "Invalid");
        require(msg.sender == transfer.from, "Invalid");

        if (address(transfer.token) == address(0)) {
            // send eth
            msg.sender.call{ value: transfer.amount }("");
        } else {
            // send token
            transfer.token.safeTransfer(msg.sender, transfer.amount);
        }

        transfer.status = TransferStatus.Cancelled;

        emit TransferCancelled(id, exId);
    }

    //////////// Ownable functions /////////////
    /**
     * @notice setFeeInfo
     *
     * @param _feeRecipient address of feeRecipient
     * @param _feePercent percent of fee, multiplied by 10000
     */
    function setFeeInfo(address _feeRecipient, uint256 _feePercent) external onlyOwner {
        require(_feeRecipient != address(0), "Invalid feeRecipient");
        require(_feePercent < MULTIPLIER, "Invalid feePercent");

        feeRecipient = _feeRecipient;
        feePercent = _feePercent;
    }

    /**
     * @notice update valid duration
     *
     * @param _validDuration expire seconds of transfer link
     */
    function setValidDuration(uint256 _validDuration) external onlyOwner {
        validDuration = _validDuration;
    }

    /**
     * @notice Triggers stopped state
     * @dev Only possible when contract not paused.
     */
    function pause() external onlyOwner whenNotPaused {
        _pause();
        emit Pause();
    }

    /**
     * @notice Returns to normal state
     * @dev Only possible when contract is paused.
     */
    function unpause() external onlyOwner whenPaused {
        _unpause();
        emit Unpause();
    }
}
