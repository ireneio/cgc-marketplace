import { useState } from 'react';
import SalesCard from './SalesCard';
import SectionTitle from '../Shared/SectionTitle';

const LatestSales = () => {
  const [items] = useState([1, 2, 3, 4, 5]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <SectionTitle> latest sales</SectionTitle>
      </div>
      <div className="mt-[24px] flex overflow-auto pb-[24px] scollbar_thin">
        {items.map((game, index) => {
          return (
            <div key={index} className="mr-[28px]">
              <SalesCard
                img={'/img/sales_sample_nft.png'}
                title={'Wendingo #13 - The Alchemist'}
                brand={'Kreechers'}
                signature={'AC95124da74c130920980834'}
                time={new Date().toISOString()}
                from={'AC95124da74c130920980834'}
                amount={'123.45678'}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LatestSales;
