import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';

const AppDialog = ({
  isOpen,
  setIsOpen,
  title,
  content,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title?: React.ReactNode;
  content: React.ReactNode;
}) => {
  return (
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
              className="relative inline-block my-12 overflow-hidden text-left align-middle transition-all
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
                    {title ? (
                      <Dialog.Title
                        as="h3"
                        className="text-2xl font-bold leading-6 text-white pb-2 flex flex-col items-center"
                      >
                        {title}
                      </Dialog.Title>
                    ) : (
                      <></>
                    )}
                    <div className="mt-0 px-[24px]">
                      <div className="min-h-full w-full flex flex-col justify-center overflow-hidden">
                        {content}
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
  );
};

export default AppDialog;
