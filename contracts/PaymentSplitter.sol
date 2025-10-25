// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title PaymentSplitter
 * @dev Handles payment splitting and tipping for Orbit groups
 * Integrates with Yellow Network for instant off-chain settlements
 */
contract PaymentSplitter is ReentrancyGuard {
    struct Split {
        uint256 id;
        uint256 groupId;
        address initiator;
        address[] recipients;
        uint256[] amounts;
        address token;
        uint256 totalAmount;
        uint256 timestamp;
        bool executed;
        string description;
    }

    struct Tip {
        uint256 id;
        address from;
        address to;
        uint256 amount;
        address token;
        uint256 postId;
        uint256 timestamp;
    }

    // State variables
    uint256 public splitCount;
    uint256 public tipCount;
    
    mapping(uint256 => Split) public splits;
    mapping(uint256 => Tip) public tips;
    mapping(address => uint256) public totalTipsReceived;
    mapping(address => uint256) public totalTipsSent;
    
    // Yellow Network session integration
    mapping(address => uint256) public yellowSessions;
    mapping(address => uint256) public sessionBalances;

    // Events
    event SplitCreated(
        uint256 indexed splitId,
        uint256 indexed groupId,
        address indexed initiator,
        uint256 totalAmount,
        address token
    );
    event SplitExecuted(uint256 indexed splitId);
    event TipSent(
        uint256 indexed tipId,
        address indexed from,
        address indexed to,
        uint256 amount,
        uint256 postId
    );
    event YellowSessionCreated(address indexed user, uint256 sessionId, uint256 balance);
    event YellowSessionEnded(address indexed user, uint256 sessionId);

    /**
     * @dev Create a split payment
     * @param _groupId ID of the group
     * @param _recipients Addresses receiving payments
     * @param _amounts Amounts for each recipient
     * @param _token Token address (or address(0) for ETH)
     * @param _description Description of the split
     */
    function createSplit(
        uint256 _groupId,
        address[] memory _recipients,
        uint256[] memory _amounts,
        address _token,
        string memory _description
    ) external returns (uint256) {
        require(_recipients.length == _amounts.length, "Length mismatch");
        require(_recipients.length > 0, "No recipients");

        uint256 totalAmount = 0;
        for (uint256 i = 0; i < _amounts.length; i++) {
            totalAmount += _amounts[i];
        }

        splitCount++;
        uint256 splitId = splitCount;

        Split storage newSplit = splits[splitId];
        newSplit.id = splitId;
        newSplit.groupId = _groupId;
        newSplit.initiator = msg.sender;
        newSplit.recipients = _recipients;
        newSplit.amounts = _amounts;
        newSplit.token = _token;
        newSplit.totalAmount = totalAmount;
        newSplit.timestamp = block.timestamp;
        newSplit.executed = false;
        newSplit.description = _description;

        emit SplitCreated(splitId, _groupId, msg.sender, totalAmount, _token);
        return splitId;
    }

    /**
     * @dev Execute a split payment
     * @param _splitId ID of the split to execute
     */
    function executeSplit(uint256 _splitId) external nonReentrant {
        Split storage split = splits[_splitId];
        require(!split.executed, "Already executed");
        require(msg.sender == split.initiator, "Only initiator can execute");

        split.executed = true;

        if (split.token == address(0)) {
            // ETH split
            require(msg.value == split.totalAmount, "Incorrect ETH amount");
            for (uint256 i = 0; i < split.recipients.length; i++) {
                (bool success, ) = split.recipients[i].call{value: split.amounts[i]}("");
                require(success, "ETH transfer failed");
            }
        } else {
            // ERC20 split
            IERC20 token = IERC20(split.token);
            for (uint256 i = 0; i < split.recipients.length; i++) {
                require(
                    token.transferFrom(msg.sender, split.recipients[i], split.amounts[i]),
                    "Token transfer failed"
                );
            }
        }

        emit SplitExecuted(_splitId);
    }

    /**
     * @dev Send a tip to a post creator
     * @param _to Recipient address
     * @param _postId ID of the post being tipped
     * @param _token Token address (or address(0) for ETH)
     * @param _amount Tip amount
     */
    function sendTip(
        address _to,
        uint256 _postId,
        address _token,
        uint256 _amount
    ) external payable nonReentrant returns (uint256) {
        require(_to != address(0), "Invalid recipient");
        require(_amount > 0, "Amount must be > 0");

        tipCount++;
        uint256 tipId = tipCount;

        if (_token == address(0)) {
            // ETH tip
            require(msg.value == _amount, "Incorrect ETH amount");
            (bool success, ) = _to.call{value: _amount}("");
            require(success, "ETH transfer failed");
        } else {
            // ERC20 tip
            IERC20 token = IERC20(_token);
            require(
                token.transferFrom(msg.sender, _to, _amount),
                "Token transfer failed"
            );
        }

        Tip storage newTip = tips[tipId];
        newTip.id = tipId;
        newTip.from = msg.sender;
        newTip.to = _to;
        newTip.amount = _amount;
        newTip.token = _token;
        newTip.postId = _postId;
        newTip.timestamp = block.timestamp;

        totalTipsReceived[_to] += _amount;
        totalTipsSent[msg.sender] += _amount;

        emit TipSent(tipId, msg.sender, _to, _amount, _postId);
        return tipId;
    }

    /**
     * @dev Create a Yellow Network session for instant payments
     * @param _sessionId Session ID from Yellow Network
     */
    function createYellowSession(uint256 _sessionId) external payable {
        require(yellowSessions[msg.sender] == 0, "Session already exists");
        require(msg.value > 0, "Must deposit funds");

        yellowSessions[msg.sender] = _sessionId;
        sessionBalances[msg.sender] = msg.value;

        emit YellowSessionCreated(msg.sender, _sessionId, msg.value);
    }

    /**
     * @dev End a Yellow Network session and withdraw remaining balance
     */
    function endYellowSession() external nonReentrant {
        uint256 sessionId = yellowSessions[msg.sender];
        require(sessionId != 0, "No active session");

        uint256 balance = sessionBalances[msg.sender];
        yellowSessions[msg.sender] = 0;
        sessionBalances[msg.sender] = 0;

        if (balance > 0) {
            (bool success, ) = msg.sender.call{value: balance}("");
            require(success, "Withdrawal failed");
        }

        emit YellowSessionEnded(msg.sender, sessionId);
    }

    /**
     * @dev Get split details
     * @param _splitId ID of the split
     */
    function getSplit(uint256 _splitId) external view returns (Split memory) {
        return splits[_splitId];
    }

    /**
     * @dev Get tip details
     * @param _tipId ID of the tip
     */
    function getTip(uint256 _tipId) external view returns (Tip memory) {
        return tips[_tipId];
    }

    /**
     * @dev Get tips received by an address
     * @param _user Address to check
     */
    function getTipsReceived(address _user) external view returns (uint256) {
        return totalTipsReceived[_user];
    }

    /**
     * @dev Get tips sent by an address
     * @param _user Address to check
     */
    function getTipsSent(address _user) external view returns (uint256) {
        return totalTipsSent[_user];
    }

    /**
     * @dev Check Yellow session status
     * @param _user Address to check
     */
    function getYellowSession(address _user) external view returns (uint256 sessionId, uint256 balance) {
        return (yellowSessions[_user], sessionBalances[_user]);
    }
}

