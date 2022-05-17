import { CSSProperties } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: any;
  disabled?: boolean;
}

const Button = ({ children, className, style, onClick, disabled }: Props) => {
  return (
    <button
      className={twMerge(
        'py-[8px] px-[32px] font-bold text-[#FFFFFF] bg-transparent border-solid border-[2px] border-[#FC1F8E] rounded-[5px] cursor-pointer disabled:bg-[#181818] disabled:text-[#AAA] disabled:border-[#181818] hover:bg-[#FC1F8E] transition ease-in',
        className,
      )}
      style={{ ...style, cursor: disabled ? 'not-allowed' : 'pointer' }}
      onClick={() => onClick && onClick()}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
