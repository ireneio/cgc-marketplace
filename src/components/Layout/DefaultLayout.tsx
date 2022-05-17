import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface Props {
  children?: React.ReactNode;
}

const DefaultLayout = ({ children }: Props) => {
  const [currentSideBarValue, setCurrentSideBarValue] = useState('d');

  return (
    <div className="min-h-[100vh] w-[100vw] bg-[#0C001C]">
      <Header />
      <Sidebar
        items={[
          { text: 'Home', value: 'd', icon: '' },
          { text: 'Launchpad', value: 'm', icon: '' },
          { text: 'Collections', value: 'h', disabled: true, icon: '' },
          {
            text: 'Explore',
            value: 's',
            icon: '',
            children: [
              { text: 'Child', value: 'c1' },
              { text: 'Child2', value: 'c2' },
            ],
          },
          { text: 'Streamflow', value: 'st', icon: '' },
          { text: 'Staking', value: 'stk', icon: '' },
          { text: 'Mint', value: 'mt', icon: '' },
          { text: 'More', value: 'more', icon: '' },
          { text: 'More2', value: 'more2', icon: '' },
          { text: 'More3', value: 'more3', icon: '' },
          { text: 'More4', value: 'more4', icon: '' },
        ]}
        currentValue={currentSideBarValue}
        onItemClick={(value) => setCurrentSideBarValue(value)}
      />
      {children}
    </div>
  );
};

export default DefaultLayout;
