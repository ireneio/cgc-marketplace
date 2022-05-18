import { useState } from 'react';
import Button from './Button';

const CathenConnectButton = () => {
  const [account, setAccount] = useState('Account');

  const handleConnect = async () => {
    console.log('handleConnect');
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
    </div>
  );
};

export default CathenConnectButton;
