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
import { OAuthContext } from '@/contexts/OAuthProvider';
import withAuth, { SavedPathType } from '@/middlewares/withAuth';
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useMemo, useState } from 'react';

type Selection =
  | 'wallet'
  | 'profile'
  | 'items'
  | 'listed'
  | 'auction'
  | 'offers'
  | 'activities';

const Account = ({
  setSavedPath,
}: {
  setSavedPath: React.Dispatch<React.SetStateAction<SavedPathType>>;
}) => {
  const router = useRouter();
  const wallet = useWallet();
  const { signerAddress } = useEthereumProvider();
  const oAuthCtx = useContext(OAuthContext);
  const [currentSelection, setCurrentSelection] = useState<Selection>('wallet');

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

  const handleSelection = (value: Selection) => {
    setCurrentSelection(value);
    router.push(`/account?tab=${value}`).then();
  };

  const handleSignOut = () => {
    oAuthCtx.logout();
  };

  useEffect(() => {
    if (router.query.tab) {
      const tab = String(router.query.tab);
      setCurrentSelection(tab as Selection);
      router.query.tab = '';
    }
  }, [router.query]);

  useEffect(() => {
    setSavedPath({ type: 'route', path: '/' });
  }, [router.pathname]);

  return (
    <DefaultLayout>
      <div className="mb-[24px]">
        <Breadcrumb
          items={[
            { text: 'Home', value: '/' },
            { text: 'cgPass', value: '/account?tab=wallet' },
          ]}
        />
      </div>
      <div className="flex items-center mb-[24px] flex-wrap">
        <div>
          <Avatar />
        </div>
        <div className="text-[#FFFFFF] ml-[34px]">
          <div className="font-bold text-[24px]">My cgPass</div>
        </div>
        <div className="ml-auto basis-[100%] md:basis-auto mt-[24px] md:mt-0">
          <Button onClick={() => handleSignOut()}>Sign Out</Button>
        </div>
      </div>
      <div className="mb-[24px]">
        <Divider />
      </div>
      <div className="flex justify-between items-center mb-[24px] flex-wrap">
        <div className="text-[#FFFFFF] font-bold text-[20px]">{title}</div>
        <div className="basis-[100%] lg:basis-auto mt-[12px] lg:mt-0">
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
            onItemClick={(value) => handleSelection(value as Selection)}
          />
        </div>
      </div>
      <div className="mb-[24px]">
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

export default withAuth(Account);
