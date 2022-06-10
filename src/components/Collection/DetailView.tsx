import { useEffect, useMemo, useState } from 'react';
import Divider from '../Shared/Divider';
import Tag from '../Shared/Tag';
import DetailViewLoading from './DetailViewLoading';
import CollectionCarousel from './CollectionCarousel';
import ItemCountPanel from './ItemCountPanel';
import NftPricePanel from './NftPricePanel';
import TokenPricePanel from './TokenPricePanel';
import { useAppSelector } from '@/store';

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
                src={'/img/icon_twitter.svg'}
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
                src="/img/icon_discord.svg"
                width={24}
                height={24}
                alt="discord"
              />
            </div>
            <div
              className="ml-[16px] cursor-pointer hover:opacity-[0.65]"
              onClick={() => handleLinkOpen('link')}
            >
              <img src="/img/icon_link.svg" width={24} height={24} alt="link" />
            </div>
          </div>
          <div className="flex flex-wrap mb-[32px]">
            {info.services.map((tag: string, index: number) => {
              return (
                <Tag key={index} className="mr-[12px]">
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
          <div className="mb-[32px] flex space-x-4">
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
              volumePercentage={0}
              volume7Days={nftCollectionStats?.usdSevenDayVolumn}
              volume7DaysPercentage={0}
              volume30Days={nftCollectionStats?.usdThirtyDayVolumn}
              volume30DaysPercentage={0}
              change={nftCollectionStats?.usdOneDayChange}
              changePercentage={0}
              change7Days={nftCollectionStats?.usdSevenDayChange}
              change7DaysPercentage={0}
              change30Days={nftCollectionStats?.usdThirtyDayChange}
              change30DaysPercentage={0}
              sales={nftCollectionStats?.usdOneDaySales}
              salesPercentage={0}
              sales7Days={nftCollectionStats?.usdSevenDaySales}
              sales7DaysPercentage={0}
              sales30Days={nftCollectionStats?.usdThirtyDaySales}
              sales30DaysPercentage={0}
              averagePrice={nftCollectionStats?.usdAveragePrice}
              averagePricePercentage={0}
              averagePrice7Days={nftCollectionStats?.usdSevenDayAveragePrice}
              averagePrice7DaysPercentage={0}
              averagePrice30Days={nftCollectionStats?.usdThirtyDayAveragePrice}
              averagePrice30DaysPercentage={0}
              totalVolume={nftCollectionStats?.usdTotalVolume}
              // totalSales={nftCollectionStats?.totalSales}
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
