// import CrIcon from '@/public/img/cr.svg';
import dayjs from 'dayjs';
import { getNumberWithCommas, getTrimmedAddress } from '@/utils/formatHelper';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

interface Props {
  img: string;
  title: string;
  brand: string;
  signature: string;
  time: string;
  from: string;
  amount: string;
}

const SalesCard = ({
  img,
  title,
  brand,
  signature,
  time,
  from,
  amount,
}: Props) => {
  return (
    <div className="w-[200px] shadow-lg rounded-[5px] border-solid border-[1px] border-[#FC1F8E] cursor-pointer hover:shadow-xl">
      <div
        className="w-full min-h-[200px] bg-[#181818] aspect-w-1 aspect-h-1 overflow-hidden
              group-hover:opacity-75 lg:aspect-none
              rounded-t-[5px] transition ease-in duration-200 hover:cursor-pointer"
      >
        <img
          src={img}
          alt={title}
          className="w-full h-[200px] object-center object-cover lg:w-full lg:h-full"
        />
      </div>
      <div className="px-[16px] py-[8px] bg-[#13002B]">
        <div className="text-[20px] font-bold text-[#FFFFFF]">{title}</div>
        <div className="mt-[4px] text-[#FC1F8E] text-[14px] flex justify-start">
          <div>{brand}</div>
          <div className="ml-[2px]">{/* <CrIcon /> */}</div>
        </div>
      </div>
      <div className="mt-[4px] px-[16px] py-[8px] bg-[#290030] rounded-b-[5px]">
        <div className="flex items-center">
          <div className="text-[#9497AA] text-[14px]">Signature:</div>
          <div className="ml-[6px] text-[#FC1F8E] text-[14px]">
            {getTrimmedAddress(signature, { length: 12 })}
          </div>
        </div>
        <div className="flex items-center mt-[6px]">
          <div className="text-[#9497AA] text-[14px]">Time:</div>
          <div className="ml-[6px] text-[#FFFFFF] text-[14px]">
            {dayjs(time).fromNow()}
          </div>
        </div>
        <div className="flex items-center mt-[6px]">
          <div className="text-[#9497AA] text-[14px]">From:</div>
          <div className="ml-[6px] text-[#FC1F8E] text-[14px]">
            {getTrimmedAddress(from, { length: 12 })}
          </div>
          {/* <div>
          // copy
        </div> */}
        </div>
        <div className="flex items-center mt-[6px]">
          <div className="text-[#9497AA] text-[14px]">Amount ($USD):</div>
          <div className="ml-[6px] text-[#FFFFFF] text-[14px]">
            {getNumberWithCommas(amount)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesCard;
