import { useEffect, useMemo, useState } from 'react';
import SalesCard from './SalesCard';
import SectionTitle from '../Shared/SectionTitle';
import { useGetNftTransactionsV2 } from '@/hooks/services_nft';
import { useInView } from 'react-intersection-observer';
import SalesCardLoading from './SalesCardLoading';
import EmptyListTextDisplay from '../Shared/EmptyListTextDisplay';

const LIMIT = 10;

const LatestSales = () => {
  const { data, loading } = useGetNftTransactionsV2();
  const [page, setPage] = useState(0);
  const { inView, ref } = useInView();

  const _data = useMemo(() => {
    return data
      .filter((nft: any) => nft?.nftEventType === 'buyNow')
      .sort((a, b) => {
        return b.blockTime - a.blockTime;
      })
      .slice(0, page + LIMIT);
  }, [data, inView, page]);

  useEffect(() => {
    if (inView) {
      setPage((prev) => prev + LIMIT);
    }
  }, [inView]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <SectionTitle>latest sales</SectionTitle>
      </div>
      <div className="mt-[24px] flex overflow-auto pb-[24px] scrollbar_thin">
        {!loading && !data.length ? (
          <EmptyListTextDisplay>No items available.</EmptyListTextDisplay>
        ) : (
          <></>
        )}
        {!loading
          ? _data.map((tx, index) => {
              return (
                <div key={index} className="mr-[28px]">
                  <SalesCard
                    img={tx?.image || '/img/cgc_icon.png'}
                    title={tx?.name || 'N/A'}
                    brand={tx?.symbol || 'N/A'}
                    signature={tx?.signature || ''}
                    time={tx?.block_time?.toString() || ''}
                    from={tx?.senderAddress || ''}
                    to={tx?.recipientAddress || ''}
                    tokenAddress={tx?.tokenAddress || ''}
                    amount={String(tx?.amountUsd) || ''}
                  />
                </div>
              );
            })
          : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((val, idx) => {
              return (
                <div key={idx} className="mr-[28px]">
                  <SalesCardLoading />
                </div>
              );
            })}
        <div ref={ref} />
      </div>
    </div>
  );
};

export default LatestSales;
