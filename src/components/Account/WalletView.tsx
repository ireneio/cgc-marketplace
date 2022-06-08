import { useEthereumProvider } from '@/contexts/EthereumWalletProvider';
import { useWallet } from '@solana/wallet-adapter-react';
import WalletCard from './WalletCard';
import EvmConnectButton from '@/components/Shared/EvmConnectButton';
import SolanaConnectButton from '../Shared/SolanaConnectButton';

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
        {/* <div className="text-[#FFFFFF] font-bold text-[20px]">{title}</div> */}
        <div className="mt-[20px] flex flex-wrap items-center">
          {wallet.connected && (
            <div className="mr-[30px]">
              <WalletCard
                providerIcon="/img/logo_phantom.png"
                provider="Phantom"
                address={wallet.publicKey?.toString() || ''}
                onEditClick={() => handleSolanaEdit()}
              />
            </div>
          )}
          {signerAddress && (
            <div>
              <WalletCard
                providerIcon="/img/icon_metamask.svg"
                provider="Metamask"
                address={signerAddress}
                onEditClick={() => handleEthEdit()}
              />
            </div>
          )}
        </div>
        <div className="mt-[20px]">
          {!wallet.connected && <SolanaConnectButton />}
          {!signerAddress && (
            <div className="mt-[20px]">
              <EvmConnectButton />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletView;
