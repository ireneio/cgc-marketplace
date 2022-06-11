import * as React from 'react';
import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import consoleHelper from '@/utils/consoleHelper';

type LoginModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const RegisterModal = ({ isOpen, setIsOpen }: LoginModalProps) => {
  const [username, setUsername] = useState(``);
  const [password, setPassword] = useState(``);

  const handleRegisterButtonClick = async (): Promise<boolean | undefined> => {
    if (username && password) {
      consoleHelper(`to implement: ${username.trim()} ${password.trim()}`);
      return true;
    } else {
      return false;
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
            transform bg-white shadow-xl rounded-2xl bg-[#2c2c2c]"
            >
              <Dialog.Title
                as="h3"
                className="text-2xl font-bold leading-6 text-white pb-2 font-circularstdbold"
              >
                Sign up for a Catheon account
              </Dialog.Title>
              <div className="mt-2">
                <div className="min-h-full w-full flex flex-col justify-center">
                  <div className="bg-[#2c2c2c] py-8">
                    <div className="space-y-6">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-white rcularstdbook"
                        >
                          Email
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
                          className="block text-sm font-medium text-white font-circularstdbook text-white"
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
                <div>
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 justify-center border border-transparent text-base
                              font-bold rounded-md mr-3 text-white bg-gray-500 hover:bg-gray-400 md:py-4 md:text-lg md:px-10 font-circularstdbold"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 justify-center border border-transparent text-base
                              font-bold rounded-md text-white bg-purple-700 hover:bg-purple-400 md:py-4 md:text-lg md:px-10 font-circularstdbold"
                    onClick={async () => {
                      handleRegisterButtonClick().then((outcome) => {
                        if (outcome) {
                          setIsOpen(false);
                        }
                      });
                    }}
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};