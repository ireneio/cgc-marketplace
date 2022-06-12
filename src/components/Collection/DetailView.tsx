import { useEffect, useMemo, useState } from 'react';
import Divider from '../Shared/Divider';
import Tag from '../Shared/Tag';
import DetailViewLoading from './DetailViewLoading';
import CollectionCarousel from './CollectionCarousel';
import ItemCountPanel from './ItemCountPanel';
import NftPricePanel from './NftPricePanel';
import TokenPricePanel from './TokenPricePanel';
import { useAppSelector } from '@/store';

type SocialTypes = 'discord' | 'twitter' | 'link';

const socials: Record<string, string | SocialTypes>[] = [
  { name: 'twitter', icon: '/img/icon_twitter.svg' },
  { name: 'discord', icon: '/img/icon_discord.svg' },
  { name: 'link', icon: '/img/icon_link.svg' },
];

const DetailView = () => {
  const [loading, setLoading] = useState(true);
  const metadata = useAppSelector(
    (state) => state.collection.currentCollection.metadata,
  );
  const services = useAppSelector(
    (state) => state.collection.currentCollection.services,
  );
  const tokens = useAppSelector(
    (state) => state.collection.currentCollection.tokens,
  );
  const nftCollectionStats = useAppSelector(
    (state) => state.collection.currentCollection.nftCollectionStats,
  );

  const info = useMemo(() => {
    return {
      title: metadata.name,
      name: metadata.name,
      id: metadata.id,
      slug: metadata.slug,
      description: metadata.description,
      socialMedia: {
        discord: metadata.discordUrl,
        twitter: metadata.twitterUrl,
        link: metadata.websiteUrl,
      },
      services: services.map((item: any) => item.name),
      tags: services.map((item: any) => item.tag),
    };
  }, [metadata, services]);

  const carouselItems = useMemo(() => {
    return [
      {
        imageUrl: metadata.videoSrcUrl as string,
        title: metadata.name as string,
        description: metadata.description as string,
        id: metadata.id as string,
        href: '',
        logo: metadata.logoSrcUrl as string,
        name: metadata.name as string,
      },
    ];
  }, [metadata]);

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

  return (
    <div>
      {loading && <DetailViewLoading />}
      {!loading && (
        <div>
          <div className="mb-[32px]">
            <CollectionCarousel carouselItems={carouselItems} />
          </div>
          <div className="mb-[32px]">
            <div className="text-[#FFFFFF] font-bold text-[20px]">Summary</div>
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
            {socials.map((social, idx) => {
              return (
                <div
                  key={idx}
                  className="cursor-pointer hover:opacity-[0.65] mr-[16px]"
                  onClick={() => handleLinkOpen(social.name as SocialTypes)}
                >
                  <img src={social.icon} width={24} height={24} alt="twitter" />
                </div>
              );
            })}
          </div>
          {info.services.length > 0 && (
            <div className="flex flex-wrap mb-[32px]">
              {info.services.map((tag: string, index: number) => {
                return (
                  <Tag key={index} className="mr-[12px]">
                    {tag}
                  </Tag>
                );
              })}
            </div>
          )}
          <div className="mb-[32px]">
            <Divider />
          </div>
          <div className="mb-[32px]">
            <div className="text-[#FFFFFF] font-bold text-[20px]">Detail</div>
          </div>
          <div className="mb-[32px] grid grid-cols-2 lg:grid-cols-4 gap-[24px]">
            <ItemCountPanel
              text="Items available"
              count={nftCollectionStats?.count}
            />
            <ItemCountPanel
              text="Items Listed"
              count={nftCollectionStats?.meListingCount}
            />
            <ItemCountPanel
              text="Number of Owners"
              count={nftCollectionStats?.numOwners}
            />
            <ItemCountPanel
              text="Total Supply"
              count={nftCollectionStats?.totalSupply}
            />
          </div>
          {tokens.map((token: any, idx: number) => {
            return (
              <div className="mb-[32px]" key={idx}>
                <TokenPricePanel
                  brandImg={token?.iconSrcUrl}
                  brandName={metadata.name}
                  symbol={token?.symbol?.toUpperCase()}
                  price={token?.tokenActivePrice?.usdPrice}
                  priceToBTC={0.000012345}
                  priceToETH={0.0000012345}
                  priceFluctuation={
                    token?.tokenStats[0]?.usdAthChangePercentage
                  }
                  priceChangePercentage7d={
                    token?.tokenStats[0]?.priceChangePercentage7d
                  }
                  priceChangePercentage30d={
                    token?.tokenStats[0]?.priceChangePercentage30d
                  }
                  priceToBTCFluctuation={2.45}
                  priceToETHFluctuation={2.45}
                  lowDay={token?.tokenStats[0]?.usdLow24h}
                  lowWeek={token?.tokenStats[0]?.usdLow24h}
                  lowMonth={token?.tokenStats[0]?.usdLow24h}
                  highDay={token?.tokenStats[0]?.usdHigh24h}
                  highWeek={token?.tokenStats[0]?.usdHigh24h}
                  highMonth={token?.tokenStats[0]?.usdHigh24h}
                  marketCap={token?.tokenStats[0]?.usdMarketCap}
                  fullyDilutedMarketCap={
                    token?.tokenStats[0]?.usdFullyDilutedValuation
                  }
                  volume={token?.tokenStats[0]?.usdTotalVolume}
                  circulatingSupply={token?.tokenStats[0]?.circulatingSupply}
                  circulatingSupplyPercentage={Number(
                    (
                      (token?.tokenStats[0]?.circulatingSupply /
                        token?.tokenStats[0]?.totalSupply) *
                      100
                    ).toFixed(2),
                  )}
                  totalSupply={token?.tokenStats[0]?.totalSupply}
                  contractAddress={token?.tokenAddress}
                />
              </div>
            );
          })}
          <div className="mb-[32px]">
            <NftPricePanel
              name={metadata.name}
              volume={nftCollectionStats?.usdMeTotalVolume}
              volume7Days={nftCollectionStats?.usdSevenDayVolume}
              volume30Days={nftCollectionStats?.usdThirtyDayVolume}
              change={nftCollectionStats?.usdOneDayChange}
              change7Days={nftCollectionStats?.usdSevenDayChange}
              change30Days={nftCollectionStats?.usdThirtyDayChange}
              sales={nftCollectionStats?.usdOneDaySales}
              sales7Days={nftCollectionStats?.usdSevenDaySales}
              sales30Days={nftCollectionStats?.usdThirtyDaySales}
              averagePrice={nftCollectionStats?.usdAveragePrice}
              averagePrice7Days={nftCollectionStats?.usdSevenDayAveragePrice}
              averagePrice30Days={nftCollectionStats?.usdThirtyDayAveragePrice}
              totalVolume={nftCollectionStats?.usdTotalVolume}
              totalSupply={nftCollectionStats?.totalSupply}
              owners={nftCollectionStats?.numOwners}
              count={nftCollectionStats?.count}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailView;
