const hre = require("hardhat");

async function main() {
  console.log("🧪 Testing Orbit contracts locally...\n");

  const [deployer, user1, user2, user3] = await hre.ethers.getSigners();

  // Deploy contracts
  const GroupFactory = await hre.ethers.getContractFactory("OrbitGroupFactory");
  const groupFactory = await GroupFactory.deploy();
  await groupFactory.deployed();
  console.log("✅ GroupFactory deployed");

  const PaymentSplitter = await hre.ethers.getContractFactory("PaymentSplitter");
  const paymentSplitter = await PaymentSplitter.deploy();
  await paymentSplitter.deployed();
  console.log("✅ PaymentSplitter deployed");

  const OrbitNFT = await hre.ethers.getContractFactory("OrbitNFT");
  const orbitNFT = await OrbitNFT.deploy();
  await orbitNFT.deployed();
  console.log("✅ OrbitNFT deployed\n");

  // Test 1: Create a group
  console.log("📝 Test 1: Creating a group...");
  const members = [user1.address, user2.address, user3.address];
  const tx1 = await groupFactory.createGroup("Travel Squad", members, true);
  await tx1.wait();
  const group = await groupFactory.getGroup(1);
  console.log(`✅ Group created: ${group.name}`);
  console.log(`   Members: ${members.length}`);
  console.log(`   Shared wallet: ${group.sharedWallet}\n`);

  // Test 2: Create a circle
  console.log("📝 Test 2: Creating a circle...");
  const tx2 = await groupFactory.connect(user1).createCircle(1, "Trip Planning", "travel");
  await tx2.wait();
  const circles = await groupFactory.getGroupCircles(1);
  console.log(`✅ Circle created in group 1`);
  console.log(`   Total circles: ${circles.length}\n`);

  // Test 3: Create split payment
  console.log("📝 Test 3: Creating split payment...");
  const recipients = [user1.address, user2.address, user3.address];
  const amounts = [
    hre.ethers.utils.parseEther("10"),
    hre.ethers.utils.parseEther("10"),
    hre.ethers.utils.parseEther("10"),
  ];
  const tx3 = await paymentSplitter.createSplit(
    1, // groupId
    recipients,
    amounts,
    hre.ethers.constants.AddressZero, // ETH
    "Dinner split"
  );
  await tx3.wait();
  const split = await paymentSplitter.getSplit(1);
  console.log(`✅ Split created`);
  console.log(`   Total amount: ${hre.ethers.utils.formatEther(split.totalAmount)} ETH`);
  console.log(`   Recipients: ${split.recipients.length}\n`);

  // Test 4: Mint NFT
  console.log("📝 Test 4: Minting memory NFT...");
  const tx4 = await orbitNFT.connect(user1).mintMemoryNFT(
    1, // postId
    1, // groupId
    1, // circleId
    "ipfs://QmExample123", // tokenURI
    "Beach Day 2024",
    "Amazing sunset at the beach"
  );
  await tx4.wait();
  const nft = await orbitNFT.getNFTMetadata(1);
  console.log(`✅ NFT minted`);
  console.log(`   Token ID: ${nft.tokenId}`);
  console.log(`   Creator: ${nft.creator}`);
  console.log(`   Title: ${nft.title}\n`);

  // Test 5: Check group members
  console.log("📝 Test 5: Checking user groups...");
  const userGroups = await groupFactory.getUserGroups(user1.address);
  console.log(`✅ User1 is in ${userGroups.length} group(s)\n`);

  console.log("🎉 All tests passed!");
  console.log("\n📊 Contract Summary:");
  console.log("===================");
  console.log("GroupFactory:", groupFactory.address);
  console.log("PaymentSplitter:", paymentSplitter.address);
  console.log("OrbitNFT:", orbitNFT.address);
  console.log("\n✨ Test deployment complete!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

