import { getNumberWithCommas } from '@/utils/formatHelper';
import Button from '../Shared/Button';
import { motion } from 'framer-motion';

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
}: Props) => {
  const handleMouseOver = () => {
    onMouseOver && onMouseOver(id);
  };

  const handleMouseOut = () => {
    onMouseLeave && onMouseLeave(id);
  };

  return (
    <div className="w-full h-[196px]">
      {currentHoverId !== id && (
        <div
          className="bg-[#290030] cursor-pointer rounded-[5px] align-middle transition-all drop-shadow-xl"
          onMouseOver={() => handleMouseOver()}
          onMouseLeave={() => handleMouseOut()}
          onClick={() => {
            onCardClick && onCardClick();
          }}
        >
          <img
            src={bg}
            alt={title}
            className="object-cover rounded-[5px] h-[196px] w-full"
          />
        </div>
      )}
      {currentHoverId === id && (
        <motion.div
          initial={{ opacity: 0, x: '10px', y: '-100px' }}
          animate={{
            opacity: 1,
            x: isFloatRight ? '0px' : '-25px',
            y: '-100px',
          }}
          className="bg-[#13002B] rounded-[5px] cursor-pointer absolute z-[100]"
          onMouseLeave={() => handleMouseOut()}
        >
          <div className="w-[370px] h-[370px] absolute border-[2px] border-[#FC1F8E] rounded-[5px] transition-all bg-[#13002B] overflow-hidden">
            <div className="relative flex items-start justify-center">
              {/* gif */}
              {/* <div
                className="w-[300px] h-[170px] bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${bgOnHover})`,
                }}
              ></div> */}
              {/* video */}
              <div className="relative w-[360px] min-h-[170px]">
                <video muted width={360} autoPlay>
                  <source src={bgOnHover} type="video/mp4" />
                </video>
                <div className="absolute bottom-[8px] left-[8px]">
                  <img src={logo} alt={''} width={100} height={100} />
                </div>
              </div>
            </div>
            <div className="bg-[#13002B] pt-[20px] pb-[24px]">
              <div className="px-[12px] py-[0px]">
                <div className="font-normal text-[#FFFFFF] text-[14px]">
                  {title.length > 75 ? title.slice(0, 75) + '...' : title}
                </div>
                <div className="w-full absolute bottom-[48px] flex justify-between items-center pr-[24px]">
                  <div
                    className="text-[#FFFFFF] text-[12px] uppercase flex items-center pr-[12px] flex-wrap"
                    style={{ flexBasis: '70%' }}
                  >
                    {categories && categories.length ? (
                      categories.map((category, index) => {
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
                      })
                    ) : (
                      <></>
                    )}
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
              <div className="grid gap-[12px] grid-cols-3 absolute bottom-[12px] left-0 right-0 w-full px-[12px] mt-[8px] mb-[-4px]">
                {network && (
                  <div className="text-[10px] flex items-center">
                    <div className="text-[#9497AA]">Network:</div>
                    <div className="text-[#FC1F8E] ml-[3px]">{network}</div>
                  </div>
                )}
                <div className="text-[10px] flex items-center">
                  <div className="text-[#9497AA]">M Cap:</div>
                  <div className="text-[#FC1F8E] ml-[3px]">
                    {getNumberWithCommas(Number(marketCap), 2)}
                  </div>
                </div>
                <div className="text-[10px] flex items-center">
                  <div className="text-[#9497AA]">C Supply:</div>
                  <div className="text-[#FC1F8E] ml-[3px]">
                    {getNumberWithCommas(Number(coinSupply), 2)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default FloatingCard;
