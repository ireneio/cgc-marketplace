import Breadcrumb from '@/components/Shared/Breadcrumb';
import Button from '@/components/Shared/Button';
import ButtonLink from '@/components/Shared/ButtonLink';
import LandingCarousel from '@/components/Home/LandingCarousel';
import LoadingNetflixCard from '@/components/Shared/LoadingNetflixCard';
import Pagination from '@/components/Shared/Pagination';
import SalesCard from '@/components/Shared/SalesCard';
import SelectGroup from '@/components/Shared/SelectGroup';
import Skeleton from '@/components/Shared/Skeleton';
import DefaultTable from '@/components/Shared/DefaultTable';
import { useState } from 'react';
import TransactionTable from '@/components/Home/TransactionTable';
// import FloatingCard from '@/components/Shared/FloatingCard';

const UiKit = () => {
  const [currentItemSelectGroup, setCurrentItemSelectGroup] = useState('m');
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <div className="bg-[#13002B] text-[#ffffff] min-h-[100vh] px-[16px] mx-auto max-w-[1920px] pb-[120px]">
      <h1>Ui Kit</h1>
      <section className="mt-4">
        <h2>Floating Card</h2>
        <div className="mt-2 mx-auto w-[600px] floating-card-wrapper">
          {/* <FloatingCard
            bg={'/img/seoulstars-main.jpeg'}
            title={'Sing-to-earn rhythm action and karaoke game!'}
            categories={['virtual idol', 'metaverse', 'nft']}
            network={'SOL'}
            marketCap={'10000'}
            coinSupply={'100000000000'}
            onPlay={() => console.log('onPlay')}
            onFirstItemMouseOver={() => console.log()}
          /> */}
        </div>
      </section>
      <section className="mt-4">
        <h2>Loading Netflix Card</h2>
        <div className="mt-2">
          <LoadingNetflixCard />
        </div>
      </section>
      <section className="mt-4">
        <h2>Button</h2>
        <div className="mt-2">
          <Button>button</Button>
          <Button disabled className="ml-2">
            disabled
          </Button>
        </div>
      </section>
      <section className="mt-4">
        <h2>Button Link</h2>
        <div className="mt-2">
          <ButtonLink>see all</ButtonLink>
          <ButtonLink disabled className="ml-2">
            disabled
          </ButtonLink>
        </div>
      </section>
      <section className="mt-4">
        <h2>Breadcrumb</h2>
        <div className="mt-2">
          <Breadcrumb
            items={[
              { text: 'Home', value: 'd' },
              { text: 'Explore', value: 'm', disabled: true },
              { text: 'All', value: 'h' },
            ]}
            currentValue={currentItemSelectGroup}
            onItemClick={(value) => setCurrentItemSelectGroup(value)}
          />
        </div>
      </section>
      <section className="mt-4">
        <h2>Select Group</h2>
        <div className="mt-2">
          <SelectGroup
            items={[
              { text: '1d', value: 'd' },
              { text: '1m', value: 'm' },
              { text: '1h', value: 'h', disabled: true },
              { text: '1y', value: 'y' },
            ]}
            currentValue={currentItemSelectGroup}
            onItemClick={(value) => setCurrentItemSelectGroup(value)}
          />
        </div>
      </section>
      <section className="mt-4">
        <h2>Sales Card</h2>
        <div className="mt-2">
          <SalesCard
            img={'/img/sales_sample_nft.png'}
            title={'Wendingo #13 - The Alchemist'}
            brand={'Kreechers'}
            signature={'AC95124da74c130920980834'}
            time={new Date().toISOString()}
            from={'AC95124da74c130920980834'}
            amount={'123.45678'}
          />
        </div>
      </section>
      <section className="mt-4">
        <h2>Skeleton</h2>
        <div className="mt-2">
          <Skeleton />
        </div>
      </section>
      <section className="mt-4">
        <h2>Landing Carousel</h2>
        <div className="mt-2">
          <LandingCarousel />
        </div>
      </section>
      <section className="mt-4">
        <h2>Table</h2>
        <div className="mt-2">
          <DefaultTable
            rows={[
              [
                'shards',
                'AC95124da74ca921wdpk1134',
                new Date().toISOString(),
                'AC95124da74ca921wdpk1134',
                'AC95124da74ca921wdpk1134',
                '123.45678',
              ],
              [
                'shards',
                'AC95124da74ca921wdpk1134',
                new Date().toISOString(),
                'AC95124da74ca921wdpk1134',
                'AC95124da74ca921wdpk1134',
                '12345678.45678',
              ],
              [
                'shards',
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
      </section>
      <section className="mt-4">
        <h2>Transaction Table</h2>
        <div className="mt-2">
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
      </section>
      <section className="mt-4">
        <h2>Pagination</h2>
        <div className="mt-2">
          <Pagination
            totalPages={15}
            currentPage={currentPage}
            onPageChange={(val) => setCurrentPage(val)}
            onPreviousPage={() => setCurrentPage((prev) => prev - 1)}
            onNextPage={() => setCurrentPage((prev) => prev + 1)}
          />
        </div>
      </section>
    </div>
  );
};

export default UiKit;
