import AllGames from '@/components/Home/AllGames';
import LandingCarousel from '@/components/Home/LandingCarousel';
import LatestSales from '@/components/Home/LatestSales';
import LatestTransactions from '@/components/Home/LatestTransactions';
import DefaultLayout from '@/components/Layout/DefaultLayout';
import BreadCrumb from '@/components/Shared/Breadcrumb';
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
      <div className="mb-[12px]">
        <BreadCrumb items={breadcrumbItems} currentValue={sideBarPath} />
      </div>
      {sideBarPath === 'Home' && <LandingCarousel />}
      {(sideBarPath === 'Home' || sideBarPath === 'Explore/All') && (
        <div className="mt-[32px]">
          <AllGames />
        </div>
      )}
      {sideBarPath === 'Home' && (
        <div className="mt-[32px]">
          <LatestSales />
        </div>
      )}
      {sideBarPath === 'Home' && (
        <div className="mt-[32px] mb-[32px]">
          <LatestTransactions />
        </div>
      )}
    </DefaultLayout>
  );
};

export default Index;
