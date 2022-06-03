import {
  getNumberWithCommas,
  getTrimmedAddressEllipsisMiddle,
} from '@/utils/formatHelper';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import DefaultTable from '../Shared/DefaultTable';
import relativeTime from 'dayjs/plugin/relativeTime';
import ClipboardText from '../Shared/ClipboardText';
import PrimaryGradientText from '../Shared/PrimaryGradientText';

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
                style={{ color: col === 'Listing' ? '#3FFF8C' : '#FFFFFF' }}
              >
                {col}
              </div>
            </div>
          );
        } else if (colIndex === 1 || colIndex === 2) {
          return (
            <div
              key={colIndex}
              className="text-[#FC1F8E] text-[14px] px-[10px] py-[12px]"
              style={{
                background: rowIndex % 2 === 0 ? '#290030' : 'transparent',
              }}
            >
              <ClipboardText copyValue={col}>
                <PrimaryGradientText>
                  {getTrimmedAddressEllipsisMiddle(String(col), { length: 12 })}
                </PrimaryGradientText>
              </ClipboardText>
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
              {dayjs(String(col)).fromNow()}
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

export default HistoryTable;
