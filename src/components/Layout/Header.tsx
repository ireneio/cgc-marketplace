import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Link from 'next/link';
import { useState } from 'react';
import EvmConnectButton from '@/components/Shared/EvmConnectButton';
import CathenConnectButton from '../Shared/CathenConnectButton';

const Header = () => {
  const [search, setSearch] = useState('');

  const handleSearchInput = (val: string) => {
    setSearch(val);
  };

  return (
    <div className="shadow-lg bg-[#0C001C] fixed top-0 left-0 flex justify-between w-[100vw] h-[75px] items-center px-[25px] mx-auto max-w-[3840px] z-[3]">
      <div className="mr-[12px] cursor-pointer">
        <Link href={'/'} passHref>
          <img
            className="block h-8 w-auto"
            src={'/img/cgc-logo-white.png'}
            alt="Catheon Gaming"
          />
        </Link>
      </div>
      <div style={{ flexBasis: '50%' }} className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => handleSearchInput(e.target.value)}
          className="w-full bg-transparent rounded-[5px] text-[#FFFFFF] outline-[1px] border-solid border-[2px] border-[#290030] focus:border-none focus:outline-none"
          placeholder="Search Games and Collections"
        />
        <div className="absolute right-[12px] top-[12px]">
          <img
            className="hidden md:block h-[20px] w-auto"
            src={'/img/icon_search.png'}
            alt="search icon"
          />
        </div>
      </div>
      <div className="flex items-center ml-[18px]">
        <div className="hidden lg:block">
          <CathenConnectButton />
        </div>
        <div className="ml-[18px] hidden lg:block">
          <WalletMultiButton />
        </div>
        <div className="ml-[12px] hidden lg:block">
          <EvmConnectButton />
        </div>
      </div>
    </div>
  );
};

export default Header;
