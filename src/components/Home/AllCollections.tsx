import { useEffect, useState } from 'react';
import ButtonLink from '../Shared/ButtonLink';
import FloatingCardLoading from './FloatingCardLoading';
import SectionTitle from '../Shared/SectionTitle';
import Divider from '@/components/Shared/Divider';
import FloatingCard from './FloatingCard';
import { useRouter } from 'next/router';
import { useGetCollectionsV2 } from '@/hooks/services_collections';
import EmptyListTextDisplay from '../Shared/EmptyListTextDisplay';
import { useWindowWidth } from '@/hooks/window';

const AllCollections = () => {
  const router = useRouter();
  const windowWidth = useWindowWidth();
  const { data, loading } = useGetCollectionsV2();

  const handleGoDetail = (slug: string) => {
    router.push(`/collection/${slug}`).then();
  };

  const [currentHoverId, setCurrentHoverId] = useState('-1');

  useEffect(() => {
    setCurrentHoverId('-1');
  }, [router.pathname]);

  return (
    <div className="relative">
      <div className="flex justify-between items-center">
        <SectionTitle>all collections</SectionTitle>
      </div>
      {router.pathname != '/' && (
        <div className="mt-[24px] mb-[24px]">
          <Divider />
        </div>
      )}
      {windowWidth < 500 ? (
        <div className="mt-[24px] flex overflow-auto pb-[24px] scrollbar_thin">
          {loading ? (
            <div className="w-[80vw] ml-[14px]">
              <FloatingCardLoading />
            </div>
          ) : (
            <></>
          )}
          {!loading && !data.length && (
            <EmptyListTextDisplay>
              No collections available.
            </EmptyListTextDisplay>
          )}
          {data.map((collection: any, index) => {
            return (
              <div
                key={index}
                onClick={() => handleGoDetail(collection.slug)}
                className="mr-[14px] ml-[14px]"
              >
                <div className="w-[80vw]">
                  <FloatingCard
                    isDefaultFloating={false}
                    isFloatRight={false}
                    logo={collection.logoSrc}
                    currentHoverId={currentHoverId}
                    id={String(index)}
                    bg={collection.splashSrc}
                    bgOnHover={collection.videoSrc}
                    title={collection.description}
                    categories={collection.genre}
                    network={collection.network}
                    marketCap={collection.marketCap}
                    coinSupply={collection.totalSupply}
                    onPlay={() => handleGoDetail(collection.slug)}
                    onCardClick={() => handleGoDetail(collection.slug)}
                    onMouseOver={() => setCurrentHoverId(String(index))}
                    onMouseLeave={() => setCurrentHoverId('-1')}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="hide-scrollbar">
          {!loading && !data.length && (
            <EmptyListTextDisplay>
              No collections available.
            </EmptyListTextDisplay>
          )}
          {!loading && data.length && (
            <div className="mt-[24px]">
              <div className="grid gap-[12px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cold-6">
                {data.map((collection: any, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => handleGoDetail(collection.slug)}
                    >
                      <FloatingCard
                        // isDefaultFloating={windowWidth < 768}
                        isDefaultFloating={false}
                        isFloatRight={false}
                        logo={collection.logoSrc}
                        currentHoverId={currentHoverId}
                        id={String(index)}
                        bg={collection.splashSrc}
                        bgOnHover={collection.videoSrc}
                        title={collection.description}
                        categories={collection.genre}
                        network={collection.network}
                        marketCap={collection.marketCap}
                        coinSupply={collection.totalSupply}
                        onPlay={() => handleGoDetail(collection.slug)}
                        onCardClick={() => handleGoDetail(collection.slug)}
                        onMouseOver={() => setCurrentHoverId(String(index))}
                        onMouseLeave={() => setCurrentHoverId('-1')}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {loading && (
            <div className="mt-[24px] grid gap-[12px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cold-6 auto-rows-auto">
              {[0, 1, 2].map((game, index) => {
                return (
                  <div key={index}>
                    <FloatingCardLoading />
                  </div>
                );
              })}
            </div>
          )}
          <div className="mt-[12px] flex justify-end">
            {router.pathname === '/' && (
              <ButtonLink
                onClick={() => {
                  router.push('/explore');
                }}
              >
                see all
              </ButtonLink>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllCollections;
