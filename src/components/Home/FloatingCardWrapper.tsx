import { useRouter } from 'next/router';
import React, { useState } from 'react';
import FloatingCard from '../Shared/FloatingCard';

const FloatingCardWrapper = ({ items }: { items: any[] }) => {
  const router = useRouter();
  const [tempCard, setTempCard] = useState<any>({ index: -1 });

  const handleOnPlay = (id: string | number) => {
    router.push(`/collection/${id}`);
  };
  return (
    <div className="relative">
      <div className="pt-[48px] pb-[24px] floating-card-wrapper">
        {items.map((item, index) => {
          return (
            <div
              key={index}
              id={String(index)}
              className="mr-[12px] w-[350px] h-[235.42px] floating-card relative"
            >
              <FloatingCard
                bg={item.splashSrc}
                bgOnHover={item.videoSrc}
                title={item.description}
                categories={item.tags}
                network={'SOL'}
                marketCap={'10000'}
                coinSupply={'100000000000'}
                onPlay={() => handleOnPlay(item.id)}
                onCardClick={() => handleOnPlay(item.id)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FloatingCardWrapper;
