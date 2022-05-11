import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SolanaWalletProvider } from '@/contexts/SolanaWalletProvider';
import { EthereumWalletProvider } from '@/contexts/EthereumWalletProvider';

function App({ Component, pageProps }: AppProps) {
  return (
    <SolanaWalletProvider>
      <EthereumWalletProvider>
        <Component {...pageProps} />
      </EthereumWalletProvider>
    </SolanaWalletProvider>
  );
}

export default App;
