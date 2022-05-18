import { CSSProperties } from 'react';
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
  const defaultClasses =
    'py-[8px] px-[32px] font-bold text-[#FFFFFF] bg-[#13002B] border-solid border-[2px] border-[#FC1F8E] rounded-[5px] cursor-pointer disabled:bg-[#181818] disabled:text-[#AAA] disabled:border-[#181818] hover:bg-[#FC1F8E] transition ease-in';
  const noHoverEffectClasses =
    'py-[8px] px-[32px] font-bold text-[#FFFFFF] bg-[#13002B] border-solid border-[2px] border-[#FC1F8E] rounded-[5px] cursor-pointer disabled:bg-[#181818] disabled:text-[#AAA] disabled:border-[#181818] transition ease-in';

  return (
    <button
      className={twMerge(
        disableHoverEffect ? noHoverEffectClasses : defaultClasses,
        className,
      )}
      style={{
        cursor: disabled ? 'not-allowed' : 'pointer',
        ...style,
        borderColor: link ? 'transparent' : '',
        // backgroundColor: link ? 'transparent' : '#13002B',
      }}
      onClick={() => onClick && onClick()}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
