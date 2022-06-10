import { twMerge } from 'tailwind-merge';

export type DateTypes = 'day' | 'week' | 'month';
interface Props {
  className?: string;
  onViewChange: (val: DateTypes) => void;
  current?: DateTypes;
}

const DateViewSelector = ({ className, onViewChange, current }: Props) => {
  return (
    <div className={twMerge('flex', className)}>
      <div
        className="text-[14px] text-[#9497AA] cursor-pointer hover:text-[#FFFFFF]"
        onClick={() => onViewChange('day')}
        style={{
          color: current === 'day' ? '#AAA' : '#FFF',
          textDecoration: current === 'day' ? 'none' : 'underline',
        }}
      >
        1d
      </div>
      <div
        className="text-[14px] text-[#9497AA] ml-[12px] cursor-pointer hover:underline hover:text-[#FFFFFF]"
        onClick={() => onViewChange('week')}
        style={{
          color: current === 'week' ? '#AAA' : '#FFF',
          textDecoration: current === 'week' ? 'none' : 'underline',
        }}
      >
        1w
      </div>
      <div
        className="text-[14px] text-[#9497AA] ml-[12px] cursor-pointer hover:underline hover:text-[#FFFFFF]"
        onClick={() => onViewChange('month')}
        style={{
          color: current === 'month' ? '#AAA' : '#FFF',
          textDecoration: current === 'month' ? 'none' : 'underline',
        }}
      >
        1m
      </div>
    </div>
  );
};

export default DateViewSelector;
