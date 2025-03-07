const hre = require("hardhat");
const { ethers } = require("hardhat");
const { parseUnits, formatUnits } = require("ethers");

async function main() {
  console.log("Deploying contracts to Aurora Testnet...");

  // Get the contract factories
  const USDT = await hre.ethers.getContractFactory("USDT");
  const MYID = await hre.ethers.getContractFactory("MYID");
  const ChainLink = await hre.ethers.getContractFactory("ChainLink");
  const MYIDPresale = await hre.ethers.getContractFactory("MYIDPresale");

  // Deploy USDT with 1,000,000 initial supply (6 decimals)
  const initialSupply = 1_000_000;
  const usdt = await USDT.deploy(
    initialSupply,
    "USDT Testnet",
    "USDT",
    6
  );
  await usdt.waitForDeployment();
  const usdtAddress = await usdt.getAddress();
  console.log(`USDT deployed to: ${usdtAddress}`);

  // Deploy MYID Token
  const myid = await MYID.deploy();
  await myid.waitForDeployment();
  const myidAddress = await myid.getAddress();
  console.log(`MYID Token deployed to: ${myidAddress}`);

  // Deploy ChainLink mock for ETH/USD price feed
  const chainLink = await ChainLink.deploy();
  await chainLink.waitForDeployment();
  const chainLinkAddress = await chainLink.getAddress();
  console.log(`ChainLink mock deployed to: ${chainLinkAddress}`);

  // Deploy Presale contract
  const presale = await MYIDPresale.deploy();
  await presale.waitForDeployment();
  const presaleAddress = await presale.getAddress();
  console.log(`MYID Presale deployed to: ${presaleAddress}`);

  // Initialize the presale contract
  const initTx = await presale.initialize(
    usdtAddress,
    myidAddress,
    chainLinkAddress
  );
  await initTx.wait();
  console.log("Presale contract initialized");

  // Transfer tokens to presale contract (10M tokens)
  const tokensForPresale = parseUnits("10000000", 18);
  const transferTx = await myid.transfer(presaleAddress, tokensForPresale);
  await transferTx.wait();
  console.log(`Transferred ${formatUnits(tokensForPresale, 18)} MYID tokens to presale contract`);

  console.log("\nDeployment complete! Contract addresses:");
  console.log(`USDT: ${usdtAddress}`);
  console.log(`MYID: ${myidAddress}`);
  console.log(`ChainLink: ${chainLinkAddress}`);
  console.log(`Presale: ${presaleAddress}`);
  
  // These values need to be updated in src/config/constant.js
  console.log(`\nUpdate your src/config/constant.js with these values:`);
  console.log(`usdtAddress: "${usdtAddress}",`);
  console.log(`myidAddress: "${myidAddress}",`);
  console.log(`presaleAddress: "${presaleAddress}",`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });