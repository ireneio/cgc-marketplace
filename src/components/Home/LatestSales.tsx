import { useState } from 'react';
import SalesCard from './SalesCard';
import SectionTitle from '../Shared/SectionTitle';

const LatestSales = () => {
  const [items] = useState([1, 2, 3, 4, 5]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <SectionTitle>latest sales</SectionTitle>
      </div>
      <div className="mt-[24px] flex overflow-auto pb-[24px] scrollbar_thin">
        {items.map((game, index) => {
          return (
            <div key={index} className="mr-[28px]">
              <SalesCard
                img={'/img/solchicks-641.png'}
                title={'SolChicks #641'}
                brand={'SolChicks'}
                signature={
                  '1djpsmYBoUzvhhaMP2j2pfoiGTwLgQ4kfF2a3uzdpNLx8kw3CXfRBbBVQTpBpDjG16mpYB99QUo8PhzXzdML9uk'
                }
                time={new Date().toISOString()}
                from={'Hh8KHdiwYXCDxyVp8GkfHbQohzextaSAQvTJLAdd5B5G'}
                amount={'245.68'}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LatestSales;
