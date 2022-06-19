import {
  getNumberWithCommas,
  getTrimmedAddressEllipsisMiddle,
} from '@/utils/formatHelper';
import dayjs from 'dayjs';
import { useMemo } from 'react';
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
}

const HistoryTable = ({ rows, headers }: Props) => {
  const handleGoExplorer = (hash: string, type: 'tx' | 'account') => {
    if (type === 'tx') {
      window.open(`https://solscan.io/tx/${hash}`, '_blank');
    } else if (type === 'account') {
      window.open(`https://solscan.io/account/${hash}`, '_blank');
    }
  };

  const _headers = useMemo(() => {
    return headers.map((header, index) => {
      return (
        <div
          key={index}
          className="uppercase text-[12px] text-left text-[#FFFFFF]"
        >
          {header}
        </div>
      );
    });
  }, [headers]);

  const _rows = useMemo(() => {
    return rows.map((row, rowIndex) => {
      return row.map((col, colIndex) => {
        if (colIndex === 0) {
          return (
            <div
              key={colIndex}
              className="py-[12px] flex items-center text-[14px] px-[10px]"
              style={{
                background: rowIndex % 2 === 0 ? '#290030' : 'transparent',
              }}
            >
              <div
                className="capitalize text-[#FFFFFF] tracking-widest"
                style={{
                  color: col === 'Listing or Cancel' ? '#3FFF8C' : '#FFFFFF',
                }}
              >
                {col}
              </div>
            </div>
          );
        } else if (colIndex === 1 || colIndex === 2) {
          return (
            <div
              style={{
                background: rowIndex % 2 === 0 ? '#290030' : 'transparent',
              }}
            >
              {col ? (
                <ClipboardText copyValue={col}>
                  <div
                    key={colIndex}
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
              ) : (
                <>
                  <div
                    key={colIndex}
                    className="text-[#FC1F8E] text-[14px] px-[10px] py-[12px]"
                  >
                    <div className="w-[150px]">
                      {getTrimmedAddressEllipsisMiddle(String(col), {
                        length: 12,
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        } else if (colIndex === 3) {
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
        } else if (colIndex === 4) {
          return (
            <div
              key={colIndex}
              className="text-[#FFFFFF] text-[14px] px-[10px] py-[12px]"
              style={{
                background: rowIndex % 2 === 0 ? '#290030' : 'transparent',
              }}
            >
              {col ? `$${getNumberWithCommas(String(col), 2)}` : '-'}
            </div>
          );
        }
      });
    });
  }, [rows]);

  return (
    <div>
      <DefaultTable rows={_rows} headers={_headers} />
    </div>
  );
};

export default HistoryTable;
