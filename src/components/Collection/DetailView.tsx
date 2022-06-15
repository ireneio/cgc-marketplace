import { useMemo } from 'react';
import Divider from '../Shared/Divider';
import Tag from '../Shared/Tag';
import DetailViewLoading from './DetailViewLoading';
import CollectionCarousel from './CollectionCarousel';
import ItemCountPanel from './ItemCountPanel';
import NftPricePanel from './NftPricePanel';
import TokenPricePanel from './TokenPricePanel';
import { getNumberWithCommas } from '@/utils/formatHelper';
import { useGetCollectionsBySlugV2 } from '@/hooks/services_collections';

type SocialTypes = 'discord' | 'twitter' | 'link';

const socials: Record<string, string | SocialTypes>[] = [
  { name: 'twitter', icon: '/img/icon_twitter.svg' },
  { name: 'discord', icon: '/img/icon_discord.svg' },
  { name: 'link', icon: '/img/icon_link.svg' },
];

const DetailView = () => {
  const { loading, data: currentCollection } = useGetCollectionsBySlugV2();

  const info = useMemo(() => {
    return {
      title: currentCollection?.metadata?.name,
      name: currentCollection?.metadata?.name,
      id: currentCollection?.metadata?.id,
      slug: currentCollection?.metadata?.slug,
      description: currentCollection?.metadata?.description,
      socialMedia: {
        discord: currentCollection?.metadata.discordUrl,
        twitter: currentCollection?.metadata.twitterUrl,
        link: currentCollection?.metadata.websiteUrl,
      },
      services: currentCollection?.services?.map((item: any) => item.name),
      tags: currentCollection?.tags?.map((item: any) =>
        String(item).toLowerCase(),
      ),
    };
  }, [currentCollection]);

  const carouselItems = useMemo(() => {
    return [
      {
        imageUrl: currentCollection?.metadata.videoSrcUrl as string,
        title: currentCollection?.metadata.name as string,
        description: currentCollection?.metadata.description as string,
        id: currentCollection?.metadata.id as string,
        href: '',
        logo: currentCollection?.metadata.logoSrcUrl as string,
        name: currentCollection?.metadata.name as string,
      },
    ];
  }, [currentCollection]);

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
          {info.tags.length > 0 && (
            <div className="flex flex-wrap mb-[32px]">
              {info.tags.map((tag: string, index: number) => {
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
          {(currentCollection?.nftCollectionStats?.totalSupply ||
            currentCollection?.nftCollectionStats?.meListingCount ||
            currentCollection?.nftCollectionStats?.numOwners ||
            currentCollection?.nftCollectionStats?.usdTotalVolume) && (
            <div>
              <div className="mb-[32px]">
                <div className="text-[#FFFFFF] font-bold text-[20px]">
                  Detail
                </div>
              </div>
              <div className="mb-[32px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[24px]">
                {currentCollection?.nftCollectionStats?.totalSupply && (
                  <ItemCountPanel
                    text="Items available"
                    count={
                      currentCollection?.nftCollectionStats?.totalSupply || '-'
                    }
                  />
                )}
                {currentCollection?.nftCollectionStats?.meListingCount && (
                  <ItemCountPanel
                    text="Items Listed"
                    count={
                      currentCollection?.nftCollectionStats?.meListingCount ||
                      '-'
                    }
                  />
                )}
                {currentCollection?.nftCollectionStats?.numOwners && (
                  <ItemCountPanel
                    text="Number of Owners"
                    count={
                      currentCollection?.nftCollectionStats?.numOwners || '-'
                    }
                  />
                )}
                {currentCollection?.nftCollectionStats?.usdTotalVolume && (
                  <ItemCountPanel
                    text="Total Volume"
                    count={
                      currentCollection?.nftCollectionStats?.usdTotalVolume
                        ? '$' +
                          getNumberWithCommas(
                            currentCollection?.nftCollectionStats
                              ?.usdTotalVolume,
                            2,
                          )
                        : '-'
                    }
                  />
                )}
              </div>
            </div>
          )}
          {currentCollection?.tokens && currentCollection?.tokens.length
            ? currentCollection?.tokens.map((token: any, idx: number) => {
                return (
                  <div className="mb-[32px]" key={idx}>
                    <TokenPricePanel
                      brandImg={token?.iconSrcUrl}
                      brandName={currentCollection?.metadata.name}
                      symbol={token?.symbol?.toUpperCase()}
                      price={token?.tokenActivePrice?.usdPrice}
                      priceToBTC={token?.tokenActivePrice?.btcPrice}
                      priceToETH={token?.tokenActivePrice?.ethPrice}
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
                      circulatingSupply={
                        token?.tokenStats[0]?.circulatingSupply
                      }
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
              })
            : []}
          <div className="mb-[32px] w-full lg:w-[70%] 2xl:w-[65%]">
            {currentCollection?.nftCollectionStats ? (
              <NftPricePanel
                name={currentCollection?.metadata.name}
                volume={currentCollection?.nftCollectionStats?.usdMeTotalVolume}
                volume7Days={
                  currentCollection?.nftCollectionStats?.usdSevenDayVolume
                }
                volume30Days={
                  currentCollection?.nftCollectionStats?.usdThirtyDayVolume
                }
                change={currentCollection?.nftCollectionStats?.usdOneDayChange}
                change7Days={
                  currentCollection?.nftCollectionStats?.usdSevenDayChange
                }
                change30Days={
                  currentCollection?.nftCollectionStats?.usdThirtyDayChange
                }
                sales={currentCollection?.nftCollectionStats?.usdOneDaySales}
                sales7Days={
                  currentCollection?.nftCollectionStats?.usdSevenDaySales
                }
                sales30Days={
                  currentCollection?.nftCollectionStats?.usdThirtyDaySales
                }
                averagePrice={
                  currentCollection?.nftCollectionStats?.usdAveragePrice
                }
                averagePrice7Days={
                  currentCollection?.nftCollectionStats?.usdSevenDayAveragePrice
                }
                averagePrice30Days={
                  currentCollection?.nftCollectionStats
                    ?.usdThirtyDayAveragePrice
                }
                totalVolume={
                  currentCollection?.nftCollectionStats?.usdTotalVolume
                }
                totalSupply={currentCollection?.nftCollectionStats?.totalSupply}
                owners={currentCollection?.nftCollectionStats?.numOwners}
                count={currentCollection?.nftCollectionStats?.count}
              />
            ) : (
              <div>
                <Tag className="relative px-[18px] py-[24px]">
                  <div className="mb-[8px] text-[#FFFFFF] font-bold text-[14px]">
                    {currentCollection?.metadata?.name} NFT
                  </div>
                  Sorry, we could not retrieve any data at this moment in time.
                  Please try again later.{' '}
                </Tag>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailView;
