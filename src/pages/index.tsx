import AllCollections from '@/components/Home/AllCollections';
import LandingCarousel from '@/components/Home/LandingCarousel';
import LandingCarouselMobile from '@/components/Home/LandingCarouselMobile';
import LatestSales from '@/components/Home/LatestSales';
import LatestTransactions from '@/components/Home/LatestTransactions';
import DefaultLayout from '@/components/Layout/DefaultLayout';
import { useGetCollectionsV2 } from '@/hooks/services_collections';
import { useGetNftTransactionsV2 } from '@/hooks/services_nft';
import { useWindowWidth } from '@/hooks/window';
import { useMemo } from 'react';

const Index = () => {
  const windowWidth = useWindowWidth();
  const { data } = useGetCollectionsV2();
  const { data: latestSales } = useGetNftTransactionsV2();

  const carouselItems = useMemo(() => {
    return data.slice(0, 5).map((collection: any) => {
      return {
        id: collection?.slug,
        title: collection?.name,
        name: collection?.slug,
        logo: collection?.logoSrc,
        imageUrl: collection?.splashSrc,
        description: collection?.description,
        href: 'https://solchicks-minigame-apr18.s3.us-west-2.amazonaws.com/index.html',
      };
    });
  }, [data]);

  return (
    <DefaultLayout>
      <div className="mt-[21px]">
        {windowWidth <= 500 ? (
          <LandingCarouselMobile carouselItems={carouselItems} />
        ) : (
          <LandingCarousel carouselItems={carouselItems} />
        )}
      </div>
      <div className="mt-[32px]">
        <AllCollections />
      </div>
      <div className="mt-[32px]">
        <LatestSales />
      </div>
      <div
        className="mt-[48px] mb-[48px]"
        style={{ marginTop: latestSales.length > 10 ? 56 : 32 }}
      >
        <LatestTransactions />
      </div>
    </DefaultLayout>
  );
};

export default Index;
