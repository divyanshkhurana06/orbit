const hre = require("hardhat");

async function main() {
  console.log("🚀 Starting Orbit contract deployment...\n");

  // Get deployer account
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString(), "\n");

  // Deploy OrbitGroupFactory
  console.log("📦 Deploying OrbitGroupFactory...");
  const GroupFactory = await hre.ethers.getContractFactory("OrbitGroupFactory");
  const groupFactory = await GroupFactory.deploy();
  await groupFactory.deployed();
  console.log("✅ OrbitGroupFactory deployed to:", groupFactory.address, "\n");

  // Deploy PaymentSplitter
  console.log("📦 Deploying PaymentSplitter...");
  const PaymentSplitter = await hre.ethers.getContractFactory("PaymentSplitter");
  const paymentSplitter = await PaymentSplitter.deploy();
  await paymentSplitter.deployed();
  console.log("✅ PaymentSplitter deployed to:", paymentSplitter.address, "\n");

  // Deploy OrbitNFT
  console.log("📦 Deploying OrbitNFT...");
  const OrbitNFT = await hre.ethers.getContractFactory("OrbitNFT");
  const orbitNFT = await OrbitNFT.deploy();
  await orbitNFT.deployed();
  console.log("✅ OrbitNFT deployed to:", orbitNFT.address, "\n");

  // Verification info
  console.log("📝 Deployment Summary:");
  console.log("=====================");
  console.log("Network:", hre.network.name);
  console.log("OrbitGroupFactory:", groupFactory.address);
  console.log("PaymentSplitter:", paymentSplitter.address);
  console.log("OrbitNFT:", orbitNFT.address);
  console.log("\n🔍 To verify contracts on Blockscout/Etherscan, run:");
  console.log(`npx hardhat verify --network ${hre.network.name} ${groupFactory.address}`);
  console.log(`npx hardhat verify --network ${hre.network.name} ${paymentSplitter.address}`);
  console.log(`npx hardhat verify --network ${hre.network.name} ${orbitNFT.address}`);

  // Save deployment addresses
  const fs = require("fs");
  const deploymentInfo = {
    network: hre.network.name,
    chainId: hre.network.config.chainId,
    contracts: {
      OrbitGroupFactory: groupFactory.address,
      PaymentSplitter: paymentSplitter.address,
      OrbitNFT: orbitNFT.address,
    },
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
  };

  const deploymentsDir = "./deployments";
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir);
  }

  fs.writeFileSync(
    `${deploymentsDir}/${hre.network.name}.json`,
    JSON.stringify(deploymentInfo, null, 2)
  );

  console.log(`\n💾 Deployment info saved to deployments/${hre.network.name}.json`);
  console.log("\n✨ Deployment complete!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

