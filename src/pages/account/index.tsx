import Avatar from '@/components/Account/Avatar';
import ProfileView from '@/components/Account/ProfileView';
import WalletView from '@/components/Account/WalletView';
import DefaultLayout from '@/components/Layout/DefaultLayout';
import BreadCrumb from '@/components/Shared/Breadcrumb';
import Button from '@/components/Shared/Button';
import Divider from '@/components/Shared/Divider';
import SelectGroup from '@/components/Shared/SelectGroup';
import { useAppDispatch, useAppSelector } from '@/store';
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
  const title = useMemo(() => {
    switch (currentSelection) {
      case 'wallet':
        return 'Wallet';
      case 'profile':
        return 'Profile Details';
      default:
        return 'title';
    }
  }, [currentSelection]);

  return (
    <DefaultLayout>
      <div className="mb-[24px]">
        <BreadCrumb
          items={[
            { text: 'Home', value: 'Home' },
            { text: 'My Passport', value: 'Account' },
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
          <div className="font-bold text-[24px]">My cg Pass</div>
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
              { text: 'Wallet', value: 'wallet' },
              { text: 'Profile', value: 'profile' },
              { text: 'My Items', value: 'items' },
              { text: 'Listed', value: 'listed' },
              { text: 'Offers', value: 'offers' },
              { text: 'Activities', value: 'activities' },
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
      </div>
    </DefaultLayout>
  );
};

export default Account;
