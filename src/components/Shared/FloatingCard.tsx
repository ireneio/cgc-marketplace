import { getNumberWithCommas } from '@/utils/formatters';
import { useEffect, useState } from 'react';
import Button from './Button';
import Chip from './Chip';

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
  onFirstItemMouseOver?: (val: boolean) => void;
  onCardClick?: () => Promise<void> | void;
  onMouseOver?: any;
}

const FloatingCard = ({
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
  onCardClick,
  onMouseOver,
}: Props) => {
  const [isMouseOver, setIsMouseOver] = useState(false);

  const handleMouseOver = () => {
    setIsMouseOver(true);
    onMouseOver && onMouseOver();
  };

  const handleMouseOut = () => {
    setIsMouseOver(false);
    // onMouseLeave && onMouseLeave();
  };

  return (
    <div>
      {!isMouseOver && (
        <li
          className="absolute bg-[#290030] cursor-pointer rounded-[5px] align-middle w-[300px] h-[235.42px] transition-all drop-shadow-xl"
          onMouseOver={() => handleMouseOver()}
          onMouseLeave={() => handleMouseOut()}
          style={{
            zIndex: isMouseOver ? 3 : 1,
          }}
          onClick={() => {
            onCardClick && onCardClick();
          }}
        >
          <div
            className="absolute top-0 left-0 w-[300px] h-[235.42px] bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${bg})`,
            }}
          ></div>
          {showCatheonLogo && !isMouseOver && (
            <div
              className="absolute top-[32px] left-[8px] w-[38px] h-[38px] bg-no-repeat bg-center bg-contain"
              style={{ backgroundImage: `url(/img/cgc-logo-no-text.png)` }}
            ></div>
          )}
        </li>
      )}
      {isMouseOver && (
        <div
          className="bg-[#13002B] rounded-[5px] transition-all cursor-pointer relative z-[100] translate-y-[-50px] duration-700"
          onMouseLeave={() => handleMouseOut()}
        >
          {isMouseOver && (
            <div className="w-[320px] h-[420px] absolute border-[2px] border-[#FC1F8E] rounded-[5px] transition-all bg-[#13002B] overflow-hidden">
              <div className="flex items-start justify-center">
                <div
                  className="w-[380px] h-[235.42px] bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url(${bgOnHover})`,
                  }}
                ></div>
              </div>
              <div className="bg-[#13002B] pt-[12px] pb-[24px]">
                <div className="px-[12px] py-[0px]">
                  <div className="font-normal text-[#FFFFFF] text-[10px]">
                    {title}
                  </div>
                  <div className="mt-[12px] flex justify-between items-center">
                    <div
                      className="text-[#FFFFFF] text-[12px] uppercase flex items-center"
                      style={{ flexBasis: '80%' }}
                    >
                      {categories.map((category, index) => {
                        return (
                          <div key={index} className="text-[10px]">
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
                        // disabled={playDisabled}
                        style={{ padding: '8px 24px', fontSize: 10 }}
                      >
                        Play
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-[32px] mt-[12px] h-[2px] w-full bg-[#290030]"></div>
                <div className="absolute bottom-[12px] left-0 right-0 w-full px-[12px] mt-[8px] mb-[-4px] flex justify-between">
                  <div className="text-[10px] flex items-center">
                    <div className="text-[#9497AA]">Network:</div>
                    <div className="text-[#FC1F8E] ml-[3px]">{network}</div>
                  </div>
                  <div className="text-[10px] flex items-center">
                    <div className="text-[#9497AA]">M Cap:</div>
                    <div className="text-[#FC1F8E] ml-[3px]">
                      {getNumberWithCommas(marketCap)}
                    </div>
                  </div>
                  <div className="text-[10px] flex items-center">
                    <div className="text-[#9497AA]">C Supply:</div>
                    <div className="text-[#FC1F8E] ml-[3px]">
                      {getNumberWithCommas(coinSupply)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FloatingCard;
