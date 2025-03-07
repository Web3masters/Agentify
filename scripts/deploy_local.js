const hre = require("hardhat");

async function main() {
  console.log("Deploying contracts to Local Hardhat Network...");
  
  // Get signing account
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // Get the contract factories
  const USDT = await hre.ethers.getContractFactory("USDT");
  const MYID = await hre.ethers.getContractFactory("MYID");
  const ChainLink = await hre.ethers.getContractFactory("ChainLink");
  const MYIDPresale = await hre.ethers.getContractFactory("MYIDPresale");

  // Deploy USDT with 1,000,000 initial supply (6 decimals)
  const initialSupply = 1_000_000;
  console.log("Deploying USDT token...");
  const usdt = await USDT.deploy(
    initialSupply,
    "USDT Testnet",
    "USDT",
    6
  );
  await usdt.deployed();
  console.log("USDT deployed to:", usdt.address);

  // Deploy MYID Token
  console.log("Deploying MYID token...");
  const myid = await MYID.deploy();
  await myid.deployed();
  console.log("MYID Token deployed to:", myid.address);

  // Deploy ChainLink mock for ETH/USD price feed
  console.log("Deploying ChainLink mock...");
  const chainLink = await ChainLink.deploy();
  await chainLink.deployed();
  console.log("ChainLink mock deployed to:", chainLink.address);

  // Deploy Presale contract
  console.log("Deploying MYIDPresale contract...");
  const presale = await MYIDPresale.deploy();
  await presale.deployed();
  console.log("MYID Presale deployed to:", presale.address);

  // Initialize the presale contract
  console.log("Initializing presale contract...");
  const initTx = await presale.initialize(
    usdt.address,
    myid.address,
    chainLink.address
  );
  await initTx.wait();
  console.log("Presale contract initialized");

  // Transfer tokens to presale contract (10M tokens)
  const tokensForPresale = hre.ethers.utils.parseEther("10000000");
  console.log("Transferring MYID tokens to presale contract...");
  const transferTx = await myid.transfer(presale.address, tokensForPresale);
  await transferTx.wait();
  console.log(`Transferred ${hre.ethers.utils.formatEther(tokensForPresale)} MYID tokens to presale contract`);

  console.log("\nDeployment complete! Contract addresses:");
  console.log(`USDT: ${usdt.address}`);
  console.log(`MYID: ${myid.address}`);
  console.log(`ChainLink: ${chainLink.address}`);
  console.log(`Presale: ${presale.address}`);
  
  console.log(`\nUpdate your src/config/constant.js with these values:`);
  console.log(`usdtAddress: "${usdt.address}",`);
  console.log(`myidAddress: "${myid.address}",`);
  console.log(`presaleAddress: "${presale.address}",`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });