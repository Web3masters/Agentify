"use client";

import { cookieStorage, createStorage } from "wagmi";
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { defineNetwork } from '@reown/appkit-adapter-wagmi';
import { PROJECT_ID } from "./constant";
export const projectId = PROJECT_ID;

if (!projectId) {
    throw new Error("Project ID is not defined!")
}

// Define Aurora Testnet
const auroraTestnet = defineNetwork({
  id: 1313161555,
  name: 'Aurora Testnet',
  rpcUrl: 'https://testnet.aurora.dev',
  blockExplorerUrl: 'https://explorer.testnet.aurora.dev/',
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
  },
});

export const networks = [auroraTestnet]

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage
  }),
  ssr: true,
  projectId,
  networks
})

export const config = wagmiAdapter.wagmiConfig