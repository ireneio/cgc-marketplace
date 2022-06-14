import { getNumberWithCommas } from '@/utils/formatHelper';
import Button from '../Shared/Button';
import { motion } from 'framer-motion';
import { useWindowWidth } from '@/hooks/window';

interface Props {
  bg: string;
  bgOnHover?: string;
  showCatheonLogo?: boolean;
  title: string;
  categories: string[];
  network: string;
  marketCap?: string;
  coinSupply?: string;
  onPlay?: any;
  playDisabled?: boolean;
  onFirstItemMouseOver?: (val: boolean) => void;
  onCardClick?: () => Promise<void> | void;
  onMouseOver?: any;
  onMouseLeave?: any;
  id?: string;
  currentHoverId?: string;
  logo?: string;
  isFloatRight?: boolean;
  isDefaultFloating?: boolean;
}

const FloatingCard = ({
  currentHoverId,
  id,
  bg,
  bgOnHover,
  title,
  categories,
  network,
  marketCap,
  coinSupply,
  onPlay,
  // playDisabled,
  onCardClick,
  onMouseOver,
  onMouseLeave,
  logo,
  isFloatRight,
  isDefaultFloating,
}: Props) => {
  const windowWidth = useWindowWidth();

  const handleMouseOver = () => {
    if (windowWidth > 768) {
      onMouseOver && onMouseOver(id);
    }
  };

  const handleMouseOut = () => {
    if (windowWidth > 768) {
      onMouseLeave && onMouseLeave(id);
    }
  };

  return (
    <div
      className="w-full"
      style={{
        height: isDefaultFloating ? 390 : 'auto',
        // width: isDefaultFloating ? 390 : 196,
      }}
    >
      {currentHoverId !== id && !isDefaultFloating && (
        <div
          className="cursor-pointer rounded-[5px] align-middle transition-all drop-shadow-xl relative z-[1]"
          onMouseOver={() => handleMouseOver()}
          onMouseLeave={() => handleMouseOut()}
          onClick={() => {
            onCardClick && onCardClick();
          }}
        >
          <img
            src={bg}
            alt={title}
            className="object-cover rounded-[5px] h-[25vh] w-full"
          />
        </div>
      )}
      {(currentHoverId === id || isDefaultFloating) && (
        <motion.div
          initial={{
            opacity: 0,
            x: isDefaultFloating ? 0 : '10px',
            y: isDefaultFloating ? 0 : '-105px',
            zIndex: 100,
          }}
          animate={{
            opacity: 1,
            x: isDefaultFloating ? 0 : isFloatRight ? '0px' : '-25px',
            y: isDefaultFloating ? 0 : '-105px',
            zIndex: 100,
          }}
          className="bg-[#13002B] rounded-[5px] cursor-pointer absolute"
          onMouseLeave={() => handleMouseOut()}
          style={{ position: isDefaultFloating ? 'static' : 'absolute' }}
        >
          <div
            style={{
              width: isDefaultFloating ? 'auto' : '55vh',
              height: isDefaultFloating ? 'auto' : '50vh',
            }}
            className="absolute border-[2px] border-[#FC1F8E] rounded-[5px] transition-all bg-[#13002B] overflow-hidden"
          >
            <div className="relative flex items-start justify-center h-[25vh]">
              {/* gif */}
              {/* <div
                className="w-[300px] h-[170px] bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${bgOnHover})`,
                }}
              ></div> */}
              {/* video */}
              <div
                className="relative"
                style={{
                  width: isDefaultFloating ? '90vw' : '55vh',
                  height: isDefaultFloating ? 199 : '25vh',
                }}
              >
                <video muted autoPlay>
                  <source src={bgOnHover} type="video/mp4" />
                </video>
              </div>
            </div>
            <div
              className="bg-[#13002B] pt-[20px] pb-[24px] h-[45%] relative"
              style={{ height: isDefaultFloating ? 170 : '' }}
            >
              <div className="absolute top-[-42px] pl-[12px]">
                <img src={logo} alt={''} width={100} height={100} />
              </div>
              <div className="px-[12px] py-[0px] h-[97%] relative">
                <div className="font-normal text-[#FFFFFF] text-[14px] 2xl:text-[24px]">
                  {title?.length > 75 ? title?.slice(0, 75) + '...' : title}
                </div>
                <div className="absolute bottom-[24px] w-full flex justify-between items-center pr-[24px] mt-[24px]">
                  <div className="text-[#FFFFFF] text-[12px] flex items-center pr-[12px] flex-wrap basis-[70%]">
                    {categories && categories.length ? (
                      categories.map((category, index) => {
                        return (
                          <div
                            key={index}
                            className="text-[12px] flex items-center 2xl:text-[22px]"
                          >
                            {String(category).toLowerCase()}
                            {index !== categories.length - 1 && (
                              <span className="ml-[4px] mr-[4px] text-[#aaa] text-[12px]">
                                •
                              </span>
                            )}
                          </div>
                        );
                      })
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="flex-shrink-0">
                    <Button
                      onClick={() => onPlay()}
                      style={{ padding: '8px 24px', fontSize: 10 }}
                    >
                      Play
                    </Button>
                  </div>
                </div>
              </div>
              <div className="bottom-[32px] mt-[12px] h-[2px] w-full bg-[#290030]"></div>
              <div className="grid gap-[12px] grid-cols-3 w-full px-[12px] mt-[12px] mb-[-4px]">
                {network && (
                  <div className="text-[10px] flex items-center">
                    <div className="text-[#9497AA]">Network:</div>
                    <div className="text-[#FC1F8E] ml-[3px]">{network}</div>
                  </div>
                )}
                {marketCap !== null && (
                  <div className="text-[10px] flex items-center">
                    <div className="text-[#9497AA]">M Cap:</div>
                    <div className="text-[#FC1F8E] ml-[3px]">
                      {getNumberWithCommas(Number(marketCap), 2)}
                    </div>
                  </div>
                )}
                {coinSupply !== null && (
                  <div className="text-[10px] flex items-center">
                    <div className="text-[#9497AA]">C Supply:</div>
                    <div className="text-[#FC1F8E] ml-[3px]">
                      {getNumberWithCommas(Number(coinSupply), 2)}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default FloatingCard;
