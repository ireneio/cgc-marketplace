import React from 'react';
import { twMerge } from 'tailwind-merge';

const Tag = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      style={{ wordBreak: 'keep-all' }}
      className={twMerge(
        'px-[8px] py-[4px] border-solid border-[1px] border-[#290030] bg-[#13002B] text-[#FFFFFF] text-[14px] rounded-[5px]',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Tag;
