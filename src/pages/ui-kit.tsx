import Button from '@/components/Shared/Button';
import ButtonLink from '@/components/Shared/ButtonLink';
import NetflixCard from '@/components/Shared/NetflixCard';
import SalesCard from '@/components/Shared/SalesCard';
import SelectGroup from '@/components/Shared/SelectGroup';
import { useState } from 'react';

const UiKit = () => {
  const [currentItemSelectGroup, setCurrentItemSelectGroup] = useState('m');

  return (
    <div className="bg-[#13002B] text-[#ffffff] min-h-[100vh] px-[16px] mx-auto max-w-[1080px] pb-[120px]">
      <h1>Ui Kit</h1>
      <section className="mt-4">
        <h2>Netflix Card</h2>
        <div className="mt-2 mx-auto w-[600px]">
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
            img={'/img/nft1.png'}
            title={'Wendingo #13 - The Alchemist'}
            brand={'Kreechers'}
            signature={'AC95124da74c130920980834'}
            time={new Date().toISOString()}
            from={'AC95124da74c130920980834'}
            amount={'123.45678'}
          />
        </div>
      </section>
    </div>
  );
};

export default UiKit;
