import { getNumberWithCommas } from '@/utils/formatters';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Button from './Button';

interface Props {
  bg: string;
  bgOnHover?: string;
  showCatheonLogo?: boolean;
  title: string;
  categories: string[];
  network: string;
  marketCap: string;
  coinSupply: string;
  onPlay?: any;
  playDisabled?: boolean;
}

type ViewMode = `default` | `enlarged`;

const DURATION_TRANSITION = 0.5;

const DURATION_DELAY = 0.3;

const NetflixCard = ({
  bg,
  showCatheonLogo = true,
  bgOnHover,
  title,
  categories,
  network,
  marketCap,
  coinSupply,
  onPlay,
  playDisabled,
}: Props) => {
  const [viewMode, setViewMode] = useState<ViewMode>('default');
  const [tid, setTid] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    const _tid = setTimeout(() => {
      setViewMode(`enlarged`);
      clearTimeout(_tid);
    }, DURATION_TRANSITION * 1000);
    setTid(_tid);
  };

  const handleMouseLeave = () => {
    if (tid) {
      clearTimeout(tid);
    }
    setViewMode(`default`);
  };

  return (
    <motion.div
      className="w-[380px] h-[235.42px] relative shadow-lg"
      onMouseEnter={() => handleMouseEnter()}
      onMouseLeave={() => handleMouseLeave()}
      whileHover={{
        scale: 1.2,
        transition: { duration: DURATION_TRANSITION, delay: DURATION_DELAY },
        y: -50,
      }}
    >
      {viewMode === 'default' && (
        <>
          {/* <div
            className="w-full h-full bg-no-repeat bg-center bg-contain rounded-[4px] cursor-pointer"
            style={{ backgroundImage: `url(${bg})` }}
          ></div> */}
          <div
            className="w-full min-h-[200px] bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden
              group-hover:opacity-75 lg:aspect-none
              hover:cursor-pointer"
          >
            <img
              src={bg}
              alt={title}
              className="w-full h-[200px] object-center object-cover lg:w-full lg:h-full"
            />
          </div>
          {showCatheonLogo && (
            <div
              className="absolute top-[8px] left-[8px] w-[38px] h-[38px] bg-no-repeat bg-center bg-contain"
              style={{ backgroundImage: `url(/img/cgc-logo-no-text.png)` }}
            ></div>
          )}
        </>
      )}
      {viewMode === 'enlarged' && (
        <div className="border-solid border-[2px] border-[#FC1F8E] rounded-[4px] bg-[#13002B] absolute z-[4]">
          <div
            className="h-[235.42px] w-full bg-no-repeat bg-center bg-cover"
            style={{ backgroundImage: `url(${bgOnHover || bg})` }}
          ></div>
          <div className="px-[12px] py-[12px]">
            <div className="font-bold text-[#FFFFFF] text-[18px]">{title}</div>
            <div className="mt-[12px] flex justify-between">
              <div
                className="text-[#FFFFFF] text-[12px] uppercase flex items-center"
                style={{ flexBasis: '80%' }}
              >
                {categories.map((category, index) => {
                  return (
                    <div key={index}>
                      {category}
                      {index !== categories.length - 1 && (
                        <span className="ml-[2px] mr-[2px]">•</span>
                      )}
                    </div>
                  );
                })}
              </div>
              <div>
                <Button
                  className="capitalize"
                  onClick={() => onPlay()}
                  disabled={playDisabled}
                >
                  play
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-[8px] h-[2px] w-full bg-[#290030]"></div>
          <div className="px-[12px] mt-[16px] mb-[16px] flex justify-between">
            <div className="text-[12px] flex items-center">
              <div className="text-[#9497AA]">Network:</div>
              <div className="text-[#FC1F8E] ml-[3px]">{network}</div>
            </div>
            <div className="text-[12px] flex items-center">
              <div className="text-[#9497AA]">M Cap:</div>
              <div className="text-[#FC1F8E] ml-[3px]">
                {getNumberWithCommas(marketCap)}
              </div>
            </div>
            <div className="text-[12px] flex items-center">
              <div className="text-[#9497AA]">C Supply:</div>
              <div className="text-[#FC1F8E] ml-[3px]">
                {getNumberWithCommas(coinSupply)}
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default NetflixCard;
