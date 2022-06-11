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
    <div className="flex z-[10] shadow-lg bg-[#0C001C] fixed top-0 left-0 w-[100vw] h-[75px] items-center px-[25px] mx-auto max-w-[3840px]">
      <div className="cursor-pointer w-[200px]">
        <div onClick={() => handleGoHomePage()}>
          <img
            className="block h-8 w-auto"
            src={'/img/cgc_logo_white.png'}
            alt="Catheon Gaming"
          />
        </div>
      </div>
      <div style={{ width: 'calc(100vw - 200px - 200px)' }}>
        <div className="relative w-[50vw] hidden md:flex ">
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearchInput(e.target.value)}
            className="ml-[6px] text-[#FFF] bg-[#0C001C] w-full font-circularstdbook appearance-none border border-[#290030] rounded-md py-2 px-4 text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-[#FC1F8E] focus:border-white focus:placeholder-gray-400"
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
      </div>
      <div className="flex items-center w-[200px]">
        <div className="flex w-full justify-end">
          <CatheonConnectButton />
        </div>
      </div>
    </div>
  );
};

export default Header;
