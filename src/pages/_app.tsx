import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SolanaWalletProvider } from '@/contexts/SolanaWalletProvider';
import { EthereumWalletProvider } from '@/contexts/EthereumWalletProvider';
import { Provider as ReduxProvider } from 'react-redux';
import store from '../store';

function App({ Component, pageProps }: AppProps) {
  if (process.env.NODE_ENV === 'production') {
    console.log =
      console.warn =
      console.error =
        () => {
          return;
        };
  }

  return (
    <SolanaWalletProvider>
      <EthereumWalletProvider>
        <ReduxProvider store={store}>
          <Component {...pageProps} />
          <div id="snackbar-root"></div>
        </ReduxProvider>
      </EthereumWalletProvider>
    </SolanaWalletProvider>
  );
}

export default App;
