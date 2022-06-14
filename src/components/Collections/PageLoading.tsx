import Divider from '../Shared/Divider';
import Skeleton from '../Shared/Skeleton';

const PageLoading = () => {
  return (
    <div>
      <div className="mb-[24px]">
        <Skeleton className="h-[21px] w-[300px]" />
      </div>
      <div className="flex items-center mb-[28px]">
        <div className="text-[#FFFFFF] font-bold text-[20px]">
          <Skeleton className="h-[22px] w-[320px]" />
        </div>
      </div>
      <div className="mb-[24px]">
        <Divider />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[24px]">
        <div>
          <div>
            <Skeleton className="w-full h-[500px]" />
          </div>
          <div className="mt-[24px]">
            <Skeleton className="w-full h-[200px]" />
          </div>
        </div>
        <div>
          <div>
            <Skeleton className="w-full h-[200px]" />
          </div>
          <div className="mt-[24px]">
            <Skeleton className="w-full h-[200px]" />
          </div>
          <div className="mt-[24px]">
            <Skeleton className="w-full h-[200px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLoading;
