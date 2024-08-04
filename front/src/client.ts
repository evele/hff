import { createPublicClient, createWalletClient, custom, http } from 'viem';
import { scrollSepolia } from 'viem/chains';
import 'viem/window';

export const publicClient = createPublicClient({
  chain: scrollSepolia,
  transport: http('https://sepolia-rpc.scroll.io'),
});

export const walletClient = createWalletClient({
  chain: scrollSepolia,
  transport: custom(window.ethereum!),
});
