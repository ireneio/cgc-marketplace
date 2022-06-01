import { testData } from '@/data/test';
import { useAppDispatch, useAppSelector } from '@/store';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ButtonLink from '../Shared/ButtonLink';
import LoadingNetflixCard from '../Shared/LoadingNetflixCard';
import SectionTitle from '../Shared/SectionTitle';
import FloatingCardWrapper from './FloatingCardWrapper';

const AllGames = () => {
  const dispatch = useAppDispatch();
  const [items, setItems] = useState(testData.recentlyAddedCollections);
  const [loading, setLoading] = useState(true);
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

  return (
    <div className="mt-[24px]">
      <div className="flex justify-between items-center">
        <SectionTitle>all games</SectionTitle>
      </div>
      <div className="cwrapper pt-[32px] pb-[24px] floating-card-wrapper hide-scrollbar">
        {!loading && <FloatingCardWrapper items={items} />}
        {loading &&
          items.map((game, index) => {
            return (
              <div key={index} className="mr-[24px]">
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
                payload: 'Explore/All',
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

export default AllGames;
