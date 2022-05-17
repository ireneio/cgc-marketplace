import { useState } from 'react';
import ButtonLink from '../Shared/ButtonLink';
import SalesCard from '../Shared/SalesCard';
import SectionTitle from '../Shared/SectionTitle';

const LatestSales = () => {
  const [items, setitems] = useState([1, 2, 3, 4, 5]);

  return (
    <div className="mt-[50px]">
      <div className="flex justify-between items-center">
        <SectionTitle>latest sales</SectionTitle>
      </div>
      <div className="mt-[24px] flex overflow-auto hide-scrollbar">
        {items.map((game, index) => {
          return (
            <div key={index} className="mr-[28px]">
              <SalesCard
                img={'/img/nft1.png'}
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
      <div className="flex justify-end mt-[20px]">
        <ButtonLink>see all</ButtonLink>
      </div>
    </div>
  );
};

export default LatestSales;
