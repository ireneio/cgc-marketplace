import LandingCarousel from '@/components/Home/LandingCarousel';
import TransactionTable from '@/components/Home/TransactionTable';
import DefaultLayout from '@/components/Layout/DefaultLayout';
import ButtonLink from '@/components/Shared/ButtonLink';
import NetflixCard from '@/components/Shared/NetflixCard';
import Pagination from '@/components/Shared/Pagination';
import SalesCard from '@/components/Shared/SalesCard';
import SectionTitle from '@/components/Shared/SectionTitle';
import SelectGroup from '@/components/Shared/SelectGroup';
import { useState } from 'react';

const Index = () => {
  const [currentItemSelectGroup, setCurrentItemSelectGroup] = useState('live');
  const [currentItemSelectPopularGames, setCurrentItemSelectPopularGames] =
    useState('m');
  const [games, setGames] = useState([1, 2, 3, 4, 5]);
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <DefaultLayout>
      <div>
        <LandingCarousel />
        <div className="mt-[50px]">
          <div className="flex justify-between items-center">
            <SectionTitle>latest games</SectionTitle>
            <SelectGroup
              items={[
                { text: 'Live', value: 'live' },
                { text: 'Coming Soon', value: 'soon' },
              ]}
              currentValue={currentItemSelectGroup}
              onItemClick={(value) => setCurrentItemSelectGroup(value)}
            />
          </div>
          <div
            className="mt-[24px] overflow-y-visible mr-[-24px] flex"
            id="game-slider"
          >
            {games.map((game, index) => {
              return (
                <div key={index} className="mr-[24px]">
                  <NetflixCard
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
        <div className="mt-[50px]">
          <div className="flex justify-between items-center">
            <SectionTitle>popular games</SectionTitle>
            <SelectGroup
              items={[
                { text: '1d', value: 'd' },
                { text: '1w', value: 'w' },
                { text: '1m', value: 'm' },
                { text: 'All Time', value: 'at' },
              ]}
              currentValue={currentItemSelectPopularGames}
              onItemClick={(value) => setCurrentItemSelectPopularGames(value)}
            />
          </div>
          <div
            className="mt-[24px] overflow-y-visible mr-[-24px] flex"
            id="game-slider"
          >
            {games.map((game, index) => {
              return (
                <div key={index} className="mr-[24px]">
                  <NetflixCard
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
        <div className="mt-[50px]">
          <div className="flex justify-between items-center">
            <SectionTitle>all games</SectionTitle>
          </div>
          <div
            className="mt-[24px] overflow-y-visible mr-[-24px] flex"
            id="game-slider"
          >
            {games.map((game, index) => {
              return (
                <div key={index} className="mr-[24px]">
                  <NetflixCard
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
        <div className="mt-[50px]">
          <div className="flex justify-between items-center">
            <SectionTitle>latest transactions</SectionTitle>
            <div>
              <Pagination
                totalPages={15}
                currentPage={currentPage}
                onPageChange={(val) => setCurrentPage(val)}
                onPreviousPage={() => setCurrentPage((prev) => prev - 1)}
                onNextPage={() => setCurrentPage((prev) => prev + 1)}
              />
            </div>
          </div>
          <div className="mt-[24px]">
            <TransactionTable
              rows={[
                [
                  { icon: '/img/icon_shards.png', text: 'shards' },
                  'AC95124da74ca921wdpk1134',
                  new Date().toISOString(),
                  'AC95124da74ca921wdpk1134',
                  'AC95124da74ca921wdpk1134',
                  '123.45678',
                ],
                [
                  { icon: '/img/icon_chicks.png', text: 'chicks' },
                  'AC95124da74ca921wdpk1134',
                  new Date().toISOString(),
                  'AC95124da74ca921wdpk1134',
                  'AC95124da74ca921wdpk1134',
                  '12345678.45678',
                ],
                [
                  { icon: '/img/icon_sol.png', text: 'chicks' },
                  'AC95124da74ca921wdpk1134',
                  new Date().toISOString(),
                  'AC95124da74ca921wdpk1134',
                  'AC95124da74ca921wdpk1134',
                  '12399999999.45678',
                ],
              ]}
              headers={[
                'item',
                'signature',
                'time',
                'from',
                'to',
                'amount($USD)',
              ]}
            />
          </div>
        </div>
        <div className="mt-[50px]">
          <div className="flex justify-between items-center">
            <SectionTitle>latest sales</SectionTitle>
          </div>
          <div className="mt-[24px] flex overflow-auto" id="game-slider">
            {games.map((game, index) => {
              return (
                <div key={index} className="mr-[28px]">
                  <SalesCard
                    img={'/img/nft1.png'}
                    title={'Wendingo #13 - The Alchemist'}
                    brand={'Kreechers'}
                    signature={'AC95124da74c130920980834'}
                    time={new Date().toISOString()}
                    from={'AC95124da74c130920980834'}
                    amount={'123.45678'}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex justify-end mt-[20px]">
            <ButtonLink>see all</ButtonLink>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Index;
