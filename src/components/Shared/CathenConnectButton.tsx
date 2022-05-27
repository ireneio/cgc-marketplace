import { useAppDispatch, useAppSelector } from '@/store';
import { getTrimmedAddress } from '@/utils/formatters';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { LoginModal } from '../Modals/LoginModal';
import Button from './Button';
import DropdownMenu from './DropdownMenu';

const CathenConnectButton = () => {
  const dispatch = useAppDispatch();
  const email = useAppSelector((state) => state.user.userInfo.email);
  const router = useRouter();
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleConnect = async () => {
    if (!email) {
      setLoginModalOpen(true);
    } else {
      setDropdown((prev) => !prev);
    }
  };

  const handleDropdownClick = (val: string) => {
    setDropdown(false);
    if (val === 'Account') {
      router.push('/account');
    } else {
      dispatch({ type: 'SET_USER_EMAIL', payload: '' });
    }
  };

  return (
    <div>
      <Button
        onClick={handleConnect}
        className=" flex w-full text-left px-4 py-2 text-sm bg-transparent text-white"
        style={{ position: 'relative' }}
      >
        <img
          src="/img/cgc-logo-no-text.png"
          width={18}
          height={18}
          alt="catheon"
        />
        <span className="ml-[10px]">
          {email ? getTrimmedAddress(email, { length: 5 }) : 'Connect'}
        </span>
        {dropdown && (
          <DropdownMenu
            items={[
              { text: 'cgPass', value: 'Account' },
              { text: 'Logout', value: 'Logout' },
            ]}
            onItemClick={(val) => handleDropdownClick(val)}
          />
        )}
      </Button>
      <LoginModal isOpen={loginModalOpen} setIsOpen={setLoginModalOpen} />
    </div>
  );
};

export default CathenConnectButton;
