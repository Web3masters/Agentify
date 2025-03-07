# Agentify Smart Contract Deployment Guide

This document provides a step-by-step guide to deploy the Agentify smart contracts to the Aurora Testnet.

## Contract Architecture

The Agentify platform consists of the following smart contracts:

1. **USDT.sol**: A mock USDT token used for testing purposes.
2. **MYID.sol**: The MYID token used by the Agentify platform.
3. **ChainLink.sol**: A mock ChainLink oracle for ETH/USD price feeds.
4. **MYIDPresale.sol**: Presale contract for the MYID token.

## Prerequisites

Before deploying, ensure you have:

- An Aurora Testnet account with some ETH for gas
- The private key for your account
- Node.js and npm installed

## Deployment Steps

### 1. Set up Environment Variables

Create a `.env` file in the project root with your private key:

```
PRIVATE_KEY=<your-private-key>
AURORASCAN_API_KEY=<aurorascan-api-key>
```

### 2. Install Dependencies

Install the project dependencies:

```bash
npm install --legacy-peer-deps
```

### 3. Compile the Contracts

Compile the smart contracts:

```bash
npm run compile
```

### 4. Deploy the Contracts

Deploy the contracts to Aurora Testnet:

```bash
npm run deploy:aurora
```

This script will:
- Deploy the USDT token
- Deploy the MYID token
- Deploy the ChainLink mock
- Deploy the MYIDPresale contract
- Initialize the MYIDPresale contract with token addresses
- Transfer MYID tokens to the presale contract

### 5. Verify the Contracts

After deployment, verify the contracts on the Aurora Testnet Explorer:

```bash
export USDT_ADDRESS=<deployed-usdt-address>
export MYID_ADDRESS=<deployed-myid-address>
export CHAINLINK_ADDRESS=<deployed-chainlink-address>
export PRESALE_ADDRESS=<deployed-presale-address>
npm run verify:aurora
```

### 6. Update Contract Addresses

Update the contract addresses in your frontend configuration:

```javascript
// src/config/constant.js
const usdtAddress = "<deployed-usdt-address>";
const myidAddress = "<deployed-myid-address>";
const presaleAddress = "<deployed-presale-address>";
```

## Expected Deployment Output

When you run the deployment script successfully, you should see output like this:

```
Deploying contracts to Aurora Testnet...
Deploying USDT token...
USDT deployed to: 0x...
Deploying MYID token...
MYID Token deployed to: 0x...
Deploying ChainLink mock...
ChainLink mock deployed to: 0x...
Deploying MYIDPresale contract...
MYID Presale deployed to: 0x...
Initializing presale contract...
Presale contract initialized
Transferring MYID tokens to presale contract...
Transferred 10000000 MYID tokens to presale contract

Deployment complete! Contract addresses:
USDT: 0x...
MYID: 0x...
ChainLink: 0x...
Presale: 0x...

Update your src/config/constant.js with these values:
usdtAddress: "0x...",
myidAddress: "0x...",
presaleAddress: "0x...",
```

## Testing the Contracts

After deployment, you can interact with the contracts using tools like Remix or ethers.js:

1. **Buying MYID tokens with USDT**:
   - Approve the presale contract to spend your USDT
   - Call the `contributeUSDT` function on the presale contract

2. **Buying MYID tokens with ETH**:
   - Call the `contributeEth` function and send ETH

3. **Checking your token balance**:
   - Call the `balancesOf` function on the presale contract

## Contract Addresses (Aurora Testnet)

Once deployed, your contract addresses will be:

- USDT Token: `0x...`
- MYID Token: `0x...`
- ChainLink Mock: `0x...`
- MYIDPresale: `0x...`

Replace these placeholders with your actual deployed addresses.