import { twMerge } from 'tailwind-merge';

interface Props {
  className?: string;
  onViewChange: (val: 'day' | 'week' | 'month') => void;
}

const DateViewSelector = ({ className, onViewChange }: Props) => {
  return (
    <div className={twMerge('flex', className)}>
      <div
        className="text-[14px] text-[#9497AA] cursor-pointer hover:underline hover:text-[#FFFFFF]"
        onClick={() => onViewChange('day')}
      >
        1d
      </div>
      <div
        className="text-[14px] text-[#9497AA] ml-[12px] cursor-pointer hover:underline hover:text-[#FFFFFF]"
        onClick={() => onViewChange('week')}
      >
        1w
      </div>
      <div
        className="text-[14px] text-[#9497AA] ml-[12px] cursor-pointer hover:underline hover:text-[#FFFFFF]"
        onClick={() => onViewChange('month')}
      >
        1m
      </div>
    </div>
  );
};

export default DateViewSelector;
