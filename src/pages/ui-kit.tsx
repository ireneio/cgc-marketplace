import Button from '@/components/Shared/Button';
import NetflixCard from '@/components/Shared/NetflixCard';

const UiKit = () => {
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
    </div>
  );
};

export default UiKit;
