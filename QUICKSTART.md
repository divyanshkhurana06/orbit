# Orbit Quick Start Guide

Get Orbit running locally in 5 minutes! ⚡

## Prerequisites

- Node.js 16+ installed
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Web3 wallet extension (MetaMask, Coinbase Wallet, etc.) - optional for full features

## Installation

### Option 1: Simple Setup (Recommended)

```bash
# Navigate to project directory
cd orbit

# Install http-server globally (one-time only)
npm install -g http-server

# Start the development server
http-server -p 8080 -o
```

The app will automatically open at `http://localhost:8080`

### Option 2: Using npx (No installation)

```bash
# Navigate to project directory
cd orbit

# Start server with npx
npx http-server -p 8080 -o
```

### Option 3: Using Python

```bash
# Python 3
python3 -m http.server 8080

# Python 2
python -m SimpleHTTPServer 8080
```

Then open `http://localhost:8080` in your browser.

## First Run

### 1. View the Landing Page

When you first open Orbit, you'll see:
- **Circular orbit view** of sample groups
- **Header** with location and payment buttons
- **SDK integration badges** showing Yellow, Avail, and Blockscout

### 2. Explore Groups

Click on any group in the orbit (or toggle to grid view):
- "Travel Squad" ✈️
- "Dev Team" 💻
- "College Club" 🎓
- "Fitness Gang" 💪
- "Food Lovers" 🍕
- "Startup Team" 🚀

### 3. Navigate Circles

Inside a group, you'll see different circles:
- **Trip Planning** 🗺️ - For organizing trips
- **Photos** 📸 - Stack gallery for memories
- **Expenses** 💰 - Payment tracking
- **Memes** 😂 - Fun content
- **Events** 📅 - Upcoming activities

### 4. Try Features

**Location Sharing:**
- Click "Locations" button in header
- View map with member locations
- See real-time positions (demo data)

**Payment Features:**
- Click "Payments" button
- Explore Yellow SDK instant payments
- View Avail cross-chain options
- Check shared wallet balance

**AI Summaries:**
- Enter any group
- See AI-generated weekly summary
- Powered by Blockscout MCP

## Demo Mode

The app runs in demo mode by default with sample data:
- 6 pre-configured groups
- Sample posts and comments
- Mock payment history
- Demo member locations

This lets you explore all features without connecting a wallet!

## Connecting Real SDKs (Optional)

To enable real functionality:

### 1. Get API Keys

**Yellow Network:**
- Sign up at https://yellow.org
- Get testnet API key
- Join Discord for support: https://discord.gg/yellow

**Avail Nexus:**
- Visit https://docs.availproject.org
- Request API access
- Join Discord: https://discord.gg/avail

**Blockscout:**
- Go to https://blockscout.com
- Create account
- Generate API key

### 2. Configure Environment

```bash
# Copy example env file
cp .env.example .env

# Edit .env with your API keys
nano .env
# or
code .env
```

Add your keys:
```env
YELLOW_API_KEY=your_yellow_api_key
AVAIL_NEXUS_API_KEY=your_avail_api_key
BLOCKSCOUT_API_KEY=your_blockscout_api_key
```

### 3. Update Integration Files

Edit the SDK integration files in `src/integrations/`:
- `yellow.js` - Line 11: Update API key
- `avail.js` - Line 14: Update API key
- `blockscout.js` - Line 16: Update API key

### 4. Connect Wallet

- Install MetaMask or similar wallet extension
- Connect to testnet (Sepolia, Mumbai, etc.)
- Get testnet tokens from faucets
- Connect wallet when prompted

### 5. Test Real Features

Now you can:
- Create real payment sessions
- Execute cross-chain bridges
- Generate AI summaries from actual wallet data
- Track real transactions

## Troubleshooting

### Port Already in Use

If port 8080 is taken:
```bash
# Use a different port
http-server -p 3000 -o
```

### Blank Page / Nothing Shows

1. Check browser console for errors (F12)
2. Make sure you're opening `index.html` through a server, not as a file
3. Clear browser cache and reload

### Map Not Loading

The map requires internet connection for:
- Leaflet.js library
- OpenStreetMap tiles

Make sure you're online!

### Orbit Not Rotating

The circular gallery might not animate if:
- Browser has reduced motion settings enabled
- Performance mode is on
- JavaScript is disabled

Solution: Check browser settings and enable animations.

## Browser Compatibility

**Fully Supported:**
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

**Partially Supported:**
- Older browsers may not show animations
- IE11 is not supported

## Mobile View

Orbit is fully responsive! Try it on:
- 📱 iPhone/Android phones
- 📱 Tablets
- 💻 Laptops
- 🖥️ Desktop monitors

The layout automatically adapts to your screen size.

## Keyboard Shortcuts

- `←` / `→` - Navigate stack gallery (when focused)
- `ESC` - Close modals
- `Tab` - Navigate between circles

## Next Steps

### For Developers

1. **Read Integration Guide** - See `INTEGRATION_GUIDE.md`
2. **Review SDK Code** - Check `src/integrations/`
3. **Follow Demo Script** - Use `DEMO_SCRIPT.md` for presentations
4. **Customize Features** - Modify `index.html` to your needs

### For Hackathon Judges

1. **Watch Demo Video** - [Link when available]
2. **Review README** - See `README.md` for full details
3. **Check SDK Integration** - All three SDKs meaningfully integrated
4. **Test Features** - Follow the demo script

### For Users

1. **Create Your Group** - Click "Create Group" button
2. **Invite Friends** - Share group link (coming soon)
3. **Start Organizing** - Create circles for different topics
4. **Make Payments** - Use Yellow for instant splits
5. **Go Cross-Chain** - Accept payments on any chain via Avail

## Project Structure

```
orbit/
├── index.html              # Main app (all-in-one)
├── package.json            # Dependencies
├── README.md               # Full documentation
├── INTEGRATION_GUIDE.md    # SDK integration details
├── DEMO_SCRIPT.md          # Demo walkthrough
├── QUICKSTART.md           # This file
├── AVAIL_FEEDBACK.md       # Avail SDK feedback
├── LICENSE                 # MIT License
├── .env.example            # Environment template
├── .gitignore             # Git ignore rules
└── src/
    └── integrations/
        ├── yellow.js       # Yellow Network SDK
        ├── avail.js        # Avail Nexus SDK
        └── blockscout.js   # Blockscout SDK & MCP
```

## Features Checklist

- [x] Circular orbit gallery for groups
- [x] Stack gallery for photos
- [x] Map integration for locations
- [x] Yellow SDK payments
- [x] Avail Nexus cross-chain
- [x] Blockscout AI summaries
- [x] Responsive design
- [x] Modern UI/UX
- [x] Split payments
- [x] Shared wallets
- [x] Leaderboards
- [x] AI content tagging

## Getting Help

**Documentation:**
- README.md - Complete overview
- INTEGRATION_GUIDE.md - SDK details
- DEMO_SCRIPT.md - Presentation guide

**Community:**
- GitHub Issues - Report bugs or request features
- Discord - Join our community server
- Email - team@orbitapp.io

**SDK Support:**
- Yellow: https://discord.gg/yellow
- Avail: https://discord.gg/avail
- Blockscout: https://discord.gg/blockscout

## What's Next?

After exploring the demo:

### Phase 1 (Current) ✅
- Core group and circle features
- Basic SDK integrations
- Demo data and UI

### Phase 2 (Coming Soon) 🚧
- Real-time WebSocket updates
- Enhanced AI features
- Calendar sync
- Advanced multi-sig
- Mobile apps

### Phase 3 (Future) 🔮
- Public circle discovery
- Cross-orbit collaboration
- DAO governance
- NFT marketplace
- Token rewards

## Contributing

Want to contribute to Orbit?

1. Fork the repo
2. Create a feature branch
3. Make your changes
4. Submit a pull request

See issues labeled `good first issue` for beginner-friendly tasks!

## Share Your Feedback

We'd love to hear from you!

- ⭐ Star the repo if you like it
- 🐛 Report bugs via GitHub issues
- 💡 Suggest features on Discord
- 📢 Share on Twitter with #OrbitSocial

## License

MIT License - feel free to use, modify, and distribute!

See `LICENSE` file for details.

## Built With

- React 18 - UI framework
- Leaflet.js - Interactive maps
- Yellow Network - Instant payments
- Avail Nexus - Cross-chain operations
- Blockscout - Blockchain analytics

## Credits

Built for **ETHOnline 2024** by the Orbit Team

Special thanks to:
- Yellow Network team
- Avail project
- Blockscout developers
- ETHGlobal organizers
- Open source community

Happy Orbiting! 🚀✨

**Ready to change how groups organize forever.**

