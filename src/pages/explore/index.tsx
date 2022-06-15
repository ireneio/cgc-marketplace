import FloatingCard from '@/components/Home/FloatingCard';
import FloatingCardLoading from '@/components/Home/FloatingCardLoading';
import DefaultLayout from '@/components/Layout/DefaultLayout';
import Breadcrumb from '@/components/Shared/Breadcrumb';
import Divider from '@/components/Shared/Divider';
import SectionTitle from '@/components/Shared/SectionTitle';
import { useGetCollectionsV2 } from '@/hooks/services_collections';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

const Explore = () => {
  const router = useRouter();
  const { data, loading } = useGetCollectionsV2();

  const handleGoDetail = (slug: string) => {
    router.push(`/collection/${slug}`);
  };

  const [currentHoverId, setCurrentHoverId] = useState('-1');

  useEffect(() => {
    setCurrentHoverId('-1');
  }, [router.pathname]);

  const breadcrumbItems = useMemo(() => {
    return [
      { text: 'Home', value: '/' },
      { text: 'Explore', value: '/explore' },
      { text: 'All', value: '/explore' },
    ];
  }, []);

  return (
    <DefaultLayout>
      <div className="mb-[24px]">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <div className="relative">
        <div className="flex justify-between items-center">
          <SectionTitle>all collections</SectionTitle>
        </div>
        <div className="mt-[24px] mb-[24px]">
          <Divider />
        </div>
        <div className="hide-scrollbar">
          {!loading && (
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
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Explore;
