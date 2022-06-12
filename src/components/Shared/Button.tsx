import React, { CSSProperties, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
  children: React.ReactNode;
  // className?: string;
  style?: CSSProperties;
  onClick?: any;
  disabled?: boolean;
  disableHoverEffect?: boolean;
  filled?: boolean;
  link?: boolean;
  // shadowed?: boolean;
  // secondary?: boolean;
  loading?: boolean;
}

const Button = ({
  children,
  // className,
  style,
  onClick,
  disabled,
  disableHoverEffect,
  link,
  filled,
  // shadowed,
  // secondary,
  loading,
}: Props) => {
  const [hover, setHover] = useState(false);

  const bgColor = link
    ? 'transparent'
    : disabled
    ? 'linear-gradient(180deg, #F41786 0%, #A713ED 100%)'
    : disableHoverEffect
    ? '#13002B'
    : hover && !filled
    ? 'linear-gradient(180deg, #F41786 0%, #A713ED 100%)'
    : hover && filled
    ? '#13002B'
    : filled
    ? 'linear-gradient(180deg, #F41786 0%, #A713ED 100%)'
    : '#13002B';

  return (
    <div
      style={{
        opacity: disabled ? '0.25' : '1',
        boxShadow: disabled ? '0px 4px 4px 0px #00000040' : '',
        background: bgColor,
      }}
      className={twMerge('rounded-[5px]  px-[1px] py-[1px] text-center')}
    >
      <button
        className={twMerge(
          'py-[8px] px-[32px] font-bold text-[#FFFFFF] cursor-pointer rounded-[5px] flex items-center w-full text-center justify-center',
          // className,
        )}
        style={{
          cursor: disabled || loading ? 'not-allowed' : 'pointer',
          ...style,
          background: link
            ? 'transparent'
            : disabled
            ? 'linear-gradient(180deg, #F41786 0%, #A713ED 100%)'
            : disableHoverEffect
            ? '#13002B'
            : hover && !filled
            ? 'linear-gradient(180deg, #F41786 0%, #A713ED 100%)'
            : hover && filled
            ? '#13002B'
            : filled
            ? 'linear-gradient(180deg, #F41786 0%, #A713ED 100%)'
            : '#13002B',
          textAlign: 'center',
        }}
        onClick={(e) => onClick && onClick(e)}
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
        disabled={disabled || loading}
      >
        {!loading && (
          <div style={{ whiteSpace: 'nowrap' }} className="flex items-center">
            {children}
          </div>
        )}
        {loading && (
          <div>
            {/* <img src="/img/spinner.svg" alt="spinner" width={24} height={24} /> */}
            Loading...
          </div>
        )}
      </button>
    </div>
  );
};

export default Button;
