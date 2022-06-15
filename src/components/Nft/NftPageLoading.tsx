import Divider from '../Shared/Divider';
import Skeleton from '../Shared/Skeleton';

const NftPageLoading = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-[24px] pt-[12px]">
      <div className="flex items-center justify-between col-span-2">
        <div className="flex items-center">
          <div className="cursor-pointer">
            <img
              src={'/img/icon_refresh.svg'}
              alt="refresh"
              width={14}
              height={14}
            />
          </div>
          <div className="ml-[8px] text-[#FFFFFF] text-[14px]">1 Item</div>
        </div>
        <div>
          <Skeleton className="h-[34px] w-[100px] bg-[#290030]" />
        </div>
      </div>
      <div className="flex flex-wrap justify-between col-span-2">
        <div className="basis-[100%] lg:basis-[48%]">
          <div className="w-full mb-[24px]">
            <Skeleton className="h-[50vh] w-full bg-[#290030]" />
          </div>
          <div className="mb-[24px] lg:mb-0">
            <Skeleton className="h-[200px] w-full bg-[#290030]" />
          </div>
        </div>
        <div className="basis-[100%] lg:basis-[48%]">
          <div className="mb-[24px]">
            <Skeleton className="h-[200px] w-full bg-[#290030]" />
          </div>
          <div className="mb-[24px]">
            <Skeleton className="h-[200px] w-full bg-[#290030]" />
          </div>
          <div className="mb-[0px]">
            <Skeleton className="h-[200px] w-full bg-[#290030]" />
          </div>
        </div>
      </div>
      <div className="mb-[24px] col-span-2">
        <Divider />
      </div>
      <div className="col-span-2">
        <div className="mb-[24px] flex justify-between items-center flex-wrap">
          <div className="text-[#FFFFFF] font-bold text-[20px]">
            <Skeleton className="h-[20px] w-full bg-[#290030]" />
          </div>
        </div>
        <div className="mb-[48px]">
          <Skeleton className="h-[200px] w-full bg-[#290030]" />
        </div>
      </div>
    </div>
  );
};

export default NftPageLoading;
