import { useEthereumProvider } from '@/contexts/EthereumWalletProvider';
import Button from './Button';

export default function MetamaskConnectButton() {
  const { connect, disconnect, signerAddress } = useEthereumProvider();

  return (
    <div className="hidden lg:flex pr-3 pl-2">
      {!signerAddress && (
        <Button
          onClick={connect}
          className="block w-full text-left px-4 py-2 text-sm bg-transparent text-white"
        >
          Connect MetaMask
        </Button>
      )}
      {signerAddress && (
        <Button
          onClick={disconnect}
          className="block w-full text-left px-4 py-2 text-sm bg-transparent text-white"
        >
          Disconnect{` `}
          {signerAddress.substring(0, signerAddress.startsWith(`0x`) ? 6 : 3)}
          ...
        </Button>
      )}
    </div>
  );
}
