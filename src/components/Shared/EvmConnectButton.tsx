import { useEthereumProvider } from '@/contexts/EthereumWalletProvider';
import { getTrimmedAddressEllipsisMiddle } from '@/utils/formatHelper';
import Button from './Button';

export default function MetamaskConnectButton() {
  const { connect, disconnect, signerAddress } = useEthereumProvider();

  return (
    <div className="flex">
      {!signerAddress && (
        <Button
          onClick={connect}
          className="flex w-full text-left px-4 py-2 text-sm bg-transparent text-white"
        >
          <img
            src="/img/icon_metamask.svg"
            width={18}
            height={18}
            alt="metamask"
          />
          <span className="ml-[10px]">Connect</span>
        </Button>
      )}
      {signerAddress && (
        <Button
          onClick={disconnect}
          className="block w-full text-left px-4 py-2 text-sm bg-transparent text-white"
        >
          {/* Disconnect{` `} */}
          {getTrimmedAddressEllipsisMiddle(signerAddress, { length: 6 })}
        </Button>
      )}
    </div>
  );
}
