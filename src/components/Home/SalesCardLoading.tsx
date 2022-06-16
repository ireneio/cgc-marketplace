import Skeleton from '../Shared/Skeleton';

const SalesCardLoading = () => {
  return (
    <div className="w-[200px] shadow-md shadow-black rounded-[5px] bg-[#290030] border-solid border-[#290030] border-[1px] hover:shadow-xl">
      <div
        className="cursor-pointer w-full min-h-[200px] aspect-w-1 aspect-h-1 overflow-hidden
              group-hover:opacity-75 lg:aspect-none
              rounded-t-[5px] transition ease-in duration-200 hover:cursor-pointer"
      >
        <Skeleton className="h-[200px] w-full" />
      </div>
      <div className="px-[16px] py-[8px] bg-[#13002B]">
        <div className="text-[20px] font-bold text-[#FFFFFF] single_line_ellipsis">
          <Skeleton className="h-[34px] w-[160px]" />
        </div>
        <div className="mt-[4px] font-light text-[#9497AA] text-[12px] flex justify-start single_line_ellipsis">
          <div>
            <Skeleton className="h-[28px] w-[100px]" />
          </div>
        </div>
      </div>
      <div className="mt-[4px] px-[16px] py-[8px] bg-[#290030] rounded-b-[5px]">
        <div className="flex items-center justify-between">
          <Skeleton className="h-[18px] w-[160px]" />
        </div>
        <div className="flex items-center mt-[6px] justify-between">
          <Skeleton className="h-[18px] w-[160px]" />
        </div>
        <div className="flex items-center mt-[6px] justify-between">
          <Skeleton className="h-[18px] w-[160px]" />
        </div>
        <div className="flex items-center mt-[6px] justify-between">
          <Skeleton className="h-[18px] w-[160px]" />
        </div>
        <div className="flex items-center mt-[6px] justify-between">
          <Skeleton className="h-[18px] w-[160px]" />
        </div>
      </div>
    </div>
  );
};

export default SalesCardLoading;
