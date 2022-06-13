import { useEthereumProvider } from '@/contexts/EthereumWalletProvider';
import { useWallet } from '@solana/wallet-adapter-react';
import WalletCard from './WalletCard';
import EvmConnectButton from '@/components/Web3/EvmConnectButton';
import SolanaConnectButton from '../Web3/SolanaConnectButton';

const WalletView = () => {
  const wallet = useWallet();
  const { disconnect, signerAddress } = useEthereumProvider();

  const handleSolanaEdit = () => {
    wallet.disconnect();
  };

  const handleEthEdit = () => {
    disconnect();
  };

  return (
    <div>
      <div>
        <div className="mt-[24px] grid-cols-1 lg:grid-cols-4 grid gap-[24px]">
          {wallet.connected && (
            <div className="lg:colspan-2">
              <WalletCard
                providerIcon="/img/logo_phantom.png"
                provider="Phantom"
                address={wallet.publicKey?.toString() || ''}
                onEditClick={() => handleSolanaEdit()}
              />
            </div>
          )}
          {signerAddress && (
            <div className="lg:colspan-2">
              <WalletCard
                providerIcon="/img/icon_metamask.svg"
                provider="Metamask"
                address={signerAddress}
                onEditClick={() => handleEthEdit()}
              />
            </div>
          )}
        </div>
        <div className="mt-[24px]">
          {!wallet.connected && <SolanaConnectButton />}
          {!signerAddress && (
            <div className="mt-[24px]">
              <EvmConnectButton />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletView;
