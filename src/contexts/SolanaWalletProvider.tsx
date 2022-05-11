import React, { JSXElementConstructor, ReactElement, useMemo } from 'react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { clusterApiUrl } from '@solana/web3.js';
import {
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
  TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import {
  ConnectionProvider,
  useWallet,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
require('@solana/wallet-adapter-react-ui/styles.css');

export const SolanaWalletProvider = ({
  children,
}: {
  children: ReactElement<
    typeof React.Children,
    string | JSXElementConstructor<unknown>
  >;
}) => {
  const network =
    process.env.NEXT_PUBLIC_CLUSTER === 'mainnet'
      ? WalletAdapterNetwork.Mainnet
      : process.env.NEXT_PUBLIC_CLUSTER === 'devnet'
      ? WalletAdapterNetwork.Devnet
      : WalletAdapterNetwork.Testnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new TorusWalletAdapter(),
      new LedgerWalletAdapter(),
      new SolletWalletAdapter({ network }),
      new SolletExtensionWalletAdapter({ network }),
    ],
    [network],
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export const useSolanaWallet = useWallet;
