import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SolanaWalletProvider } from '@/contexts/SolanaWalletProvider';
import { EthereumWalletProvider } from '@/contexts/EthereumWalletProvider';
import { Provider as ReduxProvider } from 'react-redux';
import store from '../store';
import { useEffect } from 'react';
import api from '@/utils/api';
import { OAuthProvider } from '@/contexts/OAuthProvider';

function App({ Component, pageProps }: AppProps) {
  if (process.env.NODE_ENV === 'production') {
    console.log =
      console.warn =
      console.error =
        () => {
          return;
        };
  }

  useEffect(() => {
    api.healthCheck();
  }, []);

  return (
    <OAuthProvider>
      <SolanaWalletProvider>
        <EthereumWalletProvider>
          <ReduxProvider store={store}>
            <Component {...pageProps} />
            <div id="snackbar-root" />
          </ReduxProvider>
        </EthereumWalletProvider>
      </SolanaWalletProvider>
    </OAuthProvider>
  );
}

export default App;
