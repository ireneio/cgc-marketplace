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
}: Props) => {
  return (
    <li className="relative align-middle inline-block w-[380px] h-[235.42px] bg-[#181818] transition-all overflow-hidden cursor-pointer">
      <div
        className="bg-img absolute w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${bg})`,
        }}
      ></div>
      {showCatheonLogo && (
        <div
          className="absolute top-[8px] left-[8px] w-[38px] h-[38px] bg-no-repeat bg-center bg-contain"
          style={{ backgroundImage: `url(/img/cgc-logo-no-text.png)` }}
        ></div>
      )}
      <a href="#">
        <div className="content">
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
      </a>
    </li>
  );
};

export default FloatingCard;
