import AllGames from '@/components/Home/AllGames';
import LandingCarousel from '@/components/Home/LandingCarousel';
import LatestGames from '@/components/Home/LatestGames';
import LatestSales from '@/components/Home/LatestSales';
import LatestTransactions from '@/components/Home/LatestTransactions';
import PopularGames from '@/components/Home/PopularGames';
import DefaultLayout from '@/components/Layout/DefaultLayout';
import BreadCrumb from '@/components/Shared/Breadcrumb';

const Index = () => {
  return (
    <DefaultLayout>
      <div className="mb-[12px]">
        <BreadCrumb
          items={[{ text: 'Home', value: 'home' }]}
          currentValue="home"
        />
      </div>
      <LandingCarousel />
      <LatestGames />
      <PopularGames />
      <AllGames />
      <LatestTransactions />
      <LatestSales />
    </DefaultLayout>
  );
};

export default Index;
