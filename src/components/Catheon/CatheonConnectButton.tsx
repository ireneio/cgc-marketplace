import { useAppDispatch, useAppSelector } from '@/store';
// import { getTrimmedAddress } from '@/utils/formatHelper';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { LoginModal } from '../Auth/LoginModal';
import Button from '../Shared/Button';
import DropdownMenu from '../Shared/DropdownMenu';
import { OAuthContext } from '@/contexts/OAuthProvider';

const CatheonConnectButton = () => {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const router = useRouter();
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const oAuthCtx = useContext(OAuthContext);

  const handleConnectButtonClick = async () => {
    if (oAuthCtx.authorized()) {
      setDropdown((prev) => !prev);
    } else {
      setLoginModalOpen(true);
    }
  };

  const handleDropdownClick = (val: string) => {
    setDropdown(false);
    if (val === 'Account') {
      router.push('/account');
    }
  };

  const handlecSignOut = () => {
    oAuthCtx.logout();
  };

  return oAuthCtx.access_token ? (
    <>
      <Button
        onClick={handleConnectButtonClick}
        style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
      >
        <img src="/img/cgc_icon.png" width={18} height={18} alt="catheon" />
        <span className="ml-[10px]">
          {/* {getTrimmedAddress(email, { length: 5 })} */}
          {userInfo?.id || userInfo.id !== 0 ? String(userInfo?.id) : 'Connect'}
        </span>
        <div className="ml-[10px]">
          <img
            src={
              dropdown
                ? '/img/icon_chevron_up.png'
                : '/img/icon_chevron_down.png'
            }
            alt="chevron down"
            width={12}
            height={12}
            className="transition-all"
          />
        </div>
        {dropdown && (
          <DropdownMenu
            items={[
              { text: 'cgPass', value: 'Account' },
              {
                text: (
                  <div
                    className="flex items-center"
                    onClick={() => handlecSignOut()}
                  >
                    <div className="mr-[12px]">Sign Out</div>
                    <img
                      src="/img/icon_sign_out.svg"
                      width={12}
                      height={12}
                      alt="signout"
                      className="mt-[2px]"
                    />
                  </div>
                ),
                value: 'Logout',
              },
            ]}
            onItemClick={(val) => handleDropdownClick(val)}
            width={200}
            right={0}
          />
        )}
      </Button>
    </>
  ) : (
    <>
      <Button
        onClick={handleConnectButtonClick}
        style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
      >
        <img src="/img/cgc_icon.png" width={18} height={18} alt="catheon" />
        <span className="ml-[10px]">Connect</span>
      </Button>
      <LoginModal isOpen={loginModalOpen} setIsOpen={setLoginModalOpen} />
    </>
  );
};

export default CatheonConnectButton;
