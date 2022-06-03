import { getTrimmedAddressEllipsisMiddle } from '@/utils/formatHelper';
import ReactTooltip from 'react-tooltip';

interface Props {
  providerIcon: string;
  provider: string;
  address: string;
  onEditClick: () => Promise<void> | void;
}
const WalletCard = ({
  providerIcon,
  provider,
  address,
  onEditClick,
}: Props) => {
  return (
    <div className="rounded-[5px] border-[#290030] border-[1px] px-[14px] py-[14px] flex">
      <ReactTooltip />
      <div>
        <img src={providerIcon} alt={provider} width={25} height={25} />
      </div>
      <div className="ml-[18px]">
        <div className="text-[#FFFFFF] font-normal text-[16px]">{provider}</div>
        <div className="text-[#9497AA] font-normal text-[14px] mt-[2px]">
          {getTrimmedAddressEllipsisMiddle(address)}
        </div>
      </div>
      <div className="ml-[100px] relative">
        <div
          className="mt-[6px] absolute right-[0] top-[0] cursor-pointer"
          onClick={() => onEditClick()}
          data-tip="Disconnect"
        >
          <img src="/img/icon_edit.png" alt="edit" width={14} height={14} />
        </div>
        <div className="flex text-[#9497AA] items-center mt-[29px] text-[12px]">
          <div>Connected</div>
          <div className="w-[12px] h-[12px] rounded-[50%]  bg-[#3FFF8C] ml-[4px]"></div>
        </div>
      </div>
    </div>
  );
};

export default WalletCard;
