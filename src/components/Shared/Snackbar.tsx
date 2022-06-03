import React, { useMemo } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { useAppDispatch } from '@/store';

const root = document.querySelector('#snackbar-root') as Element;
const Snackbar = ({
  show,
  text,
  title,
}: {
  show: boolean;
  text: string;
  title: string;
}) => {
  const dispatch = useAppDispatch();

  const elem = useMemo(() => {
    if (show) {
      return (
        <motion.div
          className="fixed top-[30px] left-[50%] z-[100]"
          animate={{ y: 0 }}
          initial={{ y: -1000, x: '-50%' }}
        >
          <div className="bg-transparent text-center py-4 lg:px-4">
            <div
              style={{
                background: 'linear-gradient(180deg, #F41786 0%, #A713ED 100%)',
              }}
              className="px-[1px] py-[1px] flex items-center justify-center lg:rounded-full"
            >
              <div
                className="p-2 bg-[#13002B] items-center text-[#FFFFFF] leading-none lg:rounded-full flex lg:inline-flex shadow-lg"
                role="alert"
              >
                <span className="flex rounded-full bg-[#290030] uppercase px-2 py-1 text-xs font-bold mr-3">
                  {title}
                </span>
                <span className="font-semibold mr-2 text-left flex-auto">
                  {text}
                </span>
                <div
                  className="cursor-pointer mt-[0px]"
                  onClick={() => dispatch({ type: 'CLOSE_SNACKBAR' })}
                >
                  <img
                    src="/img/icon_purple_rounded_close.png"
                    alt="close"
                    width={16}
                    height={16}
                  />
                </div>
                {/* <svg
                    className="fill-current opacity-75 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
                  </svg> */}
              </div>
            </div>
          </div>
        </motion.div>
      );
    }
    return <></>;
  }, [show, text, title]);

  return createPortal(elem, root);
};

export default Snackbar;
