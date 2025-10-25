# Orbit Demo Script for ETHOnline Judges

**Total Duration:** 5 minutes  
**Focus:** Demonstrate all three SDK integrations in real-world social platform context

## Pre-Demo Checklist

- [ ] Browser with wallet extension connected
- [ ] Test wallet has funds on Ethereum and Polygon testnet
- [ ] All three SDKs configured with API keys
- [ ] Demo server running on localhost:8080
- [ ] Screen recording software ready
- [ ] Notes/script printed for reference

## Opening Hook (0:00 - 0:30)

### What to Say

> "Hey judges! Ever tried organizing a trip with friends? The group chat becomes a mess of memes, expenses, and plans all mixed together. Meet Orbit - the social platform that actually makes sense."

### What to Show

1. **Open Homepage**
   - Show the circular orbit view rotating
   - Highlight the clean, modern design (not purple!)
   - Point to SDK badges at bottom

2. **Quick Overview**
   - Hover over different group orbits
   - Toggle to grid view
   - Back to orbit view

### Key Points

- Visual: "See how groups orbit naturally? Easy to find, easy to navigate."
- Tech: "Built on three powerful SDKs for payments, cross-chain, and AI"

## Part 1: Groups & Circles (0:30 - 1:30)

### What to Say

> "Let's dive into my Travel Squad group. Instead of one chaotic chat, we have organized circles for different topics."

### What to Show

1. **Click "Travel Squad" Group**
   - Show the group header with member count
   - Display the AI summary box (Blockscout integration)

2. **Read AI Summary Aloud**
   > "Look at this - Blockscout's AI automatically summarized our week: 12 new posts, 3 events planned, $245 in shared expenses. Most active members are Alice, Bob, and Charlie."

3. **Navigate Through Circles**
   - Click "Photos" circle
   - Show stack gallery
   - Swipe through 3-4 photo cards
   
4. **Switch to Expenses Circle**
   - Show split payment history
   - Highlight organized structure

### Key Points

- UX: "Everything has its place. No more endless scrolling."
- Blockscout: "AI summaries powered by Blockscout MCP - analyzing on-chain activity and giving us intelligent insights."

## Part 2: Yellow Network Payments (1:30 - 2:30)

### What to Say

> "Now for the cool part - payments. We're using Yellow Network for instant, gasless transactions."

### What to Show

1. **Tip a Post**
   - Find a post in feed
   - Click tip button
   - Enter $0.05
   - Show instant execution (no loading!)
   
   > "Notice that? No waiting. No gas fees. Yellow Network's state channels make this instant."

2. **Open Payment Modal**
   - Click "Payments" in header
   - Show Yellow SDK section

3. **Split Payment Demo**
   - Click "Split Payment"
   - Enter: $50 total, 4 people
   - Show auto-calculation: $12.50 per person
   - Submit
   - Show confirmation with session balance

4. **Explain Session**
   - Point to session status
   - Show balance remaining
   
   > "I deposited $100 into a Yellow session. Now I can make instant payments for an hour, and everything settles on-chain when I'm done."

### Key Points

- Speed: "Instant execution - Web2 speed with Web3 security"
- Cost: "Zero gas fees for every transaction"
- Session: "Session-based allowances give users control"

## Part 3: Avail Cross-Chain Features (2:30 - 3:30)

### What to Say

> "Here's where it gets really powerful. Our group members are on different chains, but Avail Nexus lets us act like we're all in one place."

### What to Show

1. **Show Shared Wallet**
   - In payment modal, scroll to "Shared Wallet"
   - Show balance: "1,245 USDC"
   
   > "This is our group's shared wallet. Multi-sig, so we need 2 out of 3 signatures for big expenses."

2. **Cross-Chain Deposit**
   - Click source chain dropdown
   - Select "Ethereum"
   - Click destination chain dropdown
   - Select "Polygon"
   - Enter amount: $50
   - Show "Bridge & Execute" button
   
   > "Watch this - I can deposit from Ethereum, and Avail automatically bridges it to Polygon where our wallet lives. All in one transaction."

3. **Click "Bridge & Execute"**
   - Show loading state
   - Display intent ID
   - Show status: "Executing cross-chain..."

4. **Unified Balance Demo**
   - While waiting, show unified balance view
   - Display USDC across chains:
     - Ethereum: 500 USDC
     - Polygon: 300 USDC  
     - Arbitrum: 200 USDC
     - Total: 1,000 USDC
   
   > "Avail aggregates my balance across all chains. No more switching networks manually."

### Key Points

- Seamless: "Members contribute from any chain they want"
- Bridge & Execute: "One transaction does it all"
- Multi-sig: "Group treasury with proper governance"

## Part 4: Blockscout Analytics & AI (3:30 - 4:30)

### What to Say

> "Let's see how Blockscout makes sense of all this on-chain activity."

### What to Show

1. **Weekly Summary (Already Shown Earlier)**
   - Scroll back to AI summary
   - Re-read highlights
   
   > "This uses Blockscout's MCP - Model Context Protocol. It's analyzing wallet transactions and giving us human-readable insights."

2. **Member Leaderboard**
   - Scroll down to leaderboard section
   - Show ranked members:
     - 🥇 Alice - 1,240 points
     - 🥈 Bob - 980 points  
     - 🥉 Charlie - 750 points
   
   > "The leaderboard ranks members by contributions: transactions, tips sent, group wallet deposits. All verified on-chain through Blockscout."

3. **Click a Member**
   - Click "Alice"
   - Show comprehensive wallet analysis
   - Highlight sections:
     - Transaction count
     - Total volume
     - Most active times
     - Token holdings
     - DeFi interactions
   
   > "Here's a deep dive powered by Blockscout SDK. We can see all her on-chain activity and behavior patterns."

4. **Smart Content Tagging**
   - Back to posts feed
   - Point to auto-generated tags
   - Hover to show "Tagged by AI"
   
   > "Posts are automatically tagged using Blockscout MCP. It suggests which circle they belong in and categorizes content."

5. **Transaction Tracking**
   - Find a recent transaction
   - Click transaction hash
   - Opens Blockscout explorer in new tab
   - Show verified transaction details
   
   > "Every payment is verifiable. Click any transaction to see it on Blockscout's explorer."

### Key Points

- Intelligence: "AI makes blockchain data human-friendly"
- Verification: "Everything is transparently verifiable on-chain"  
- Automation: "No manual work - summaries and tags are automatic"

## Part 5: Location Sharing Bonus (4:30 - 4:45)

### What to Say

> "Quick bonus feature - location sharing for meetups."

### What to Show

1. **Click "Locations" Button**
   - Opens map modal
   - Show member markers
   
   > "See where everyone is in real-time. Perfect for planning meetups."

2. **Zoom into Map**
   - Show proximity
   
   > "Alice and Bob are nearby - time to grab coffee!"

### Key Points

- Practical: "Real-world utility for social groups"
- Privacy: "Members control their own sharing"

## Closing (4:45 - 5:00)

### What to Say

> "So to recap: Orbit brings order to social chaos with circles. Yellow Network gives us instant payments. Avail Nexus unifies everything across chains. And Blockscout makes it all transparent and intelligent."

### What to Show

1. **Quick Screenshots Montage**
   - Circular orbit view
   - Payment modal
   - AI summary
   - Leaderboard

2. **Show Roadmap (if time)**
   - Mention: Public circles, NFT badges, DAOs

### Final Words

> "From friend groups to DAOs, Orbit scales. Built for ETHOnline with meaningful integrations of Yellow, Avail, and Blockscout. Thank you!"

## Post-Demo Q&A Prep

### Expected Questions

**Q: How does Yellow Network handle disputes?**
A: Sessions are cryptographically secured. If there's a dispute, the final state is settled on-chain through smart contracts. All transactions are verifiable.

**Q: What happens if Avail bridge fails?**
A: Intents have built-in safety. If execution fails on destination, funds remain on source chain. Users can retry or cancel. Plus, we show clear status updates.

**Q: How often do Blockscout AI summaries update?**
A: Real-time for transactions, but we cache summaries for 24 hours to respect rate limits. Users can manually refresh if needed.

**Q: Can you show the code?**
A: Absolutely! All three integrations are in `src/integrations/`:
- `yellow.js` - Session management, payments
- `avail.js` - Cross-chain, shared wallets  
- `blockscout.js` - Analytics, MCP prompts

**Q: Is this production-ready?**
A: Core features yes, but we'd add:
- More error handling
- Rate limiting
- Advanced caching
- Mobile optimization
- Real-time WebSocket updates

**Q: How do you handle privacy?**
A: 
- Location sharing is opt-in
- Wallet addresses are shortened
- Group content is private by default
- Users control their own keys

**Q: What's the business model?**
A: Freemium:
- Basic groups: Free
- Premium circles: $2/month (paid via Yellow)
- NFT minting: Small fee
- Enterprise features: Custom pricing

## Technical Details for Deep Dives

### Yellow Integration

**Session Flow:**
1. User deposits USDC to state channel
2. Off-chain transactions happen instantly
3. Final balances settled on-chain at session end
4. Gas paid only once (at settlement)

**Code Reference:**
```javascript
// Create session (yellow.js line 27)
await this.sdk.createSession({
  userAddress,
  allowance: '100',
  duration: 3600,
  token: 'USDC'
});
```

### Avail Integration

**Bridge & Execute Flow:**
1. User initiates cross-chain intent
2. Avail locks funds on source chain
3. Validators verify and execute on destination
4. Action completes (transfer, swap, etc.)
5. Both transactions tracked by intent ID

**Code Reference:**
```javascript
// Bridge and execute (avail.js line 61)
await this.sdk.createIntent({
  type: 'BRIDGE_AND_EXECUTE',
  sourceChain,
  destinationChain,
  amount,
  execution: { action, params }
});
```

### Blockscout Integration

**MCP Query Flow:**
1. App sends prompt to Blockscout MCP
2. MCP queries on-chain data
3. AI (LLM) processes and analyzes
4. Returns human-readable insights
5. App displays to user

**Code Reference:**
```javascript
// AI summary (blockscout.js line 28)
await this.mcp.summarizeActivity({
  addresses: [wallet, ...members],
  timeRange: 'week',
  context: { type: 'social_group' }
});
```

## Video Recording Tips

1. **Record in 1080p or 4K**
2. **Use Chrome for best compatibility**
3. **Have backup recording** (OBS + QuickTime)
4. **Test audio levels** beforehand
5. **Use consistent window sizes** for clean look
6. **Add subtitles** if possible
7. **Include GitHub link** in video description

## Submission Checklist

Before submitting to ETHGlobal:

- [ ] Video uploaded to YouTube (unlisted is fine)
- [ ] GitHub repo is public
- [ ] README is comprehensive
- [ ] All three SDK integrations clearly documented
- [ ] .env.example included
- [ ] Code is commented
- [ ] Demo is deployed and accessible
- [ ] Screenshots included in README
- [ ] Team info added
- [ ] License file included

## Prize Track Applications

Apply to these tracks:

### Yellow Network ($5,000)
- [x] Uses Yellow SDK
- [x] Session-based payments
- [x] Instant tipping
- [x] Split payments
- [x] Demo video

### Avail Nexus ($9,500)
- [x] General Track ($4,500)
- [x] DeFi/Payments Track ($5,000)
- [x] Bridge & Execute
- [x] Shared wallets
- [x] Meaningful cross-chain use

### Blockscout ($6,500)
- [x] SDK Integration ($3,000)
- [x] MCP Integration ($3,500)
- [x] Transaction tracking
- [x] AI summaries
- [x] Comprehensive prompts

**Total Potential:** $21,000 in prizes! 🎉

Good luck with your demo! 🚀

