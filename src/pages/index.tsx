import AllCollections from '@/components/Home/AllCollections';
import LandingCarousel from '@/components/Home/LandingCarousel';
import LatestSales from '@/components/Home/LatestSales';
import LatestTransactions from '@/components/Home/LatestTransactions';
import DefaultLayout from '@/components/Layout/DefaultLayout';
import Breadcrumb from '@/components/Shared/Breadcrumb';
import { useAppSelector } from '@/store';
import { useMemo } from 'react';

const Index = () => {
  const sideBarPath = useAppSelector((state) => state.layout.navigation.path);

  const breadcrumbItems = useMemo(() => {
    switch (sideBarPath) {
      case 'Explore/All':
        return [
          { text: 'Home', value: 'Home' },
          { text: 'Explore', value: 'Explore/All' },
          { text: 'All', value: 'Explore/All' },
        ];
      case 'Explore/Latest':
        return [
          { text: 'Home', value: 'Home' },
          { text: 'Explore', value: 'Explore/Latest' },
          { text: 'Latest', value: 'Explore/Latest' },
        ];
      case 'Explore/Popular':
        return [
          { text: 'Home', value: 'Home' },
          { text: 'Explore', value: 'Explore/Popular' },
          { text: 'Popular', value: 'Explore/Popular' },
        ];
      case 'Home':
      default:
        return [{ text: 'Home', value: 'Home' }];
    }
  }, [sideBarPath]);

  return (
    <DefaultLayout>
      {sideBarPath != 'Home' && (
        <div className="mb-[0]">
          <Breadcrumb items={breadcrumbItems} currentValue={sideBarPath} />
        </div>
      )}
      {sideBarPath === 'Home' && (
        <div className="mt-[21px]">
          <LandingCarousel />
        </div>
      )}
      {sideBarPath === 'Home' && (
        <div className="mt-[32px]">
          <AllCollections />
        </div>
      )}
      {sideBarPath === 'Explore/All' && (
        <div className="mt-[16px]">
          <AllCollections />
        </div>
      )}
      {sideBarPath === 'Home' && (
        <div className="mt-[32px]">
          <LatestSales />
        </div>
      )}
      {sideBarPath === 'Home' && (
        <div className="mt-[48px] mb-[48px]">
          <LatestTransactions />
        </div>
      )}
    </DefaultLayout>
  );
};

export default Index;
