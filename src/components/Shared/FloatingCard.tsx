import { getNumberWithCommas } from '@/utils/formatters';
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
  onFirstItemMouseOver?: (val: boolean) => void;
  onCardClick?: () => Promise<void> | void;
  onMouseOver?: any;
  onMouseLeave?: any;
  id: string;
  currentHoverId: string;
}

const FloatingCard = ({
  currentHoverId,
  id,
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
  onMouseLeave,
}: Props) => {
  const handleMouseOver = () => {
    onMouseOver && onMouseOver(id);
  };

  const handleMouseOut = () => {
    onMouseLeave && onMouseLeave(id);
  };

  return (
    <div>
      {currentHoverId !== id && (
        <li
          className="absolute bg-[#290030] cursor-pointer rounded-[5px] align-middle h-[117.66px] w-[212.94px] transition-all drop-shadow-xl"
          onMouseOver={() => handleMouseOver()}
          onMouseLeave={() => handleMouseOut()}
          onClick={() => {
            onCardClick && onCardClick();
          }}
        >
          <div
            className="absolute top-0 left-0 h-[117.66px] w-[212.94px] bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${bg})`,
            }}
          ></div>
          {showCatheonLogo && (
            <div
              className="absolute top-[14px] left-[8px] w-[38px] h-[38px] bg-no-repeat bg-center bg-contain"
              style={{ backgroundImage: `url(/img/cgc-logo-no-text.png)` }}
            ></div>
          )}
        </li>
      )}
      {currentHoverId === id && (
        <div
          className="bg-[#13002B] rounded-[5px] transition-all cursor-pointer relative z-[100] translate-y-[-100px] duration-700"
          onMouseLeave={() => handleMouseOut()}
        >
          <div className="w-[300px] h-[340px] absolute border-[2px] border-[#FC1F8E] rounded-[5px] transition-all bg-[#13002B] overflow-hidden">
            <div className="flex items-start justify-center">
              <div
                className="w-[300px] h-[170px] bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${bgOnHover})`,
                }}
              ></div>
            </div>
            <div className="bg-[#13002B] pt-[12px] pb-[24px]">
              <div className="px-[12px] py-[0px]">
                <div className="font-normal text-[#FFFFFF] text-[14px]">
                  {title.length > 75 ? title.slice(0, 75) + '...' : title}
                </div>
                <div className="w-full absolute bottom-[54px] flex justify-between items-center pr-[24px]">
                  <div
                    className="text-[#FFFFFF] text-[12px] uppercase flex items-center pr-[12px] flex-wrap"
                    style={{ flexBasis: '70%' }}
                  >
                    {categories.map((category, index) => {
                      return (
                        <div
                          key={index}
                          className="text-[12px] flex items-center"
                        >
                          {category}
                          {index !== categories.length - 1 && (
                            <span className="ml-[4px] mr-[4px] text-[#aaa] text-[12px]">
                              •
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex-shrink-0">
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
              <div className="absolute bottom-[12px] left-0 right-0 w-full px-[12px] mt-[8px] mb-[-4px] flex">
                <div className="text-[10px] flex items-center">
                  <div className="text-[#9497AA]">Network:</div>
                  <div className="text-[#FC1F8E] ml-[3px]">{network}</div>
                </div>
                <div className="text-[10px] flex items-center ml-[12px]">
                  <div className="text-[#9497AA]">M Cap:</div>
                  <div className="text-[#FC1F8E] ml-[3px]">
                    {getNumberWithCommas(marketCap)}
                  </div>
                </div>
                {/* <div className="text-[10px] flex items-center">
                  <div className="text-[#9497AA]">C Supply:</div>
                  <div className="text-[#FC1F8E] ml-[3px]">
                    {getNumberWithCommas(coinSupply)}
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingCard;
