import React from 'react';

const PrimaryGradientText = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      style={{
        background: 'linear-gradient(180deg, #F41786 0%, #A713ED 100%)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
      className={className}
    >
      {children}
    </div>
  );
};

export default PrimaryGradientText;
