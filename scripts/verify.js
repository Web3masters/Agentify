const { run } = require("hardhat");

async function main() {
  // Get the deployed contract addresses from environment variables or hardcode them
  const usdtAddress = process.env.USDT_ADDRESS;
  const myidAddress = process.env.MYID_ADDRESS;
  const chainLinkAddress = process.env.CHAINLINK_ADDRESS;
  const presaleAddress = process.env.PRESALE_ADDRESS;

  if (!usdtAddress || !myidAddress || !chainLinkAddress || !presaleAddress) {
    console.error("Please provide all contract addresses as environment variables:");
    console.error("USDT_ADDRESS, MYID_ADDRESS, CHAINLINK_ADDRESS, PRESALE_ADDRESS");
    process.exit(1);
  }

  console.log("Verifying contracts on Aurora Testnet Explorer...");

  // Verify USDT contract
  console.log("\nVerifying USDT contract...");
  try {
    await run("verify:verify", {
      address: usdtAddress,
      constructorArguments: [
        1000000, // initialSupply
        "USDT Testnet", // name
        "USDT", // symbol
        6 // decimals
      ],
    });
    console.log("USDT contract verified successfully");
  } catch (error) {
    console.error("Error verifying USDT contract:", error.message);
  }

  // Verify MYID contract
  console.log("\nVerifying MYID contract...");
  try {
    await run("verify:verify", {
      address: myidAddress,
      constructorArguments: [],
    });
    console.log("MYID contract verified successfully");
  } catch (error) {
    console.error("Error verifying MYID contract:", error.message);
  }

  // Verify ChainLink contract
  console.log("\nVerifying ChainLink contract...");
  try {
    await run("verify:verify", {
      address: chainLinkAddress,
      constructorArguments: [],
    });
    console.log("ChainLink contract verified successfully");
  } catch (error) {
    console.error("Error verifying ChainLink contract:", error.message);
  }

  // Verify MYIDPresale contract
  console.log("\nVerifying MYIDPresale contract...");
  try {
    await run("verify:verify", {
      address: presaleAddress,
      constructorArguments: [],
    });
    console.log("MYIDPresale contract verified successfully");
  } catch (error) {
    console.error("Error verifying MYIDPresale contract:", error.message);
  }

  console.log("\nVerification process completed!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });