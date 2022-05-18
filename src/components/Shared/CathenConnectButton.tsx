import { useState } from 'react';
import { LoginModal } from '../Modals/LoginModal';
import Button from './Button';

const CathenConnectButton = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [account, setAccount] = useState('Account');

  const handleConnect = async () => {
    setLoginModalOpen(true);
  };

  return (
    <div>
      <Button
        onClick={handleConnect}
        className="flex w-full text-left px-4 py-2 text-sm bg-transparent text-white"
      >
        <img
          src="/img/cgc-logo-no-text.png"
          width={18}
          height={18}
          alt="catheon"
        />
        <span className="ml-[10px]">Connect</span>
      </Button>
      <LoginModal isOpen={loginModalOpen} setIsOpen={setLoginModalOpen} />
    </div>
  );
};

export default CathenConnectButton;
