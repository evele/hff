import { useEffect, useState } from 'react';
import {
  createPublicClient,
  createWalletClient,
  custom,
  http,
  PublicClient,
  WalletClient,
} from 'viem';
import { scrollSepolia } from 'viem/chains';
import 'viem/window';

export default function useCreateClient() {
  const [walletClient, setWalletClient] = useState<null | WalletClient>(null);
  const [publicClient, setPublicClient] = useState<null | PublicClient>(null);

  useEffect(() => {
    if (window && window.ethereum) {
      const publicClient = createPublicClient({
        chain: scrollSepolia,
        transport: http('https://sepolia-rpc.scroll.io'),
      });

      setPublicClient(publicClient);

      const walletClient = createWalletClient({
        chain: scrollSepolia,
        transport: custom(window.ethereum),
      });
      setWalletClient(walletClient);
    }
  }, []);

  return { publicClient, walletClient };
}
