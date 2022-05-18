import { testData } from '@/data/test';
import { useEffect, useState } from 'react';
import ButtonLink from '../Shared/ButtonLink';
import FloatingCard from '../Shared/FloatingCard';
import LoadingNetflixCard from '../Shared/LoadingNetflixCard';
import SectionTitle from '../Shared/SectionTitle';

const AllGames = () => {
  const [items, setItems] = useState(testData.recentlyAddedCollections);
  const [loading, setLoading] = useState(true);

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
      <div className="mt-[24px] overflow-y-visible mr-[-24px] floating-card-wrapper hide-scrollbar">
        {!loading &&
          items.map((item, index) => {
            return (
              <div key={index}>
                <FloatingCard
                  bg={item.splashSrc}
                  title={item.description}
                  categories={item.tags}
                  network={'SOL'}
                  marketCap={'10000'}
                  coinSupply={'100000000000'}
                  onPlay={() => console.log('onPlay')}
                />
              </div>
            );
          })}
        {loading &&
          items.map((game, index) => {
            return (
              <div key={index} className="mr-[24px]">
                <LoadingNetflixCard />
              </div>
            );
          })}
      </div>
      <div className="flex justify-end mt-[20px]">
        <ButtonLink>see all</ButtonLink>
      </div>
    </div>
  );
};

export default AllGames;
