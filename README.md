# 🌐 Orbit - Next-Gen Social Platform

**Your world, perfectly organized.**

A Web3-powered social platform built with Next.js, featuring groups with circles, blockchain payments, location sharing, and more.

## 🚀 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Custom CSS
- **Web3**: Ethers.js, MetaMask
- **Maps**: Leaflet, React-Leaflet
- **3D Graphics**: OGL (WebGL)
- **Blockchain SDKs**:
  - Yellow Network (Instant Payments)
  - Avail Nexus (Cross-Chain)
  - Blockscout MCP (AI Analytics)

## 📦 Features

### ✨ Core Features
- 🎨 Create custom groups with icons & colors
- 🔄 WebGL circular gallery for browsing groups
- 📱 Responsive design for all devices
- 💾 Persistent storage with localStorage

### 🌐 Web3 Features
- 💳 **Wallet Connection**: MetaMask integration
- 📨 **Invite Links**: Shareable group URLs
- 🗺️ **Location Map**: See member locations on interactive map
- 📸 **Photo Sharing**: Upload and share photos
- ⚡ **Instant Payments**: Yellow Network integration
- 🔗 **Cross-Chain Pool**: Avail Nexus shared wallets
- 🧠 **AI Analytics**: Blockscout MCP insights

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- MetaMask browser extension (optional)

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 📂 Project Structure

```
orbit/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main page with routing
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── HomePage.tsx       # Landing page
│   ├── GroupsPage.tsx     # Groups gallery
│   ├── CreateGroupPage.tsx # Create group form
│   ├── GroupDetailPage.tsx # Group details
│   ├── Header.tsx         # Navigation header
│   └── CircularGallery.tsx # WebGL gallery
├── lib/                   # Utilities
│   ├── appData.ts         # Application data
│   └── wallet.ts          # Wallet connection
├── types/                 # TypeScript types
│   └── index.ts          # Type definitions
├── public/               # Static assets
└── package.json          # Dependencies
```

## 🎯 Key Components

### HomePage
Beautiful landing page with animations and call-to-actions.

### GroupsPage
Browse groups in circular WebGL gallery or grid view with search.

### CreateGroupPage
Form to create new groups with icon/color pickers.

### GroupDetailPage
Full group view with:
- Wallet connection
- Invite link generation
- Member location map
- Photo sharing
- Payment splitting

## 🔗 Blockchain Integration

### Yellow Network
```typescript
// Instant payment
await yellowSDK.sendPayment({
  amount: 100,
  recipient: '0x...',
  token: 'USDC'
})
```

### Avail Nexus
```typescript
// Cross-chain pool
await availSDK.createSharedWallet({
  groupId: 123,
  members: ['0x...', '0x...']
})
```

### Blockscout MCP
```typescript
// AI analytics
const insights = await blockscoutMCP.getWalletAnalytics(address)
```

## 🎨 Customization

### Theme Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: '#3b82f6',
  secondary: '#1e293b',
  accent: '#10b981',
}
```

### Data
Edit `lib/appData.ts` to customize default groups, icons, and colors.

## 🚢 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Docker
```bash
docker build -t orbit-social .
docker run -p 3000:3000 orbit-social
```

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

Contributions welcome! Please open an issue or PR.

## 🏆 Hackathon

Built for **ETHOnline 2025** hackathon.

**Prize Categories:**
- Yellow Network ($5,000)
- Avail Nexus ($10,000)
- Blockscout ($10,000)

## 📧 Contact

For questions or support, open an issue on GitHub.

---

**Made with ❤️ for the decentralized future**
