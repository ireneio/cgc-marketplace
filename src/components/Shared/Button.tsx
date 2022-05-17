import { CSSProperties } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: any;
}

const Button = ({ children, className, style, onClick }: Props) => {
  return (
    <div
      className={twMerge(
        'py-[8px] px-[32px] font-bold text-[#FFFFFF] bg-transparent border-solid border-[2px] border-[#FC1F8E] rounded-[5px] cursor-pointer',
        className,
      )}
      style={style}
      onClick={() => onClick && onClick()}
    >
      {children}
    </div>
  );
};

export default Button;
