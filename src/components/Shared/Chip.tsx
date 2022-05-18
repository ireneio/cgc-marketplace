import { CSSProperties } from 'react';
import Button from './Button';

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: any;
  disabled?: boolean;
  circle?: boolean;
  small?: boolean;
  large?: boolean;
}

const Chip = ({
  children,
  style,
  className,
  disabled,
  small,
  large,
  onClick,
  circle,
}: Props) => {
  return (
    <div>
      <Button
        style={{
          ...style,
          padding: small ? '4px 16px' : large ? '12px 40px' : '',
          fontSize: small ? '10px' : large ? '18px' : '',
          borderRadius: circle ? '50%' : '40px',
          cursor: 'default',
        }}
        className={className}
        disabled={disabled}
        onClick={() => onClick && onClick()}
        disableHoverEffect={!onClick}
      >
        {children}
      </Button>
    </div>
  );
};

export default Chip;
