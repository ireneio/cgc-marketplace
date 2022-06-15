import { fetcher } from '@/utils/swr';
import { flatten } from 'lodash';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

export const useGetTokenList = () => {
  const [items, setItems] = useState<any[]>([]);
  const { data, error, mutate, isValidating } = useSWR(
    `/v1/api/token/list`,
    fetcher.bind({
      method: 'get',
    }),
  );

  useEffect(() => {
    if (data?.success) {
      const _data = data?.data;
      if (!_data || !_data.length) return;
      const _transformed = _data
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
        .filter(
          (item: any) =>
            Number(item?.transaction?.amountToken) > 0 &&
            Number(item?.transaction?.amountUsd) > 0,
        )
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
      setItems(_transformed);
    }
  }, [data]);

  return {
    refresh: mutate,
    data: items,
    loading: isValidating,
    error,
  };
};
