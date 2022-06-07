import Avatar from '@/components/Account/Avatar';
import ListingView from '@/components/Account/ListingView';
import MyItemsView from '@/components/Account/MyItemsView';
import ProfileView from '@/components/Account/ProfileView';
import WalletView from '@/components/Account/WalletView';
import DefaultLayout from '@/components/Layout/DefaultLayout';
import Breadcrumb from '@/components/Shared/Breadcrumb';
import Button from '@/components/Shared/Button';
import Divider from '@/components/Shared/Divider';
import SelectGroup from '@/components/Shared/SelectGroup';
import { useEthereumProvider } from '@/contexts/EthereumWalletProvider';
import { useAppDispatch, useAppSelector } from '@/store';
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';

type Selection =
  | 'wallet'
  | 'profile'
  | 'items'
  | 'listed'
  | 'auction'
  | 'offers'
  | 'activities';

const Account = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const email = useAppSelector((state) => state.user.userInfo.email);
  const [currentSelection, setCurrentSelection] = useState<Selection>('wallet');
  const wallet = useWallet();
  const { signerAddress } = useEthereumProvider();

  const walletTitle = useMemo(() => {
    if (wallet.connected && signerAddress) {
      return 'Connected Wallets';
    } else if (!wallet.connected && !signerAddress) {
      return 'Please connect your Solana and Metamask Wallet.';
    } else if (!wallet.connected) {
      return 'Please connect your Solana Wallet.';
    } else if (!signerAddress) {
      return 'Please connect your Metamask Wallet.';
    }
  }, [wallet.connected, signerAddress]);

  const title = useMemo(() => {
    switch (currentSelection) {
      case 'wallet':
        return walletTitle;
      case 'profile':
        return 'Profile Details';
      case 'items':
        return 'My Items';
      case 'listed':
        return 'My Listed Items';
      default:
        return 'title';
    }
  }, [currentSelection, walletTitle]);

  return (
    <DefaultLayout>
      <div className="mb-[24px]">
        <Breadcrumb
          items={[
            { text: 'Home', value: 'Home' },
            { text: 'cgPass', value: 'Account' },
          ]}
          currentValue={'Account'}
          onItemClick={(val) => {
            if (val === 'Home') {
              dispatch({ type: 'SET_NAVIGATION_PATH', payload: 'Home' });
              router.push('/');
            }
          }}
        />
      </div>
      <div className="flex items-center mb-[40px]">
        <div>
          <Avatar />
        </div>
        <div className="text-[#FFFFFF] ml-[34px]">
          <div className="font-bold text-[24px]">My cgPass</div>
          <div className="text-[20px] mt-[2px]">{email}</div>
        </div>
        <div className="ml-auto">
          <Button>Sign Out</Button>
        </div>
      </div>
      <div className="mb-[30px]">
        <Divider />
      </div>
      <div className="flex justify-between items-center mb-[30px]">
        <div className="text-[#FFFFFF] font-bold text-[20px]">{title}</div>
        <div>
          <SelectGroup
            items={[
              { text: 'Wallets', value: 'wallet' },
              { text: 'Profile', value: 'profile' },
              { text: 'My Items', value: 'items' },
              { text: 'Listed', value: 'listed' },
              // { text: 'Offers', value: 'offers' },
              // { text: 'Activities', value: 'activities' },
            ]}
            currentValue={currentSelection}
            onItemClick={(value) => setCurrentSelection(value as Selection)}
          />
        </div>
      </div>
      <div className="mb-[30px]">
        <Divider />
      </div>
      <div>
        {currentSelection === 'wallet' && <WalletView />}
        {currentSelection === 'profile' && <ProfileView />}
        {currentSelection === 'items' && <MyItemsView />}
        {currentSelection === 'listed' && <ListingView />}
      </div>
    </DefaultLayout>
  );
};

export default Account;
