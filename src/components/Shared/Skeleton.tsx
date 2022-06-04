import { CSSProperties } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
  className?: string;
  style?: CSSProperties;
}

const Skeleton = ({ className, style }: Props) => {
  return (
    <div
      className={twMerge(`animate-pulse bg-[#aaaaaa] rounded h-3`, className)}
      style={style}
    />
  );
};

export default Skeleton;
