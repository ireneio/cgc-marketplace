import { getNumberWithCommas, getTrimmedAddress } from '@/utils/formatHelper';
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
          className="uppercase px-[0px] py-[0px] text-[12px] text-left text-[#FFFFFF]"
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
              key={colIndex}
              className="text-[#FC1F8E] text-[14px] px-[10px] py-[12px]"
              style={{
                background: rowIndex % 2 === 0 ? '#290030' : 'transparent',
              }}
            >
              {getTrimmedAddress(String(col), { length: 12 })}
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
              {dayjs(String(col)).fromNow()}
            </div>
          );
        } else if (colIndex === 3) {
          return (
            <div
              key={colIndex}
              className="text-[#FC1F8E] text-[14px] px-[10px] py-[12px]"
              style={{
                background: rowIndex % 2 === 0 ? '#290030' : 'transparent',
              }}
            >
              {getTrimmedAddress(String(col), { length: 12 })}
            </div>
          );
        } else if (colIndex === 4) {
          return (
            <div
              key={colIndex}
              className="text-[#FC1F8E] text-[14px] px-[10px] py-[12px]"
              style={{
                background: rowIndex % 2 === 0 ? '#290030' : 'transparent',
              }}
            >
              {getTrimmedAddress(String(col), { length: 12 })}
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
