import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';

type Props = {};

export default function Header({}: Props) {
  const { address } = useAccount();
  const { openConnectModal, connectModalOpen } = useConnectModal();

  useEffect(() => {
    !address && !connectModalOpen && openConnectModal && openConnectModal();
  }, [connectModalOpen]);

  return (
    <div>
      <ConnectButton />
    </div>
  );
}
