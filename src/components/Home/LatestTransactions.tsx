import { useMemo, useState } from 'react';
import Pagination from '../Shared/Pagination';
import SectionTitle from '../Shared/SectionTitle';
import TransactionTable from './TransactionTable';
import { useGetTokenList } from '@/hooks/services_token';

const PAGE_LIMIT = 10;

const LatestTransactions = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const { data, loading } = useGetTokenList();

  const _txList = useMemo(() => {
    const startIdx = currentPage * PAGE_LIMIT;
    const endIdx = startIdx + PAGE_LIMIT;
    return data.length ? data.slice(startIdx, endIdx) : [[]];
  }, [data, currentPage]);

  return (
    <div>
      <div className="flex justify-between items-center flex-wrap">
        <SectionTitle>latest transactions</SectionTitle>
        {_txList.length && (
          <div className="basis-[100%] md:basis-auto mt-[12px] md:mt-0">
            <Pagination
              totalPages={Math.ceil(data.length / PAGE_LIMIT)}
              currentPage={currentPage}
              onPageChange={(val) => setCurrentPage(val)}
              onPreviousPage={() => setCurrentPage((prev) => prev - 1)}
              onNextPage={() => setCurrentPage((prev) => prev + 1)}
            />
          </div>
        )}
      </div>
      <div className="mt-[24px]">
        <TransactionTable
          rows={_txList}
          headers={[
            'item',
            'signature',
            'time',
            'from',
            'to',
            'amount',
            'amount ($usd)',
          ]}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default LatestTransactions;
