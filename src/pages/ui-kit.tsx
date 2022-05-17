import Button from '@/components/Shared/Button';
import NetflixCard from '@/components/Shared/NetflixCard';
import SelectGroup from '@/components/Shared/SelectGroup';
import { useState } from 'react';

const UiKit = () => {
  const [currentItemSelectGroup, setCurrentItemSelectGroup] = useState('m');

  return (
    <div className="bg-[#13002B] text-[#ffffff] min-h-[100vh] px-[16px] mx-auto max-w-[1080px]">
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
    </div>
  );
};

export default UiKit;
