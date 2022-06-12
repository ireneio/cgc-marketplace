import React from 'react';
import { twMerge } from 'tailwind-merge';

const PrimaryGradientText = ({
  children,
  className,
  onClick,
  underline,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void | Promise<void>;
  underline?: boolean;
}) => {
  return (
    <>
      <div
        style={{
          background: 'linear-gradient(180deg, #F41786 0%, #A713ED 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
        className={twMerge(className)}
        onClick={() => onClick && onClick()}
      >
        {children}
      </div>
      {underline && (
        <div
          className="w-full mt-[-1px] h-[0.5px]"
          style={{
            background: 'linear-gradient(180deg, #F41786 0%, #A713ED 100%)',
          }}
        ></div>
      )}
    </>
  );
};

export default PrimaryGradientText;
