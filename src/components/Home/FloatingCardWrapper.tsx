import { useRouter } from 'next/router';
import React, { useState } from 'react';
import FloatingCard from '../Shared/FloatingCard';

const FloatingCardWrapper = ({ items }: { items: any[] }) => {
  const router = useRouter();
  const [addMarginLeft, setAddMarginLeft] = useState(false);
  const [addMarginRight, setAddMarginRight] = useState(false);

  const handleOnPlay = (id: string | number) => {
    router.push(`/collection/${id}`);
  };

  return (
    <div className="pt-[32px] pb-[24px] floating-card-wrapper hide-scrollbar w-[3000px]">
      {items.map((item, index) => {
        return (
          <div
            key={index}
            className="pr-[12px]"
            style={{
              marginLeft:
                (index === 0 || index === items.length - 1) && addMarginLeft
                  ? 40
                  : 0,
              marginRight:
                (index === 0 || index === items.length - 1) && addMarginRight
                  ? 40
                  : 0,
            }}
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
              onFirstItemMouseOver={(val) =>
                index === 0
                  ? setAddMarginLeft(val)
                  : index === items.length - 1
                  ? setAddMarginRight(val)
                  : ''
              }
              onCardClick={() => handleOnPlay(item.id)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default FloatingCardWrapper;
