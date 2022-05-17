import React from 'react';

interface Props {
  children: React.ReactNode;
}
const SectionTitle = ({ children }: Props) => {
  return (
    <div className="text-[#FFFFFF]  font-bold text-[24px] capitalize">
      {children}
    </div>
  );
};

export default SectionTitle;
