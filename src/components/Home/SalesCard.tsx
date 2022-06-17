// import CrIcon from '@/public/img/cr.svg';
import dayjs from 'dayjs';
import {
  getNumberWithCommas,
  getTrimmedAddressEllipsisMiddle,
} from '@/utils/formatHelper';
import relativeTime from 'dayjs/plugin/relativeTime';
import ClipboardText from '../Shared/ClipboardText';

dayjs.extend(relativeTime);

interface Props {
  img: string;
  title: string;
  brand: string;
  signature: string;
  time: string;
  from: string;
  to: string;
  tokenAddress: string;
  amount: string;
}

const SalesCard = ({
  img,
  title,
  brand,
  signature,
  time,
  from,
  to,
  tokenAddress,
  amount,
}: Props) => {
  const handleCardClick = () => {
    // TODO
    console.log('handleCardClick');
  };

  const handleGoExplorer = (hash: string, type: 'tx' | 'account' | 'token') => {
    if (type === 'tx') {
      window.open(`https://solscan.io/tx/${hash}`, '_blank');
    } else if (type === 'account') {
      window.open(`https://solscan.io/account/${hash}`, '_blank');
    } else if (type === 'token') {
      window.open(`https://solscan.io/token/${hash}`, '_blank');
    }
  };

  return (
    <div className="w-[200px] shadow-md shadow-black rounded-[5px] bg-[#290030] border-solid border-[#290030] border-[1px] hover:shadow-xl">
      <div
        onClick={() => handleCardClick()}
        className="cursor-pointer w-full min-h-[200px] aspect-w-1 aspect-h-1 overflow-hidden
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
        <div className="text-[20px] font-bold text-[#FFFFFF] single_line_ellipsis">
          {title || '...'}
        </div>
        <div className="mt-[4px] font-light text-[#9497AA] text-[12px] flex justify-start single_line_ellipsis">
          <div>{brand || '-'}</div>
          <div className="ml-[2px]">{/* <CrIcon /> */}</div>
        </div>
      </div>
      <div className="mt-[4px] px-[16px] py-[8px] bg-[#290030] rounded-b-[5px]">
        <div className="flex items-center justify-between">
          <div className="text-[#9497AA] text-[14px]">Address</div>
          <ClipboardText copyValue={tokenAddress}>
            <div
              className="ml-[6px] text-[#FC1F8E] text-[14px]"
              onClick={() => handleGoExplorer(tokenAddress, 'token')}
            >
              {getTrimmedAddressEllipsisMiddle(tokenAddress, { length: 4 })}
            </div>
          </ClipboardText>
        </div>
        <div className="flex items-center mt-[6px] justify-between">
          <div className="text-[#9497AA] text-[14px]">Signature</div>
          <ClipboardText copyValue={signature}>
            <div
              className="ml-[6px] text-[#FC1F8E] text-[14px]"
              onClick={() => handleGoExplorer(signature, 'tx')}
            >
              {getTrimmedAddressEllipsisMiddle(signature, { length: 4 })}
            </div>
          </ClipboardText>
        </div>
        <div className="flex items-center mt-[6px] justify-between">
          <div className="text-[#9497AA] text-[14px]">Time</div>
          <div className="ml-[6px] text-[#FFFFFF] text-[14px]">
            {dayjs(Number(time) * 1000).fromNow()}
          </div>
        </div>
        <div className="flex items-center mt-[6px] justify-between">
          <div className="text-[#9497AA] text-[14px]">From</div>
          <ClipboardText copyValue={from}>
            <div
              className="ml-[6px] text-[#FC1F8E] text-[14px]"
              onClick={(e) => {
                e.stopPropagation();
                handleGoExplorer(signature, 'account');
              }}
            >
              {getTrimmedAddressEllipsisMiddle(from, { length: 6 })}
            </div>
          </ClipboardText>
        </div>
        <div className="flex items-center mt-[6px] justify-between">
          <div className="text-[#9497AA] text-[14px]">To</div>
          <ClipboardText copyValue={to}>
            <div
              className="ml-[6px] text-[#FC1F8E] text-[14px]"
              onClick={(e) => {
                e.stopPropagation();
                handleGoExplorer(signature, 'account');
              }}
            >
              {getTrimmedAddressEllipsisMiddle(to, { length: 6 })}
            </div>
          </ClipboardText>
        </div>
        <div className="flex items-center mt-[6px] justify-between">
          <div className="text-[#9497AA] text-[14px]">Amount ($USD)</div>
          <div className="ml-[6px] text-[#FFFFFF] text-[14px]">
            {amount || amount === '0' ? getNumberWithCommas(amount, 2) : '-'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesCard;
