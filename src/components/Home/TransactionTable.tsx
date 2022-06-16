import {
  getNumberWithCommas,
  getTrimmedAddressEllipsisMiddle,
} from '@/utils/formatHelper';
import dayjs from 'dayjs';
import React, { useMemo } from 'react';
import DefaultTable from '../Shared/DefaultTable';
import relativeTime from 'dayjs/plugin/relativeTime';
import ClipboardText from '../Shared/ClipboardText';

dayjs.extend(relativeTime);
interface Props {
  rows:
    | React.ReactNode[][]
    | string[][]
    | number[][]
    | Record<string, any>[][]
    | any[][];
  headers: string[] | number[] | React.ReactNode[];
  loading?: boolean;
}

const TransactionTable = ({ rows, headers, loading }: Props) => {
  const _headers = useMemo(() => {
    return headers.map((header, index) => {
      return (
        <div
          key={index}
          className="uppercase px-[0px] py-[0px] text-[12px] text-left text-[#FFFFFF]"
        >
          {header}
        </div>
      );
    });
  }, [headers]);

  const handleGoExplorer = (hash: string, type: 'tx' | 'account') => {
    if (type === 'tx') {
      window.open(`https://solscan.io/tx/${hash}`, '_blank');
    } else if (type === 'account') {
      window.open(`https://solscan.io/account/${hash}`, '_blank');
    }
  };

  const _rows = useMemo(() => {
    if (!rows.length) {
      return [];
    }
    return rows.map((row, rowIndex) => {
      if (!row.length) {
        return [];
      }
      return row.map((col, colIndex) => {
        if (colIndex === 0) {
          return (
            <div
              key={colIndex}
              className="py-[10.5px] flex items-center text-[14px] px-[10px]"
              style={{
                background: rowIndex % 2 === 0 ? '#290030' : 'transparent',
              }}
            >
              <div className="h-[16px] w-[16px] mr-[12px] py-[12px] flex items-center">
                {col.icon && (
                  <img
                    className="h-[16px] w-[16px] object-contain"
                    src={col.icon}
                    alt="icon"
                  />
                )}
              </div>
              <div className="uppercase text-[#FFFFFF]">${col.text}</div>
            </div>
          );
        } else if (colIndex === 1) {
          return (
            <div
              style={{
                background: rowIndex % 2 === 0 ? '#290030' : 'transparent',
              }}
            >
              <ClipboardText key={colIndex} copyValue={String(col)}>
                <div
                  className="text-[#FC1F8E] text-[14px] px-[10px] py-[12px]"
                  onClick={() => handleGoExplorer(col, 'tx')}
                >
                  <div className="w-[150px]">
                    {getTrimmedAddressEllipsisMiddle(String(col), {
                      length: 12,
                    })}
                  </div>
                </div>
              </ClipboardText>
            </div>
          );
        } else if (colIndex === 2) {
          return (
            <div
              key={colIndex}
              className="text-[#FFFFFF] text-[14px] px-[10px] py-[12px]"
              style={{
                background: rowIndex % 2 === 0 ? '#290030' : 'transparent',
              }}
            >
              {dayjs(Number(col) * 1000).fromNow()}
            </div>
          );
        } else if (colIndex === 3) {
          return (
            <div
              style={{
                background: rowIndex % 2 === 0 ? '#290030' : 'transparent',
              }}
            >
              <ClipboardText key={colIndex} copyValue={String(col)}>
                <div
                  className="text-[#FC1F8E] text-[14px] px-[10px] py-[12px]"
                  onClick={() => handleGoExplorer(col, 'account')}
                >
                  <div className="w-[150px]">
                    {getTrimmedAddressEllipsisMiddle(String(col), {
                      length: 12,
                    })}
                  </div>
                </div>
              </ClipboardText>
            </div>
          );
        } else if (colIndex === 4) {
          return (
            <div
              style={{
                background: rowIndex % 2 === 0 ? '#290030' : 'transparent',
              }}
            >
              <ClipboardText key={colIndex} copyValue={String(col)}>
                <div
                  className="text-[#FC1F8E] text-[14px] px-[10px] py-[12px]"
                  onClick={() => handleGoExplorer(col, 'account')}
                >
                  <div className="w-[150px]">
                    {getTrimmedAddressEllipsisMiddle(String(col), {
                      length: 12,
                    })}
                  </div>
                </div>
              </ClipboardText>
            </div>
          );
        } else if (colIndex === 5) {
          return (
            <div
              key={colIndex}
              className="text-[#FFFFFF] text-[14px] px-[10px] py-[12px]"
              style={{
                background: rowIndex % 2 === 0 ? '#290030' : 'transparent',
              }}
            >
              {getNumberWithCommas(String(col), 2)}
            </div>
          );
        } else if (colIndex === 6) {
          return (
            <div
              key={colIndex}
              className="text-[#FFFFFF] text-[14px] px-[10px] py-[12px]"
              style={{
                background: rowIndex % 2 === 0 ? '#290030' : 'transparent',
              }}
            >
              ${getNumberWithCommas(String(col), 2)}
            </div>
          );
        }
      });
    });
  }, [rows]);

  return (
    <div>
      {!loading && <DefaultTable rows={_rows} headers={_headers} />}
      {loading && (
        <div className="w-full flex items-center justify-center">
          <img src={'/img/spinner.svg'} alt="spinner" />
        </div>
      )}
    </div>
  );
};

export default TransactionTable;
