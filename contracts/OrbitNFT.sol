// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title OrbitNFT
 * @dev NFT contract for minting memorable posts as collectibles
 * Integrates with Avail for cross-chain minting
 */
contract OrbitNFT is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct NFTMetadata {
        uint256 tokenId;
        uint256 postId;
        uint256 groupId;
        uint256 circleId;
        address creator;
        uint256 mintedAt;
        string title;
        string description;
    }

    mapping(uint256 => NFTMetadata) public nftMetadata;
    mapping(uint256 => uint256) public postToNFT; // postId => tokenId
    mapping(address => uint256[]) public creatorNFTs;

    event NFTMinted(
        uint256 indexed tokenId,
        uint256 indexed postId,
        address indexed creator,
        string tokenURI
    );

    constructor() ERC721("Orbit Memories", "ORBIT") {}

    /**
     * @dev Mint a new NFT from a memorable post
     * @param _postId ID of the post
     * @param _groupId ID of the group
     * @param _circleId ID of the circle
     * @param _tokenURI IPFS URI for the NFT metadata
     * @param _title Title of the memory
     * @param _description Description of the memory
     */
    function mintMemoryNFT(
        uint256 _postId,
        uint256 _groupId,
        uint256 _circleId,
        string memory _tokenURI,
        string memory _title,
        string memory _description
    ) external returns (uint256) {
        require(postToNFT[_postId] == 0, "Post already minted as NFT");

        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, _tokenURI);

        NFTMetadata storage metadata = nftMetadata[newTokenId];
        metadata.tokenId = newTokenId;
        metadata.postId = _postId;
        metadata.groupId = _groupId;
        metadata.circleId = _circleId;
        metadata.creator = msg.sender;
        metadata.mintedAt = block.timestamp;
        metadata.title = _title;
        metadata.description = _description;

        postToNFT[_postId] = newTokenId;
        creatorNFTs[msg.sender].push(newTokenId);

        emit NFTMinted(newTokenId, _postId, msg.sender, _tokenURI);
        return newTokenId;
    }

    /**
     * @dev Get NFT metadata
     * @param _tokenId ID of the token
     */
    function getNFTMetadata(uint256 _tokenId) external view returns (NFTMetadata memory) {
        require(_exists(_tokenId), "Token does not exist");
        return nftMetadata[_tokenId];
    }

    /**
     * @dev Get all NFTs created by an address
     * @param _creator Address of the creator
     */
    function getCreatorNFTs(address _creator) external view returns (uint256[] memory) {
        return creatorNFTs[_creator];
    }

    /**
     * @dev Check if a post has been minted as NFT
     * @param _postId ID of the post
     */
    function isPostMinted(uint256 _postId) external view returns (bool) {
        return postToNFT[_postId] != 0;
    }

    /**
     * @dev Get token ID for a post
     * @param _postId ID of the post
     */
    function getPostNFT(uint256 _postId) external view returns (uint256) {
        return postToNFT[_postId];
    }

    /**
     * @dev Get total supply of NFTs
     */
    function totalSupply() external view returns (uint256) {
        return _tokenIds.current();
    }

    // Required overrides
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}

