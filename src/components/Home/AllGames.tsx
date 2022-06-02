import { testData } from '@/data/test';
import { useAppDispatch, useAppSelector } from '@/store';
import { useEffect, useState } from 'react';
import ButtonLink from '../Shared/ButtonLink';
import LoadingNetflixCard from '../Shared/LoadingNetflixCard';
import SectionTitle from '../Shared/SectionTitle';
import CardCarousel from './CardCarousel';

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
    <div className="">
      <div className="flex justify-between items-center">
        <SectionTitle>all collections</SectionTitle>
      </div>
      <div className="pb-[24px] hide-scrollbar">
        {!loading && <CardCarousel items={items} />}
        {loading && (
          <div className="flex pt-[12px]">
            {items.map((game, index) => {
              return (
                <div key={index} className="mr-[12px]">
                  <LoadingNetflixCard />
                </div>
              );
            })}
          </div>
        )}
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
