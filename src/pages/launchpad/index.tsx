import CollectionsCard from '@/components/Collections/CollectionsCard';
import CollectionsCardLoading from '@/components/Collections/CollectionsCardLoading';
import DefaultLayout from '@/components/Layout/DefaultLayout';
import Breadcrumb from '@/components/Shared/Breadcrumb';
import Divider from '@/components/Shared/Divider';
import SelectGroup from '@/components/Shared/SelectGroup';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type Selection = 'Coming Soon' | 'Ended';

const LOADING_ARR = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

interface LaunchpadItem {
  id: string | number;
  type: 'nft' | 'token';
  image: string;
}

const Launchpad = () => {
  const router = useRouter();
  const [currentSelection, setCurrentSelection] = useState('Coming Soon');
  const [items] = useState<LaunchpadItem[]>(
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => ({
      id: item,
      type: item % 2 === 0 ? 'nft' : 'token',
      image: '/img/cgc_icon.png',
    })),
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const tid = setTimeout(() => {
      setLoading(false);
      clearTimeout(tid);
    }, 1200);
  }, []);

  const handleCardClick = (item: LaunchpadItem) => {
    if (item.type === 'token') {
      router.push(`/launchpad/${item.id}`).then();
    } else {
      router.push(`/launchpad/nft/${item.id}`).then();
    }
  };

  return (
    <DefaultLayout>
      <div className="mb-[24px]">
        <Breadcrumb
          items={[
            { text: 'Home', value: '/' },
            { text: 'Launchpad', value: '/launchpad' },
          ]}
        />
      </div>
      <div className="flex justify-between items-center mb-[24px]">
        <div className="text-[#FFFFFF] font-bold text-[20px]">Collections</div>
        <div>
          <SelectGroup
            items={[
              { text: 'Coming Soon', value: 'Coming Soon' },
              { text: 'Ended', value: 'Ended' },
            ]}
            currentValue={currentSelection}
            onItemClick={(value) => setCurrentSelection(value as Selection)}
          />
        </div>
      </div>
      <div className="mb-[24px]">
        <Divider />
      </div>
      <div className="grid gap-[12px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cold-6 auto-rows-auto mb-[24px]">
        {!loading && !items.length && (
          <div className="text-[#FFFFFF] text-semibold">
            No Collections Found.
          </div>
        )}
        {!loading &&
          items.length &&
          items.map((item, index) => {
            return (
              <div key={index} className="cursor-pointer">
                <CollectionsCard
                  id={String(index)}
                  image={item.image}
                  onClick={() => handleCardClick(item)}
                />
              </div>
            );
          })}
        {loading &&
          LOADING_ARR.map((item, index) => {
            return (
              <div key={index}>
                <CollectionsCardLoading />
              </div>
            );
          })}
      </div>
    </DefaultLayout>
  );
};

export default Launchpad;
