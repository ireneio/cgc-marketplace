import { useEthereumProvider } from '@/contexts/EthereumWalletProvider';
import { getTrimmedAddress } from '@/utils/formatters';
import Button from './Button';

export default function MetamaskConnectButton() {
  const { connect, disconnect, signerAddress } = useEthereumProvider();

  return (
    <div className="hidden lg:flex pr-3 pl-2">
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
          Disconnect{` `}
          {getTrimmedAddress(signerAddress, { length: 5 })}
        </Button>
      )}
    </div>
  );
}
