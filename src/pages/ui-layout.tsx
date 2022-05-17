import Header from '@/components/Layout/Header';
import Sidebar from '@/components/Layout/Sidebar';
import { useEffect, useState } from 'react';

const UiLayout = () => {
  const [currentSideBarValue, setCurrentSideBarValue] = useState('d');

  useEffect(() => {
    console.log(currentSideBarValue);
  }, [currentSideBarValue]);

  return (
    <div className="bg-[#13002B] min-h-[100vh]">
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
    </div>
  );
};

export default UiLayout;
