import DetailView from '@/components/Collection/DetailView';
import MarketView from '@/components/Collection/MarketView';
import YourView from '@/components/Collection/YourView';
import DefaultLayout from '@/components/Layout/DefaultLayout';
import Breadcrumb from '@/components/Shared/Breadcrumb';
import Divider from '@/components/Shared/Divider';
import SelectGroup from '@/components/Shared/SelectGroup';
import { useAppDispatch } from '@/store';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { getBreadcrumbRoutes, getSelectGroupItems } from '@/utils/cgcConsts';

type Selection =
  | 'About'
  | 'All Items'
  | 'Your Items'
  | 'Activity'
  | 'Staking'
  | '...';

const Collection = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [currentSelection, setCurrentSelection] = useState<Selection>('About');
  const [info, setInfo] = useState({
    name: 'SolChicks',
    header: 'SolChicks',
  });

  const handleSelect = (value: Selection) => {
    setCurrentSelection(value);
    if (value === '...') {
      return;
    }
    switch (value) {
      case 'About':
        setInfo((prev) => ({
          ...prev,
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
    }
  };

  const breadcrumbItems = useMemo(() => {
    return getBreadcrumbRoutes(currentSelection, info.name);
  }, [info, currentSelection]);

  return (
    <DefaultLayout>
      <div className="mb-[16px]">
        <Breadcrumb
          items={breadcrumbItems}
          currentValue={
            currentSelection === 'About' ? 'Collection' : currentSelection
          }
          onItemClick={(val) => {
            if (val === 'Home') {
              dispatch({ type: 'SET_NAVIGATION_PATH', payload: 'Home' });
              router.push('/').then();
            } else if (val === 'Collection') {
              handleSelect('About');
            } else if (val === 'Explore/All') {
              dispatch({ type: 'SET_NAVIGATION_PATH', payload: val });
              router.push('/').then();
            }
          }}
        />
      </div>
      <div className="flex justify-between items-center mb-[16px]">
        <div className="text-[#FFFFFF] font-bold text-[24px]">{info.name}</div>
        <div>
          <SelectGroup
            items={getSelectGroupItems()}
            currentValue={currentSelection}
            onItemClick={(value) => handleSelect(value as Selection)}
          />
        </div>
      </div>
      <div className="mb-[24px]">
        <Divider />
      </div>
      {currentSelection === 'About' && <DetailView />}
      {currentSelection === 'All Items' && <MarketView />}
      {currentSelection === 'Your Items' && <YourView />}
    </DefaultLayout>
  );
};

export default Collection;
