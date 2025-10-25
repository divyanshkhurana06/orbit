# Orbit Project Structure

## 📁 Complete File Organization

```
orbit/
├── contracts/                      # Smart Contracts (Solidity)
│   ├── OrbitGroupFactory.sol      # Group & circle management
│   ├── PaymentSplitter.sol        # Payment splitting & tipping
│   ├── OrbitNFT.sol               # NFT collectibles
│   └── README.md                   # Contract documentation
│
├── src/                            # Source Code
│   ├── components/                 # React Components
│   │   ├── Header.jsx             # Top navigation bar
│   │   ├── GroupCard.jsx          # Individual group card
│   │   ├── CircularGallery.jsx   # WebGL circular gallery
│   │   ├── PostCard.jsx           # Post component
│   │   ├── StackGallery.jsx      # Photo stack gallery
│   │   └── PaymentModal.jsx      # Payment features modal
│   │
│   ├── pages/                      # Page Components (Future)
│   │   ├── HomePage.jsx           # Landing page
│   │   ├── GroupPage.jsx          # Group detail page
│   │   └── ProfilePage.jsx        # User profile page
│   │
│   ├── integrations/               # SDK Integrations
│   │   ├── yellow.js              # Yellow Network SDK
│   │   ├── avail.js               # Avail Nexus SDK
│   │   └── blockscout.js          # Blockscout SDK & MCP
│   │
│   ├── constants/                  # Constants & Static Data
│   │   └── groups.js              # Groups, circles, sample data
│   │
│   ├── config/                     # Configuration
│   │   └── index.js               # App config & SDK settings
│   │
│   └── utils/                      # Utility Functions
│       └── helpers.js             # Helper functions
│
├── scripts/                        # Deployment Scripts
│   ├── deploy.js                  # Deploy all contracts
│   └── test-deployment.js        # Test contracts locally
│
├── deployments/                    # Deployment Records
│   ├── sepolia.json               # Sepolia deployment addresses
│   ├── mumbai.json                # Mumbai deployment addresses
│   └── localhost.json             # Local deployment addresses
│
├── test/                           # Contract Tests (Future)
│   ├── GroupFactory.test.js
│   ├── PaymentSplitter.test.js
│   └── OrbitNFT.test.js
│
├── docs/                           # Documentation
│   ├── README.md                  # Main documentation
│   ├── INTEGRATION_GUIDE.md      # SDK integration guide
│   ├── DEMO_SCRIPT.md            # Demo walkthrough
│   ├── QUICKSTART.md             # Quick start guide
│   ├── SUBMISSION_CHECKLIST.md   # Hackathon checklist
│   └── AVAIL_FEEDBACK.md         # Avail SDK feedback
│
├── index.html                      # Main HTML file
├── hardhat.config.js              # Hardhat configuration
├── package.json                    # Dependencies & scripts
├── .env.example                    # Environment template
├── .gitignore                      # Git ignore rules
└── LICENSE                         # MIT License

```

## 🗂️ File Responsibilities

### Smart Contracts (`/contracts`)

**OrbitGroupFactory.sol**
- Create and manage groups
- Add/remove members
- Create circles within groups
- Deploy shared wallets via Avail

**PaymentSplitter.sol**
- Split payments among members
- Send tips to creators
- Yellow Network session management
- Track payment history

**OrbitNFT.sol**
- Mint posts as NFT collectibles
- Store metadata on-chain
- Track creator NFTs
- Prevent duplicate minting

### React Components (`/src/components`)

**Header.jsx**
- Logo and navigation
- Action buttons (Locations, Payments, Create Group)
- Responsive design

**GroupCard.jsx**
- Display group info
- Member count
- Click handler for navigation

**CircularGallery.jsx**
- WebGL-powered gallery
- Drag and scroll interaction
- Group visualization

**PostCard.jsx**
- Individual post display
- Like, comment, tip actions
- Timestamp formatting

**StackGallery.jsx**
- Photo stack interface
- Swipe navigation
- 3D transforms

**PaymentModal.jsx**
- Yellow SDK instant payments
- Avail cross-chain transfers
- Split payment creation
- Shared wallet management

### SDK Integrations (`/src/integrations`)

**yellow.js** - 372 lines
- Session creation
- Instant payments
- Split payments
- Tipping functionality
- Settlement on-chain

**avail.js** - 586 lines
- Cross-chain swaps
- Bridge & Execute
- Shared wallet creation
- Multi-sig management
- NFT minting

**blockscout.js** - 500+ lines
- AI summaries via MCP
- Transaction tracking
- Wallet analytics
- Leaderboard generation
- Smart tagging

### Constants & Config

**src/constants/groups.js**
- Sample groups data
- Circle definitions
- Member locations
- Gallery items

**src/config/index.js**
- API keys configuration
- Feature flags
- Chain configuration
- Contract addresses
- UI settings

**src/utils/helpers.js**
- Format timestamp
- Shorten address
- Currency formatting
- Validation functions
- Utility helpers

## 🔄 Data Flow

```
User Action
    ↓
React Component
    ↓
SDK Integration Layer (yellow.js / avail.js / blockscout.js)
    ↓
Smart Contract (via ethers.js)
    ↓
Blockchain
    ↓
Blockscout Verification & Analytics
```

## 📦 Dependencies

### Frontend (CDN-loaded)
- React 18
- OGL (WebGL library)
- Leaflet.js (Maps)
- Font Awesome (Icons)
- Inter Font

### Backend (npm)
- Hardhat (Development environment)
- OpenZeppelin (Smart contract library)
- Ethers.js (Ethereum interaction)
- dotenv (Environment variables)

## 🚀 Development Workflow

### 1. Smart Contract Development
```bash
npm run compile      # Compile contracts
npm run test         # Run tests
npm run node         # Start local node
npm run deploy:local # Deploy locally
```

### 2. Frontend Development
```bash
npm run dev          # Start dev server
# Edit components in src/components/
# Edit integrations in src/integrations/
```

### 3. Testing
```bash
npm run test:local   # Test contracts locally
# Open browser, test UI
```

### 4. Deployment
```bash
npm run deploy:sepolia  # Deploy to Sepolia
npm run deploy:mumbai   # Deploy to Mumbai
```

## 🎯 Key Features per File

### index.html
- Main app shell
- All styles (CSS-in-JS approach for demo)
- React app mounting point
- WebGL gallery integration

### Smart Contracts
- On-chain group management
- Payment splitting logic
- NFT minting functionality
- Event emission for tracking

### React Components
- Modular UI pieces
- Reusable across pages
- Props-based customization
- Event handling

### SDK Integrations
- Abstract complex SDK logic
- Provide simple interfaces
- Error handling
- Type definitions (via JSDoc)

## 🔐 Security

### Smart Contracts
- OpenZeppelin libraries
- ReentrancyGuard on payments
- Access control checks
- Input validation

### Frontend
- No private keys in code
- Environment variables for keys
- Sanitized user input
- HTTPS connections

## 📈 Scalability

### Current Structure
- Single-page app (demo)
- Modular components
- Separated concerns

### Future Enhancements
- Multi-page routing (React Router)
- State management (Redux/Context)
- Real-time updates (WebSockets)
- Database integration
- API layer (Express/Next.js)

## 📝 Notes

1. **Why CDN for Frontend?**
   - Quick demo deployment
   - No build step needed
   - Easy for judges to test

2. **Why Separate Components?**
   - Easy to maintain
   - Reusable code
   - Clear responsibilities

3. **Why Smart Contracts?**
   - Decentralized ownership
   - Transparent payments
   - Verifiable on Blockscout

4. **Why Three SDKs?**
   - Yellow: Instant payments
   - Avail: Cross-chain unity
   - Blockscout: Transparency

## 🎓 For Developers

### Adding a New Component
1. Create file in `src/components/`
2. Export default function
3. Import in parent component
4. Pass props as needed

### Adding a New Feature
1. Update constants if needed
2. Create/update components
3. Integrate SDK if required
4. Update smart contracts if on-chain
5. Test thoroughly

### Deploying New Contract
1. Write contract in `/contracts`
2. Add to `scripts/deploy.js`
3. Run deployment script
4. Update `src/config/index.js` with addresses
5. Verify on Blockscout

## 🏆 ETHOnline Submission

All files are organized for easy evaluation:
- `/contracts` - Smart contract code
- `/src/integrations` - SDK integration code
- `/docs` - Comprehensive documentation
- `/scripts` - Deployment automation

**Total Lines of Code:**
- Smart Contracts: ~800 lines
- SDK Integrations: ~1,500 lines
- React Components: ~600 lines
- Documentation: ~30,000 words
- **Total: 3,000+ lines of production code**

Built with ❤️ for ETHOnline 2024

