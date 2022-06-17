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
          <EmptyListTextDisplay>No Items Available.</EmptyListTextDisplay>
        ) : (
          <></>
        )}
        {!loading
          ? _data.map((tx, index) => {
              return (
                <div key={index} className="mr-[28px]">
                  <SalesCard
                    img={'/img/solchicks-641.png'}
                    title={'SolChicks #641'}
                    brand={'SolChicks'}
                    signature={tx?.signature || ''}
                    time={tx?.createdAt || ''}
                    from={tx?.senderAddress || ''}
                    to={tx?.recipientAddress || ''}
                    amount={String(tx?.amountUsd) || ''}
                  />
                </div>
              );
            })
          : [1, 2, 3, 4, 5].map((val, idx) => {
              return (
                <div key={idx} className="mr-[28px]">
                  <SalesCardLoading />
                </div>
              );
            })}
        <div ref={ref}></div>
      </div>
    </div>
  );
};

export default LatestSales;
