import { useAppDispatch } from '@/store';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Divider from '../Shared/Divider';
import Tag from '../Shared/Tag';
import DetailViewLoading from './DetailViewLoading';
import GameCarousel from './GameCarousel';
import ItemCountPanel from './ItemCountPanel';
import NftPricePanel from './NftPricePanel';
import TokenPricePanel from './TokenPricePanel';

const DetailView = () => {
  const router = useRouter();
  // const dispatch = useAppDispatch();
  const [info, setInfo] = useState({
    name: 'SolChicks',
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const tid = setTimeout(() => {
      setLoading(false);
      clearTimeout(tid);
    }, 1200);
  }, []);

  const handleLinkOpen = (type: 'discord' | 'twitter' | 'link') => {
    window.open(info.socialMedia[type], '_blank');
  };

  useEffect(() => {
    if (router.query.id) {
      setInfo((prev) => {
        return {
          ...prev,
          id: String(router.query.id),
        };
      });
    } else {
      // dispatch({ type: 'SET_NAVIGATION_PATH', payload: 'Home' });
      // router.replace('/');
    }
  }, [router.query]);

  return (
    <div>
      {loading && <DetailViewLoading />}
      {!loading && (
        <div>
          <div className="mb-[48px]">
            <GameCarousel />
          </div>
          <div className="mb-[32px]">
            <div className="text-[#FFFFFF] font-bold text-[20px]">
              {info.title}
            </div>
          </div>
          <div className="flex justify-between mb-[32px] flex-wrap">
            <div
              className="text-[14px] text-[#FFFFFF]"
              style={{ flexBasis: '100%' }}
            >
              {info.description}
            </div>
          </div>
          <div className="flex items-center mb-[32px]">
            <div
              className="cursor-pointer hover:opacity-[0.65]"
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
              className="ml-[16px] cursor-pointer hover:opacity-[0.65]"
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
              className="ml-[16px] cursor-pointer hover:opacity-[0.65]"
              onClick={() => handleLinkOpen('link')}
            >
              <img src="/img/icon_link.png" width={24} height={24} alt="link" />
            </div>
          </div>
          <div className="flex flex-wrap mb-[32px]">
            {info.tags.map((tag, index) => {
              return (
                <Tag key={index} className="mr-[12px] mb-[12px]">
                  {tag}
                </Tag>
              );
            })}
          </div>
          <div className="mb-[32px]">
            <Divider />
          </div>
          <div className="mb-[32px]">
            <div className="text-[#FFFFFF] font-bold text-[20px]">Detail</div>
          </div>
          <div className="mb-[32px] flex justify-between">
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
          <div className="mb-[32px]">
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
          <div className="mb-[32px]">
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
          <div className="mb-[32px]">
            <NftPricePanel
              name={'SolChicks'}
              volume={1234567.89}
              volumePercentage={12}
              change={124567}
              changePercentage={4.5}
              sales={6789123}
              salesPercentage={6.1}
              averagePrice={1233314}
              averagePricePercentage={1.45}
              totalVolume={124554.4}
              totalSales={1243324345}
              totalSupply={123456789}
              owners={12345}
              count={123456789}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailView;
