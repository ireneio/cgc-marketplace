import React from 'react';

const EmptyListTextDisplay = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="text-[#FFFFFF] text-[18px] w-full flex items-center justify-center">
      <div>{children}</div>
    </div>
  );
};

export default EmptyListTextDisplay;
