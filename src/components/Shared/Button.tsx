import { CSSProperties, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: any;
  disabled?: boolean;
  disableHoverEffect?: boolean;
  link?: boolean;
}

const Button = ({
  children,
  className,
  style,
  onClick,
  disabled,
  disableHoverEffect,
  link,
}: Props) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      style={{
        background: link
          ? 'transparent'
          : disabled
          ? '#AAAAAA'
          : 'linear-gradient(180deg, #F41786 0%, #A713ED 100%)',
      }}
      className={twMerge('rounded-[5px]  px-[1px] py-[1px] text-center')}
    >
      <button
        className={twMerge(
          'py-[8px] px-[32px] font-bold text-[#FFFFFF] cursor-pointer rounded-[5px] flex items-center w-full text-center',
          // className,
        )}
        style={{
          cursor: disabled ? 'not-allowed' : 'pointer',
          ...style,
          background: link
            ? 'transparent'
            : disabled
            ? '#AAAAAA'
            : disableHoverEffect
            ? '#13002B'
            : hover
            ? 'linear-gradient(180deg, #F41786 0%, #A713ED 100%)'
            : '#13002B',
          textAlign: 'center',
        }}
        onClick={() => onClick && onClick()}
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
        disabled={disabled}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
