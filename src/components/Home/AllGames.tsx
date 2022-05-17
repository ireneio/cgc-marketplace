import { useState } from 'react';
import ButtonLink from '../Shared/ButtonLink';
import FloatingCard from '../Shared/FloatingCard';
import NetflixCard from '../Shared/NetflixCard';
import SectionTitle from '../Shared/SectionTitle';

const AllGames = () => {
  const [items, setitems] = useState([1, 2, 3, 4, 5]);

  return (
    <div className="mt-[50px]">
      <div className="flex justify-between items-center">
        <SectionTitle>all games</SectionTitle>
      </div>
      <div className="mt-[24px] overflow-y-visible mr-[-24px] floating-card-wrapper">
        {items.map((game, index) => {
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
      </div>
      <div className="flex justify-end mt-[20px]">
        <ButtonLink>see all</ButtonLink>
      </div>
    </div>
  );
};

export default AllGames;
