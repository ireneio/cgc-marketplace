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
          <img
            className="block h-8 w-auto -rotate-90"
            src={navOpen ? '/img/icon_close.png' : '/img/icon_signal.svg'}
            alt="close"
            width={20}
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderMobile;
