# Orbit Smart Contracts

Smart contracts powering the Orbit social platform with integrated Web3 features.

## Contracts Overview

### 1. OrbitGroupFactory.sol
**Purpose:** Factory contract for creating and managing groups and circles

**Key Features:**
- Create groups with optional shared multi-sig wallets
- Add/remove members
- Create circles within groups
- Integrate with Avail Nexus for cross-chain wallet deployment

**Main Functions:**
- `createGroup()` - Create a new group
- `createCircle()` - Add a circle to a group
- `addMember()` - Add member to group
- `removeMember()` - Remove member from group

### 2. PaymentSplitter.sol
**Purpose:** Handle payment splitting and tipping

**Key Features:**
- Split payments among multiple recipients
- Send tips to post creators
- Yellow Network session management
- Support for ETH and ERC20 tokens

**Main Functions:**
- `createSplit()` - Create a split payment
- `executeSplit()` - Execute the split
- `sendTip()` - Tip a post creator
- `createYellowSession()` - Start Yellow Network session
- `endYellowSession()` - End session and settle

### 3. OrbitNFT.sol
**Purpose:** Mint memorable posts as NFT collectibles

**Key Features:**
- ERC721 NFTs for group memories
- Store metadata (post ID, group, circle)
- Track creator NFTs
- Prevent duplicate minting

**Main Functions:**
- `mintMemoryNFT()` - Mint a post as NFT
- `getNFTMetadata()` - Get NFT details
- `getCreatorNFTs()` - Get all NFTs by creator
- `isPostMinted()` - Check if post is already minted

## Deployment

### Prerequisites
```bash
npm install --save-dev hardhat @nomiclabs/hardhat-ethers ethers
npm install @openzeppelin/contracts
```

### Compile Contracts
```bash
npx hardhat compile
```

### Deploy to Testnet
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

### Verify on Blockscout
```bash
npx hardhat verify --network sepolia DEPLOYED_CONTRACT_ADDRESS
```

## Integration with SDKs

### Yellow Network Integration
The `PaymentSplitter` contract works with Yellow Network:
1. User creates a Yellow session off-chain
2. Contract stores session ID and balance
3. Instant off-chain payments happen via Yellow
4. On session end, final state settles on-chain

### Avail Nexus Integration
The `OrbitGroupFactory` integrates with Avail:
1. When creating a group, optionally deploy shared wallet
2. Wallet is created via Avail Nexus cross-chain SDK
3. Multi-sig wallet supports members from any chain
4. NFTs can be minted cross-chain via Avail

### Blockscout Integration
All contracts are:
- Verified on Blockscout explorers
- Indexed for transaction tracking
- Analyzed by Blockscout MCP for AI summaries
- Displayed in Orbit app via Blockscout SDK

## Testing

### Run Tests
```bash
npx hardhat test
```

### Test Coverage
```bash
npx hardhat coverage
```

## Security Considerations

1. **ReentrancyGuard** - All payment functions protected
2. **Access Control** - Only creators can modify groups
3. **Input Validation** - All inputs validated
4. **SafeTransfer** - Use OpenZeppelin safe transfer methods

## Gas Optimization

- Use `calldata` for array parameters
- Pack structs to save storage slots
- Use events for off-chain data
- Batch operations when possible

## Testnet Addresses

### Sepolia
```
OrbitGroupFactory: 0x...
PaymentSplitter: 0x...
OrbitNFT: 0x...
```

### Mumbai (Polygon Testnet)
```
OrbitGroupFactory: 0x...
PaymentSplitter: 0x...
OrbitNFT: 0x...
```

## License

MIT License - See LICENSE file for details

