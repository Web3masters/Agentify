import { createAppKit } from '@reown/appkit/react';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiAdapter, defineNetwork } from '@reown/appkit-adapter-wagmi';

const queryClient = new QueryClient();

const projectId = '7e66aad70270b80cd2e9135fc7196cfd'; 

const metadata = {
  name: 'AppKit Example',
  description: 'Demo of Reown AppKit',
  url: 'http://localhost:3000', 
  icons: ['https://avatars.githubusercontent.com/u/179229932'],
};

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

const networks = [auroraTestnet];

const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true,
});

// Initialize AppKit modal
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  defaultNetwork: auroraTestnet,
  projectId,
  metadata,
  features: {
    analytics: true, // Enables analytics
    email: false,
    socials: [],
    allWallets: true,
    emailShowWallets: true,
    swaps: false,
  },
});

// 8. Define AppKit Provider Component
export function AppKitProvider({ children }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
