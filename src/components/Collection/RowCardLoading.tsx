import Divider from '../Shared/Divider';
import Skeleton from '../Shared/Skeleton';

const RowCardLoading = () => {
  return (
    <div className="rounded-[5px] w-full bg-[#13002B] border-[1px] border-solid border-[#290030]">
      <div>
        <Skeleton className="w-full h-[320px]" />
      </div>
      <div className="mt-[12px] px-[12px]">
        <div className="flex justify-between items-end">
          <div className="text-[#FFFFFF] text-semibold text-[24px]">
            <Skeleton className="w-[120px] h-[20px]" />
          </div>
          <div className="font-light text-[#9497AA] text-[14px]">
            <Skeleton className="w-[32px] h-[12px]" />
          </div>
        </div>
        <div className="flex justify-between items-center mt-[4px]">
          <div className="font-light text-[#9497AA] text-[14px]">
            <Skeleton className="w-[140px] h-[12px]" />
          </div>
          <div className="font-semibold text-[#FFFFFF] text-[24px] mt-[10px] flex items-center">
            <div>
              <Skeleton className="w-[120px] h-[16px]" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[12px]">
        <Divider />
      </div>
      <div className="flex">
        <div
          style={{ flexBasis: '30%' }}
          className="flex items-center justify-center cursor-pointer px-[18px] py-[18px] rounded-bl-[5px] text-[#9497AA] text-[14px]"
        >
          <Skeleton className="w-[32px] h-[14px]" />
        </div>
        <div
          className="flex items-center justify-center cursor-default px-[18px] py-[18px] text-[#FFFFFF] rounded-br-[5px]"
          style={{
            background: 'linear-gradient(180deg, #F41786 0%, #A713ED 100%)',
            flexBasis: '70%',
          }}
        >
          <Skeleton className="w-[32px] h-[14px]" />
        </div>
      </div>
    </div>
  );
};

export default RowCardLoading;
