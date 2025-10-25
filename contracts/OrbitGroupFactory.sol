// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title OrbitGroupFactory
 * @dev Factory contract for creating and managing Orbit groups
 * Integrates with Yellow Network for payments, Avail for cross-chain, and Blockscout for verification
 */
contract OrbitGroupFactory {
    struct Group {
        uint256 id;
        string name;
        address creator;
        address[] members;
        address sharedWallet;
        uint256 createdAt;
        bool isActive;
    }

    struct Circle {
        uint256 id;
        uint256 groupId;
        string name;
        string circleType;
        uint256 createdAt;
    }

    // State variables
    uint256 public groupCount;
    uint256 public circleCount;
    
    mapping(uint256 => Group) public groups;
    mapping(uint256 => Circle) public circles;
    mapping(address => uint256[]) public userGroups;
    mapping(uint256 => uint256[]) public groupCircles;
    
    // Events
    event GroupCreated(uint256 indexed groupId, string name, address indexed creator, address sharedWallet);
    event CircleCreated(uint256 indexed circleId, uint256 indexed groupId, string name);
    event MemberAdded(uint256 indexed groupId, address indexed member);
    event MemberRemoved(uint256 indexed groupId, address indexed member);
    event GroupDeactivated(uint256 indexed groupId);

    /**
     * @dev Create a new group with an optional shared wallet
     * @param _name Name of the group
     * @param _members Initial members of the group
     * @param _createSharedWallet Whether to create a shared multi-sig wallet
     */
    function createGroup(
        string memory _name,
        address[] memory _members,
        bool _createSharedWallet
    ) external returns (uint256) {
        groupCount++;
        uint256 groupId = groupCount;

        address sharedWallet = address(0);
        if (_createSharedWallet) {
            // Deploy shared wallet via Avail Nexus integration
            sharedWallet = _deploySharedWallet(_members);
        }

        Group storage newGroup = groups[groupId];
        newGroup.id = groupId;
        newGroup.name = _name;
        newGroup.creator = msg.sender;
        newGroup.members = _members;
        newGroup.sharedWallet = sharedWallet;
        newGroup.createdAt = block.timestamp;
        newGroup.isActive = true;

        // Add group to each member's list
        for (uint256 i = 0; i < _members.length; i++) {
            userGroups[_members[i]].push(groupId);
        }

        emit GroupCreated(groupId, _name, msg.sender, sharedWallet);
        return groupId;
    }

    /**
     * @dev Create a circle within a group
     * @param _groupId ID of the parent group
     * @param _name Name of the circle
     * @param _circleType Type of circle (travel, expenses, photos, etc.)
     */
    function createCircle(
        uint256 _groupId,
        string memory _name,
        string memory _circleType
    ) external returns (uint256) {
        require(groups[_groupId].isActive, "Group not active");
        require(_isMember(_groupId, msg.sender), "Not a group member");

        circleCount++;
        uint256 circleId = circleCount;

        Circle storage newCircle = circles[circleId];
        newCircle.id = circleId;
        newCircle.groupId = _groupId;
        newCircle.name = _name;
        newCircle.circleType = _circleType;
        newCircle.createdAt = block.timestamp;

        groupCircles[_groupId].push(circleId);

        emit CircleCreated(circleId, _groupId, _name);
        return circleId;
    }

    /**
     * @dev Add a member to a group
     * @param _groupId ID of the group
     * @param _member Address of the new member
     */
    function addMember(uint256 _groupId, address _member) external {
        require(groups[_groupId].isActive, "Group not active");
        require(msg.sender == groups[_groupId].creator, "Only creator can add members");
        require(!_isMember(_groupId, _member), "Already a member");

        groups[_groupId].members.push(_member);
        userGroups[_member].push(_groupId);

        emit MemberAdded(_groupId, _member);
    }

    /**
     * @dev Remove a member from a group
     * @param _groupId ID of the group
     * @param _member Address of the member to remove
     */
    function removeMember(uint256 _groupId, address _member) external {
        require(groups[_groupId].isActive, "Group not active");
        require(msg.sender == groups[_groupId].creator, "Only creator can remove members");
        require(_isMember(_groupId, _member), "Not a member");

        address[] storage members = groups[_groupId].members;
        for (uint256 i = 0; i < members.length; i++) {
            if (members[i] == _member) {
                members[i] = members[members.length - 1];
                members.pop();
                break;
            }
        }

        emit MemberRemoved(_groupId, _member);
    }

    /**
     * @dev Deactivate a group (soft delete)
     * @param _groupId ID of the group to deactivate
     */
    function deactivateGroup(uint256 _groupId) external {
        require(msg.sender == groups[_groupId].creator, "Only creator can deactivate");
        groups[_groupId].isActive = false;
        emit GroupDeactivated(_groupId);
    }

    /**
     * @dev Get all circles for a group
     * @param _groupId ID of the group
     */
    function getGroupCircles(uint256 _groupId) external view returns (uint256[] memory) {
        return groupCircles[_groupId];
    }

    /**
     * @dev Get all groups for a user
     * @param _user Address of the user
     */
    function getUserGroups(address _user) external view returns (uint256[] memory) {
        return userGroups[_user];
    }

    /**
     * @dev Get group details
     * @param _groupId ID of the group
     */
    function getGroup(uint256 _groupId) external view returns (Group memory) {
        return groups[_groupId];
    }

    /**
     * @dev Check if an address is a member of a group
     * @param _groupId ID of the group
     * @param _user Address to check
     */
    function _isMember(uint256 _groupId, address _user) internal view returns (bool) {
        address[] memory members = groups[_groupId].members;
        for (uint256 i = 0; i < members.length; i++) {
            if (members[i] == _user) {
                return true;
            }
        }
        return false;
    }

    /**
     * @dev Deploy a shared wallet for the group (placeholder for Avail integration)
     * @param _members Initial members for the wallet
     */
    function _deploySharedWallet(address[] memory _members) internal returns (address) {
        // In production, this would integrate with Avail Nexus to deploy a cross-chain multi-sig
        // For now, return a placeholder address
        // The actual implementation would call Avail SDK to create a shared wallet
        return address(uint160(uint256(keccak256(abi.encodePacked(block.timestamp, _members)))));
    }
}

