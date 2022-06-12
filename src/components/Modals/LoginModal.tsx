import * as React from 'react';
import { Fragment, useState, useEffect, useMemo, useContext } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useAppDispatch } from '@/store';
import { useForm, FormProvider } from 'react-hook-form';
import Login from '../Auth/Login';
// import SignupOne from '../Auth/SignupOne';
// import SignupThree from '../Auth/SignupThree';
import api from '@/utils/api';
import { OAuthContext } from '@/contexts/OAuthProvider';
import { useRouter } from 'next/router';
import SignupOneNew from '../Auth/SignUpOneNew';
import SignUpTwoNew from '../Auth/SignUpTwoNew';
import SignupTwo from '../Auth/SignupTwo';
import { useWallet } from '@solana/wallet-adapter-react';

type LoginModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  redirectPath?: string;
};

export const LoginModal = ({
  isOpen,
  setIsOpen,
  redirectPath,
}: LoginModalProps) => {
  const wallet = useWallet();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const oAuthCtx = useContext(OAuthContext);
  const [disableSignUp] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [view, setView] = useState<
    'login' | 'signup-one' | 'signup-two' | 'signup-three'
  >('login');
  const form = useForm({
    mode: 'onChange',
    defaultValues: {
      username: '',
      email: 'irene1@gmail.com',
      password: '123456',
      confirmPassword: '',
    },
  });
  const title = useMemo(() => {
    switch (view) {
      case 'login':
        return 'Sign in to your cgPass account';
      case 'signup-one':
      case 'signup-two':
        return 'Create a new cgPass Account';
      case 'signup-three':
        return 'Click the link in your email to verify';
      // return 'Set your password';
    }
  }, [view]);

  useEffect(() => {
    if (isOpen) {
      form.reset();
      setView('login');
    }
  }, [isOpen]);

  useEffect(() => {
    if (view == 'login' || view === 'signup-one') {
      form.reset();
    }
  }, [view]);

  const handleLoginButtonClick = async () => {
    if (btnLoading) return;
    setBtnLoading(true);
    const response = await api.login(
      form.getValues('email'),
      form.getValues('password'),
    );
    if (response.success) {
      oAuthCtx.successLogin(
        response?.data.access_token,
        response?.data.expired_at,
        response?.data.token_type,
      );
      dispatch({
        type: 'SHOW_SNACKBAR',
        payload: { title: 'info', text: 'Sign In Success!' },
      });
      if (redirectPath) {
        router.replace(redirectPath).then();
      }
      setBtnLoading(false);
      setIsOpen(false);
    } else {
      dispatch({
        type: 'SHOW_SNACKBAR',
        payload: { title: 'error', text: response.message },
      });
      setBtnLoading(false);
    }
    /*dispatch({ type: 'SET_USER_EMAIL', payload: form.getValues('email') });
    const tid = setTimeout(() => {
      setIsOpen(false);
      dispatch({
        type: 'SHOW_SNACKBAR',
        payload: { title: 'info', text: 'Sign In Success!' },
      });
      setBtnLoading(false);
      clearTimeout(tid);
    }, 1200);*/
  };

  const handleSignUpOne = async () => {
    setView('signup-two');
  };

  const handleSignUpTwo = async () => {
    setView('signup-three');
  };

  const register = async () => {
    const response = await api.register({
      email: form.getValues('email'),
      password: form.getValues('password'),
      walletAddress: String(wallet.publicKey),
    });
    return response;
  };

  const handleSignUpThree = async () => {
    if (disableSignUp) {
      dispatch({
        type: 'SHOW_SNACKBAR',
        payload: {
          title: 'Alert',
          text: 'Sorry, we are currently not accepting any cgPass signups.',
        },
      });
      setIsOpen(false);
    }
    setBtnLoading(true);
    const result = await register();
    if (!result.success) {
      dispatch({
        type: 'SHOW_SNACKBAR',
        payload: {
          title: 'Alert',
          text: result.message,
        },
      });
    } else {
      dispatch({
        type: 'SHOW_SNACKBAR',
        payload: {
          title: 'Info',
          text: 'Sign Up Success',
        },
      });
      setIsOpen(false);
    }
    setBtnLoading(false);
  };

  return (
    <FormProvider {...form}>
      <Transition show={isOpen}>
        <Dialog
          as="div"
          className="fixed inset-0 z-[103] overflow-y-auto font-circularstdbook"
          onClose={() => {
            setIsOpen(false);
          }}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            </Transition.Child>
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div
                className="login_dialog_parent relative inline-block my-12 overflow-hidden text-left align-middle transition-all
            transform shadow-xl rounded-[5px] bg-[#13002B] font-circularstdbook"
              >
                <div
                  className="px-[2px] py-[2px] rounded-[5px]"
                  style={{
                    background:
                      'linear-gradient(180deg, #F41786 0%, #A713ED 100%)',
                  }}
                >
                  <div className="relative flex items-center w-full justify-center bg-[#13002B]">
                    <div>
                      <Dialog.Title
                        as="h3"
                        className="text-2xl font-bold leading-6 text-white pb-2 flex flex-col items-center"
                      >
                        <div className="flex uppercase items-center w-full text-[12px] pb-[24px] cursor-pointer">
                          <div
                            className="py-0 pt-0 mt-[0px]"
                            style={{
                              flexBasis: '50%',
                              // background:
                              //   view === 'login'
                              //     ? 'linear-gradient(180deg, #F41786 0%, #A713ED 100%)'
                              //     : '#000000',
                              background:
                                'linear-gradient(180deg, #F41786 0%, #A713ED 100%)',
                              fontWeight: view === 'login' ? 'bold' : 'normal',
                              paddingBottom: view !== 'login' ? 2 : 0,
                              paddingRight: view === 'login' ? 2 : 0,
                            }}
                          >
                            <div
                              style={{
                                background:
                                  view === 'login' ? '#13002B' : '#000000',
                              }}
                              className="text-center py-[12px] font-circularstdbook"
                              onClick={() => setView('login')}
                            >
                              sign in
                            </div>
                          </div>
                          <div
                            className="py-0 mt-[0px]"
                            style={{
                              flexBasis: '50%',
                              background:
                                'linear-gradient(180deg, #F41786 0%, #A713ED 100%)',
                              fontWeight: view !== 'login' ? 'bold' : 'normal',
                              paddingBottom: view === 'login' ? 2 : 0,
                              paddingLeft: view !== 'login' ? 3 : 0,
                            }}
                          >
                            <div
                              style={{
                                background:
                                  view !== 'login' ? '#13002B' : '#000000',
                              }}
                              className="text-center py-[12px] font-circularstdbook"
                              onClick={() => setView('signup-one')}
                            >
                              register
                            </div>
                          </div>
                        </div>
                        <div>
                          <img
                            src="/img/cgc_icon.png"
                            width={48}
                            height={48}
                            alt="catheon"
                          />
                        </div>
                        <div className="text-center mt-[20px] px-[48px] max-w-[24rem] font-circularstdbook">
                          {title}
                        </div>
                      </Dialog.Title>
                      <div className="mt-0 px-[24px]">
                        <div className="min-h-full w-full flex flex-col justify-center overflow-hidden">
                          {view === 'login' && (
                            <Login
                              onCancel={() => setIsOpen(false)}
                              onLogin={() => handleLoginButtonClick()}
                              loading={btnLoading}
                            />
                          )}
                          {view === 'signup-one' && (
                            <SignupOneNew
                              onCancel={() => setIsOpen(false)}
                              onNextStep={() => handleSignUpOne()}
                            />
                          )}
                          {view === 'signup-two' && (
                            <SignUpTwoNew
                              onCancel={() => setIsOpen(false)}
                              onNextStep={() => handleSignUpTwo()}
                            />
                          )}
                          {view === 'signup-three' && (
                            <SignupTwo
                              onCancel={() => setIsOpen(false)}
                              onNextStep={() => handleSignUpThree()}
                              loading={btnLoading}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </FormProvider>
  );
};
