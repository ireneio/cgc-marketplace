import { twMerge } from 'tailwind-merge';

interface Props {
  onClick?: any;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

const ButtonLink = ({ onClick, children, disabled, className }: Props) => {
  return (
    <button
      onClick={() => onClick && onClick()}
      className={twMerge(
        'text-[#FFFFFF] text-[12px] uppercase font-semibold cursor-pointer disabled:cursor-not-allowed disabled:text-[#AAAAAA]',
        className,
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default ButtonLink;
