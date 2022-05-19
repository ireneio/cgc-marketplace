import ItemCountPanel from '@/components/Game/ItemCountPanel';
import TokenPricePanel from '@/components/Game/TokenPricePanel';
import DefaultLayout from '@/components/Layout/DefaultLayout';
import BreadCrumb from '@/components/Shared/Breadcrumb';
import Divider from '@/components/Shared/Divider';
import ProgressBar from '@/components/Shared/ProgressBar';
import SelectGroup from '@/components/Shared/SelectGroup';
import Tag from '@/components/Shared/Tag';
import { useAppDispatch } from '@/store';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Game = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [info, setInfo] = useState({
    name: 'Solchicks',
    id: '',
    header: 'Welcome to the SolChicks Metaverse Crypto NFT Game',
    title: 'The leading fantasy NFT PvP and P2E crypto game',
    description:
      'SolChicks is One of The Best Play To Earn Crypto Games with exceptional PvP gaming. Our mission is simple: to be the leading fantasy NFT PvP and P2E crypto gaming ecosystem on the Solana blockchain. Buy & sell SolChicks with the community. Create collections & earn rewards. Breed adorable SolChicks to unlock rare traits. Play games in the SolChicks universe',
    tags: [
      'Collectibles & NFTs',
      'Gaming',
      'Solana Ecosystem',
      'Trustswap Launchpad',
    ],
    socialMedia: {
      discord: '',
      twitter: '',
      link: '',
    },
  });
  const [currentSelection, setCurrentSelection] = useState('ABOUT');

  const handleLinkOpen = (type: 'discord' | 'twitter' | 'link') => {
    window.open(info.socialMedia[type], '_blank');
  };

  return (
    <DefaultLayout>
      <div className="mb-[12px]">
        <BreadCrumb
          items={[
            { text: 'Home', value: 'Home' },
            { text: info.name, value: 'Game' },
          ]}
          currentValue={'Game'}
          onItemClick={(val) => {
            if (val === 'Home') {
              dispatch({ type: 'SET_NAVIGATION_PATH', payload: 'Home' });
              router.push('/');
            }
          }}
        />
      </div>
      <div className="flex justify-between items-center mb-[28px]">
        <div className="text-[#FFFFFF] font-bold text-[20px]">
          {info.header}
        </div>
        <div>
          <SelectGroup
            items={[
              { text: 'ABOUT', value: 'ABOUT' },
              { text: 'All Items', value: 'All Items' },
              { text: 'Your Items', value: 'Your Items' },
              { text: 'Activity', value: 'Activity' },
              { text: 'Staking', value: 'Staking' },
            ]}
            currentValue={currentSelection}
            onItemClick={(value) => setCurrentSelection(value)}
          />
        </div>
      </div>
      <div className="mb-[28px]">
        <Divider />
      </div>
      <div className="mb-[30px]">
        <div className="text-[#FFFFFF] font-bold text-[20px]">{info.title}</div>
      </div>
      <div className="flex justify-between mb-[24px]">
        <div
          className="text-[14px] text-[#FFFFFF]"
          style={{ flexBasis: '50%' }}
        >
          {info.description}
        </div>
        <div style={{ flexBasis: '50%' }} className="pl-[24px]">
          <div className="text-[#FFFFFF] italic text-[14px]">Tags</div>
          <div className="mt-[14px] flex flex-wrap">
            {info.tags.map((tag, index) => {
              return (
                <Tag key={index} className="mr-[12px] mb-[12px]">
                  {tag}
                </Tag>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex items-center mb-[48px]">
        <div
          className="cursor-pointer"
          onClick={() => handleLinkOpen('twitter')}
        >
          <img
            src="/img/icon_twitter.png"
            width={24}
            height={24}
            alt="twitter"
          />
        </div>
        <div
          className="ml-[16px] cursor-pointer"
          onClick={() => handleLinkOpen('discord')}
        >
          <img
            src="/img/icon_discord.png"
            width={24}
            height={24}
            alt="discord"
          />
        </div>
        <div
          className="ml-[16px] cursor-pointer"
          onClick={() => handleLinkOpen('link')}
        >
          <img src="/img/icon_link.png" width={24} height={24} alt="link" />
        </div>
      </div>
      <div className="mb-[24px]">
        <Divider />
      </div>
      <div className="mb-[28px]">
        <div className="text-[#FFFFFF] font-bold text-[20px]">Detail</div>
      </div>
      <div className="mb-[28px] flex justify-between">
        <ItemCountPanel text="items available" count={5400} />
        <ItemCountPanel text="items available" count={5400} />
        <ItemCountPanel
          text="items available"
          count={5400}
          countUnit={'/img/icon_unit_sol.png'}
        />
        <ItemCountPanel
          text="items available"
          count={5400}
          countUnit={'/img/icon_unit_sol.png'}
        />
      </div>
      <div className="mb-[28px]">
        <TokenPricePanel
          brandImg="/img/brand_chicks.png"
          brandName="SolChicks"
          symbol="CHICKS"
          price={0.000012345}
          priceToBTC={0.000012345}
          priceToETH={0.0000012345}
          priceFluctuation={2.45}
          priceToBTCFluctuation={2.45}
          priceToETHFluctuation={2.45}
          lowDay={0.001}
          lowWeek={0.005213123}
          lowMonth={0.1234567}
          highDay={1.23456}
          highWeek={123.456677}
          highMonth={123.666666}
          marketCap={1999992345}
          fullyDilutedMarketCap={123456789}
          volume={123456789}
          circulatingSupply={1234455}
          circulatingSupplyPercentage={5.2}
          totalSupply={12345567899}
          contractAddress={'cxxShYRVcepDudXhe7U62QHvw8uBJoKFifmzggGKVC2'}
          scanAddress={'solscan.io/token/cxx'}
        />
      </div>
      <div className="mb-[28px]">
        <TokenPricePanel
          brandImg="/img/brand_shards.png"
          brandName="SolChicks"
          symbol="SHARDS"
          price={0.000012345}
          priceToBTC={0.000012345}
          priceToETH={0.0000012345}
          priceFluctuation={2.45}
          priceToBTCFluctuation={2.45}
          priceToETHFluctuation={2.45}
          lowDay={0.001}
          lowWeek={0.005213123}
          lowMonth={0.1234567}
          highDay={1.23456}
          highWeek={123.456677}
          highMonth={123.666666}
          marketCap={1999992345}
          fullyDilutedMarketCap={123456789}
          volume={123456789}
          circulatingSupply={1234455}
          circulatingSupplyPercentage={5.2}
          totalSupply={12345567899}
          contractAddress={'cxxShYRVcepDudXhe7U62QHvw8uBJoKFifmzggGKVC2'}
          scanAddress={'solscan.io/token/cxx'}
        />
      </div>
      <div>
        <Tag>
          <div className="relative px-[24px] py-[24px]"></div>
        </Tag>
      </div>
    </DefaultLayout>
  );
};

export default Game;
