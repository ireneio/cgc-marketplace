import { getNumberWithCommas, getTrimmedAddress } from '@/utils/formatters';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import DefaultTable from '../Shared/DefaultTable';
import relativeTime from 'dayjs/plugin/relativeTime';

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

const TransactionTable = ({ rows, headers }: Props) => {
  const _headers = useMemo(() => {
    return headers.map((header, index) => {
      return (
        <div
          key={index}
          className="uppercase px-[10px] py-[10px] text-[12px] text-left text-[#FFFFFF]"
        >
          {header}
        </div>
      );
    });
  }, [headers]);

  const _rows = useMemo(() => {
    return rows.map((row) => {
      return row.map((col, colIndex) => {
        if (colIndex === 0) {
          return (
            <div
              key={colIndex}
              className="py-[12px] flex items-center text-[14px] px-[10px]"
            >
              <div className="h-[18px] w-[18px] mr-[12px]">
                {col.icon && (
                  <img
                    className="h-[18px] w-[18px] object-contain"
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
              key={colIndex}
              className="text-[#FC1F8E] text-[14px] px-[10px]"
            >
              {getTrimmedAddress(String(col), { length: 12 })}
            </div>
          );
        } else if (colIndex === 2) {
          return (
            <div
              key={colIndex}
              className="text-[#FFFFFF] text-[14px] px-[10px]"
            >
              {dayjs(String(col)).fromNow()}
            </div>
          );
        } else if (colIndex === 3) {
          return (
            <div
              key={colIndex}
              className="text-[#FC1F8E] text-[14px] px-[10px]"
            >
              {getTrimmedAddress(String(col), { length: 12 })}
            </div>
          );
        } else if (colIndex === 4) {
          return (
            <div
              key={colIndex}
              className="text-[#FC1F8E] text-[14px] px-[10px]"
            >
              {getTrimmedAddress(String(col), { length: 12 })}
            </div>
          );
        } else if (colIndex === 5) {
          return (
            <div
              key={colIndex}
              className="text-[#FFFFFF] text-[14px] px-[10px]"
            >
              {getNumberWithCommas(String(col), 2)}
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

export default TransactionTable;
