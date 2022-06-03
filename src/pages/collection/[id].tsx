import DetailView from '@/components/Game/DetailView';
import MarketView from '@/components/Game/MarketView';
import DefaultLayout from '@/components/Layout/DefaultLayout';
import BreadCrumb from '@/components/Shared/Breadcrumb';
import Divider from '@/components/Shared/Divider';
import SelectGroup from '@/components/Shared/SelectGroup';
import { useAppDispatch } from '@/store';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';

type Selection = 'About' | 'All Items' | 'Your Items' | 'Activity' | 'Staking';

const Game = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [currentSelection, setCurrentSelection] = useState<Selection>('About');
  const [info, setInfo] = useState({
    name: 'SolChicks',
    header: 'Welcome to the SolChicks Metaverse Crypto NFT Game',
  });

  const handleSelect = (value: Selection) => {
    setCurrentSelection(value);
    switch (value) {
      case 'About':
        setInfo((prev) => ({
          ...prev,
          // header: `Welcome to the ${info.name} Metaverse Crypto NFT Game`,
          header: info.name,
        }));
        return;
      case 'All Items':
        setInfo((prev) => ({
          ...prev,
          header: 'All Items',
        }));
        return;
      case 'Your Items':
        setInfo((prev) => ({
          ...prev,
          header: 'Your Items',
        }));
        return;
      case 'Activity':
        setInfo((prev) => ({
          ...prev,
          header: 'Activity',
        }));
        return;
      case 'Staking':
        setInfo((prev) => ({
          ...prev,
          header: 'Staking',
        }));
        return;
    }
  };

  const breadCrumbItems = useMemo(() => {
    switch (currentSelection) {
      case 'About':
        return [
          { text: 'Home', value: 'Home' },
          // { text: info.name, value: 'Game' },
          { text: 'Explore', value: 'Explore' },
        ];
      case 'All Items':
        return [
          { text: 'Home', value: 'Home' },
          { text: info.name, value: 'Game' },
          { text: 'All Items', value: 'All Items' },
        ];
      case 'Your Items':
        return [
          { text: 'Home', value: 'Home' },
          { text: info.name, value: 'Game' },
          { text: 'Your Items', value: 'Your Items' },
        ];
      case 'Staking':
        return [
          { text: 'Home', value: 'Home' },
          { text: info.name, value: 'Game' },
          { text: 'Staking', value: 'Staking' },
        ];
      case 'Activity':
        return [
          { text: 'Home', value: 'Home' },
          { text: info.name, value: 'Game' },
          { text: 'Activity', value: 'Activity' },
        ];
      default:
        return [];
    }
  }, [info, currentSelection]);

  return (
    <DefaultLayout>
      <div className="mb-[32px]">
        <BreadCrumb
          items={breadCrumbItems}
          currentValue={
            currentSelection === 'About' ? 'Game' : currentSelection
          }
          onItemClick={(val) => {
            if (val === 'Home') {
              dispatch({ type: 'SET_NAVIGATION_PATH', payload: 'Home' });
              router.push('/');
            } else if (val === 'Game') {
              handleSelect('About');
            }
          }}
        />
      </div>
      <div className="flex justify-between items-center mb-[32px]">
        <div className="text-[#FFFFFF] font-bold text-[24px]">{info.name}</div>
        <div>
          <SelectGroup
            items={[
              { text: 'About', value: 'About' },
              { text: 'All Items', value: 'All Items' },
              // { text: 'Your Items', value: 'Your Items' },
              // { text: 'Activity', value: 'Activity' },
              // { text: 'Staking', value: 'Staking' },
            ]}
            currentValue={currentSelection}
            onItemClick={(value) => handleSelect(value as Selection)}
          />
        </div>
      </div>
      <div className="mb-[32px]">
        <Divider />
      </div>
      {currentSelection === 'About' && <DetailView />}
      {currentSelection === 'All Items' && <MarketView />}
    </DefaultLayout>
  );
};

export default Game;
