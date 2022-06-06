import { useState } from 'react';
import CatheonConnectButton from '../Shared/CatheonConnectButton';
import { useAppDispatch } from '@/store';
import { useRouter } from 'next/router';

const Header = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [search, setSearch] = useState('');

  const handleSearchInput = (val: string) => {
    setSearch(val);
  };

  const handleGoHomePage = () => {
    dispatch({ type: 'SET_NAVIGATION_PATH', payload: 'Home' });
    router.push('/');
  };

  return (
    <div className="z-[10] shadow-lg bg-[#0C001C] fixed top-0 left-0 flex w-[100vw] h-[75px] items-center px-[25px] mx-auto max-w-[3840px]">
      <div className="cursor-pointer w-[200px]">
        <div onClick={() => handleGoHomePage()}>
          <img
            className="block h-8 w-auto"
            src={'/img/cgc_logo_white.png'}
            alt="Catheon Gaming"
          />
        </div>
      </div>
      <div className="relative w-[50vw] ml-[-4px]">
        <input
          type="text"
          value={search}
          onChange={(e) => handleSearchInput(e.target.value)}
          className="w-full bg-transparent rounded-[5px] text-[#FFFFFF] outline-[1px] border-solid border-[2px] border-[#290030] focus:border-none focus:outline-none focus:ring-[2px] focus:ring-[#FC1F8E]"
          placeholder="Search Games and Collections"
        />
        <div className="absolute right-[12px] top-[12px]">
          <img
            className="hidden md:block h-[20px] w-auto"
            src={'/img/icon_search.svg'}
            alt="search icon"
          />
        </div>
      </div>
      <div className="flex items-center ml-auto">
        <div className="">
          <CatheonConnectButton />
        </div>
      </div>
    </div>
  );
};

export default Header;
