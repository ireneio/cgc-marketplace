import { OAuthContext } from '@/contexts/OAuthProvider';
import api from '@/utils/api';
import { useContext, useEffect, useMemo, useState } from 'react';
import Pagination from '../Shared/Pagination';
import SectionTitle from '../Shared/SectionTitle';
import TransactionTable from './TransactionTable';

const PAGE_LIMIT = 10;

const LatestTransactions = () => {
  const oAuthCtx = useContext(OAuthContext);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [txList, setTxList] = useState<any[]>([]);

  const _txList = useMemo(() => {
    const startIdx = currentPage * PAGE_LIMIT;
    const endIdx = startIdx + PAGE_LIMIT;
    return txList.length ? txList.slice(startIdx, endIdx) : [];
  }, [txList, currentPage]);

  const getData = async () => {
    const response = await api.getTokenList(oAuthCtx.access_token);
    return response;
  };

  const setData = async () => {
    setLoading(true);
    setCurrentPage(0);
    const data = await getData();
    const map = data
      .map((tx: any) => {
        return {
          info: { icon: tx?.iconSrcUrl, text: tx?.symbol },
          list: tx?.tokenHistoricalTxns || [],
        };
      })
      .reduce((acc: any[], curr: any) => {
        const _curr = curr?.list?.map((item: any) => ({
          ...item,
          ...curr.info,
        }));
        if (_curr && curr.length) {
          acc = [...acc, ..._curr];
        } else {
          acc = [...acc];
        }
        return acc;
      }, [])
      .sort((a: any, b: any) => b.block_time - a.block_time)
      .map((item: any) => {
        return [
          { icon: item?.icon, text: item?.text },
          item?.signature,
          item?.block_time,
          item?.senderAddress,
          item?.recipientAddress,
          // item?.amountToken
          item?.amountUsd,
        ];
      });
    setTxList(map);
  };

  useEffect(() => {
    setData().then(() => {
      // setLoading(false);
    });
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center flex-wrap">
        <SectionTitle>latest transactions</SectionTitle>
        <div className="basis-[100%] md:basis-auto mt-[12px] md:mt-0">
          <Pagination
            totalPages={Math.ceil(txList.length / PAGE_LIMIT)}
            currentPage={currentPage}
            onPageChange={(val) => setCurrentPage(val)}
            onPreviousPage={() => setCurrentPage((prev) => prev - 1)}
            onNextPage={() => setCurrentPage((prev) => prev + 1)}
          />
        </div>
      </div>
      <div className="mt-[24px]">
        <TransactionTable
          rows={_txList}
          headers={['item', 'signature', 'time', 'from', 'to', 'amount ($usd)']}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default LatestTransactions;
