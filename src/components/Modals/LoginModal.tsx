import * as React from 'react';
import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import consoleHelper from '@/utils/consoleHelper';
import Button from '../Shared/Button';
import { useAppDispatch } from '@/store';

type LoginModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LoginModal = ({ isOpen, setIsOpen }: LoginModalProps) => {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState(``);
  const [password, setPassword] = useState(``);
  const [disableSignUp] = useState(true);

  const handleLoginButtonClick = async (): Promise<boolean | undefined> => {
    if (username && password) {
      consoleHelper(`to implement: ${username.trim()} ${password.trim()}`);
      dispatch({ type: 'SET_USER_EMAIL', payload: username });
      return true;
    } else {
      return false;
    }
  };

  const handleCreateAccount = () => {
    if (disableSignUp) {
      dispatch({
        type: 'SHOW_SNACKBAR',
        payload: {
          title: 'Alert',
          text: 'Sorry, we are currently not accepting any cgPass signups.',
        },
      });
    }
  };

  return (
    <Transition show={isOpen}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
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
              className="inline-block w-full max-w-xl p-9 my-12 overflow-hidden text-left align-middle transition-all
            transform shadow-xl rounded-2xl bg-[#2c2c2c]"
            >
              <Dialog.Title
                as="h3"
                className="text-2xl font-bold leading-6 text-white pb-2 font-circularstdbold flex flex-col items-center"
              >
                <div>
                  <img
                    src="/img/cgc-logo-no-text.png"
                    width={48}
                    height={48}
                    alt="catheon"
                  />
                </div>
                <div className="text-center mt-[12px]">
                  Sign in to your cgPass account
                </div>
                <div className="text-[14px] text-[#AAAAAA] mt-[6px]">
                  <span>New Here? </span>
                  <span
                    className="text-[#FC1F8E] cursor-pointer hover:underline"
                    onClick={() => handleCreateAccount()}
                  >
                    Create An Account
                  </span>
                </div>
              </Dialog.Title>
              <div className="mt-0">
                <div className="min-h-full w-full flex flex-col justify-center">
                  <div className="bg-[#2c2c2c] py-8">
                    <div className="space-y-6">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-white font-circularstdbook"
                        >
                          Email Address
                        </label>
                        <div className="mt-1">
                          <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            onChange={(e) => setUsername(e.target.value)}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md
                            shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500
                            focus:border-indigo-500 sm:text-sm font-circularstdbook"
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium font-circularstdbook text-white"
                        >
                          Password
                        </label>
                        <div className="mt-1">
                          <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md
                            shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500
                            focus:border-indigo-500 sm:text-sm font-circularstdbook"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-3 flex justify-end">
                <Button
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <div className="ml-[12px]">
                  <Button
                    onClick={async () => {
                      handleLoginButtonClick().then((outcome) => {
                        if (outcome) {
                          setIsOpen(false);
                        }
                      });
                    }}
                  >
                    Login
                  </Button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
