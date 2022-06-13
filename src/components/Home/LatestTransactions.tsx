import { OAuthContext } from '@/contexts/OAuthProvider';
import api from '@/utils/api';
import { useContext, useEffect, useMemo, useState } from 'react';
import Pagination from '../Shared/Pagination';
import SectionTitle from '../Shared/SectionTitle';
import TransactionTable from './TransactionTable';
import { flatten } from 'lodash';
import { parseUnits } from 'ethers/lib/utils';

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
    return response && response.length ? response : [];
  };

  const setData = async () => {
    const data = await getData();
    const transformed = data
      .map((token: any) => {
        return {
          tokenHistoricalTxns: flatten(token?.tokenHistoricalTxns || []),
          icon: token?.iconSrcUrl,
          text: token?.symbol,
          id: token?.id,
          decimals: token?.decimals,
        };
      })
      .reduce((acc: any[], curr: any) => {
        for (let i = 0; i < curr?.tokenHistoricalTxns.length; i++) {
          acc.push({
            icon: curr.icon,
            text: curr.text,
            id: curr.id,
            transaction: curr.tokenHistoricalTxns[i],
          });
        }
        return acc;
      }, [])
      .sort((a: any, b: any) => {
        return b?.transaction?.block_time - a?.transaction?.block_time;
      })
      .map((row: any) => {
        return [
          { icon: row?.icon, text: row?.text },
          row?.transaction?.signature || '',
          row?.transaction?.block_time || '',
          row?.transaction?.senderAddress || '',
          row?.transaction?.recipientAddress || '',
          row?.transaction?.amountToken || '',
          // parseUnits(String(row?.transaction?.amountToken), row?.decimals) ||
          //   '',
          row?.transaction?.amountUsd || '',
        ];
      });
    setTxList(transformed);
  };

  useEffect(() => {
    setLoading(true);
    setCurrentPage(0);
    setData().then(() => {
      setLoading(false);
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
