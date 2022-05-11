import { useEthereumProvider } from '@/contexts/EthereumWalletProvider';

export default function MetamaskConnectButton() {
  const { connect, disconnect, signerAddress } = useEthereumProvider();

  return (
    <div className="flex hidden lg:block pr-3 pl-2">
      {!signerAddress && (
        <button
          onClick={connect}
          className="block w-full text-left px-4 py-2 text-sm bg-[#F6861C] text-white hover:bg-gray-700
           font-circularstdbold rounded-md"
        >
          Connect MetaMask
        </button>
      )}
      {signerAddress && (
        <button
          onClick={disconnect}
          className="block w-full text-left px-4 py-2 text-sm bg-[#F6861C] text-white hover:bg-gray-700
           font-circularstdbold rounded-md"
        >
          Disconnect{` `}
          {signerAddress.substring(0, signerAddress.startsWith(`0x`) ? 6 : 3)}
          ...
        </button>
      )}
    </div>
  );
}
