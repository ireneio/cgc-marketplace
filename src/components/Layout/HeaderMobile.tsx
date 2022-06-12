import { useAppDispatch } from '@/store';
import { useRouter } from 'next/router';

const HeaderMobile = ({
  onNavOpen,
  navOpen,
}: {
  onNavOpen: () => void;
  navOpen: boolean;
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleGoHomePage = () => {
    dispatch({ type: 'SET_NAVIGATION_PATH', payload: 'Home' });
    router.push('/');
  };

  const handleOpenNav = () => {
    onNavOpen && onNavOpen();
  };

  return (
    <div className="flex items-center w-[100vw] z-[10] shadow-lg bg-[#0C001C] fixed top-0 left-0 h-[48px] px-[25px] mx-auto max-w-[3840px]">
      <div className="cursor-pointer flex items-stretch w-full">
        <div onClick={() => handleGoHomePage()}>
          <img
            className="block h-8 w-auto"
            src={'/img/cgc_logo_white.png'}
            alt="Catheon Gaming"
          />
        </div>
        <div className="ml-auto pl-[24px]" onClick={() => handleOpenNav()}>
          {!navOpen && (
            <img
              className="block h-8 w-auto -rotate-90"
              src={'/img/icon_signal.svg'}
              alt="signal"
              width={20}
            />
          )}
          {navOpen && (
            <img
              className="block h-8 w-auto -rotate-90 ml-[12px] mr-[-8px]"
              src={'/img/icon_close.png'}
              alt="close"
              width={32}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderMobile;
