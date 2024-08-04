import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { scrollSepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Sendy App',
  projectId: 'sendy',
  chains: [scrollSepolia],
});

