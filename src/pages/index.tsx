import AllCollections from '@/components/Home/AllCollections';
import LandingCarousel from '@/components/Home/LandingCarousel';
import LatestSales from '@/components/Home/LatestSales';
import LatestTransactions from '@/components/Home/LatestTransactions';
import DefaultLayout from '@/components/Layout/DefaultLayout';
import { useGetCollections } from '@/hooks/services_collections';
import { useMemo } from 'react';

const Index = () => {
  const { data } = useGetCollections();

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
        <LandingCarousel carouselItems={carouselItems} />
      </div>
      <div className="mt-[32px]">
        <AllCollections />
      </div>
      <div className="mt-[32px]">
        <LatestSales />
      </div>
      <div className="mt-[32px] mb-[48px]">
        <LatestTransactions />
      </div>
    </DefaultLayout>
  );
};

export default Index;
