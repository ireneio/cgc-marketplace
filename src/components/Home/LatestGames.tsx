import { useEffect, useState } from 'react';
import ButtonLink from '../Shared/ButtonLink';
import FloatingCard from '../Shared/FloatingCard';
import LoadingNetflixCard from '../Shared/LoadingNetflixCard';
import SectionTitle from '../Shared/SectionTitle';
import SelectGroup from '../Shared/SelectGroup';

const LatestGames = () => {
  const [items, setitems] = useState([1, 2, 3, 4, 5]);
  const [currentSelection, setCurrentSelection] = useState('live');
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
        <SectionTitle>latest games</SectionTitle>
        <SelectGroup
          items={[
            { text: 'Live', value: 'live' },
            { text: 'Coming Soon', value: 'soon' },
          ]}
          currentValue={currentSelection}
          onItemClick={(value) => setCurrentSelection(value)}
        />
      </div>
      <div className="mt-[24px] overflow-y-visible mr-[-24px] flex floating-card-wrapper hide-scrollbar">
        {!loading &&
          items.map((game, index) => {
            return (
              <div key={index}>
                <FloatingCard
                  bg={'/img/ss_1.webp'}
                  title={'Sing-to-earn rhythm action and karaoke game!'}
                  categories={['virtual idol', 'metaverse', 'nft']}
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

export default LatestGames;
