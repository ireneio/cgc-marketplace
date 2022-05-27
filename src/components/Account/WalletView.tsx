import { useEthereumProvider } from '@/contexts/EthereumWalletProvider';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import WalletCard from './WalletCard';
import EvmConnectButton from '@/components/Shared/EvmConnectButton';

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
      {!wallet.connected && (
        <div>
          <div className="text-[#FFFFFF] font-bold text-[20px]">
            You’ll need a wallet on Solana to continue
          </div>
          <div className="mt-[20px]">
            {/* <Button>Get Started</Button> */}
            <WalletMultiButton />
          </div>
        </div>
      )}
      {wallet.connected && (
        <div>
          <div className="text-[#FFFFFF] font-bold text-[20px]">
            Connected Wallets
          </div>
          <div className="mt-[20px] flex flex-wrap items-center">
            <div className="mr-[30px]">
              <WalletCard
                providerIcon="/img/logo_phantom.png"
                provider="Phantom"
                address={wallet.publicKey?.toString() || ''}
                onEditClick={() => handleSolanaEdit()}
              />
            </div>
            {/* {!signerAddress && <div className='flex items-center'>
              <div>
                <img src='/img/icon_plus' src='plus' width={14} height={14} />
              </div>
              <div>Add EVM Wallet</div>
            </div>} */}
            {!signerAddress && (
              <div>
                <EvmConnectButton />
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
        </div>
      )}
    </div>
  );
};

export default WalletView;
