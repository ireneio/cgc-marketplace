import { testData } from '@/data/test';
import { useAppDispatch, useAppSelector } from '@/store';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ButtonLink from '../Shared/ButtonLink';
import LoadingNetflixCard from '../Shared/LoadingNetflixCard';
import SectionTitle from '../Shared/SectionTitle';
import SelectGroup from '../Shared/SelectGroup';
import FloatingCardWrapper from './FloatingCardWrapper';

const PopularGames = () => {
  const dispatch = useAppDispatch();
  const [items, setItems] = useState(testData.recentlyAddedCollections);
  const [currentSelection, setCurrentSelection] = useState('m');
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const sideBarPath = useAppSelector((state) => state.layout.navigation.path);

  useEffect(() => {
    const _tid = setTimeout(() => {
      setLoading(false);
      clearTimeout(_tid);
    }, 1200);
    return () => {
      clearTimeout(_tid);
    };
  });

  const handleOnPlay = (id: string | number) => {
    router.push(`/collection/${id}`);
  };

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <SectionTitle>popular games</SectionTitle>
        <SelectGroup
          items={[
            { text: '1d', value: 'd' },
            { text: '1w', value: 'w' },
            { text: '1m', value: 'm' },
            { text: 'All Time', value: 'at' },
          ]}
          currentValue={currentSelection}
          onItemClick={(value) => setCurrentSelection(value)}
        />
      </div>
      <div className="overflow-y-visible mr-[24px] flex floating-card-wrapper hide-scrollbar justify-start">
        {!loading && <FloatingCardWrapper items={items} />}
        {loading &&
          items.map((game, index) => {
            return (
              <div key={index} className="mr-[12px]">
                <LoadingNetflixCard />
              </div>
            );
          })}
      </div>
      <div className="flex justify-end mt-[20px] mb-[40px]">
        {sideBarPath === 'Home' && (
          <ButtonLink
            onClick={() => {
              dispatch({
                type: 'SET_NAVIGATION_PATH',
                payload: 'Explore/Popular',
              });
              window.scroll(0, 0);
            }}
          >
            see all
          </ButtonLink>
        )}
      </div>
    </div>
  );
};

export default PopularGames;
