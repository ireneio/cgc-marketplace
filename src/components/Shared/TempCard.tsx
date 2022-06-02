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
  isMouseOver: boolean;
  onMouseLeave?: any;
}

const TempCard = ({
  coinSupply,
  isMouseOver,
  title,
  bg,
  categories,
  onPlay,
  marketCap,
  network,
  onMouseLeave,
}: Props) => {
  return (
    <div
      className="bg-[#13002B] rounded-[5px] transition-all cursor-pointer"
      onMouseLeave={() => onMouseLeave && onMouseLeave()}
    >
      {isMouseOver && (
        <div className="w-[360px] h-[385px] absolute border-[2px] border-[#FC1F8E] rounded-[5px] transition-all bg-[#13002B] overflow-hidden">
          <div className="flex items-start justify-center">
            <div
              className="w-[380px] h-[235.42px] bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${bg})`,
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
  );
};

export default TempCard;
