import Divider from '../Shared/Divider';
import Skeleton from '../Shared/Skeleton';

const PageLoading = () => {
  return (
    <div>
      <div className="mb-[12px]">
        <Skeleton className="h-[21px] w-[300px]" />
      </div>
      <div className="flex items-center mb-[28px]">
        <div className="text-[#FFFFFF] font-bold text-[20px]">
          <Skeleton className="h-[22px] w-[320px]" />
        </div>
      </div>
      <div className="mb-[28px]">
        <Divider />
      </div>
      <div className="flex flex-wrap">
        <div style={{ flexBasis: '50%' }}>
          <div>
            <Skeleton className="w-full h-[500px]" />
          </div>
          <div className="mt-[30px]">
            <Skeleton className="w-full h-[200px]" />
          </div>
        </div>
        <div style={{ flexBasis: '50%' }} className="pl-[30px]">
          <div>
            <Skeleton className="w-full h-[200px]" />
          </div>
          <div className="mt-[30px]">
            <Skeleton className="w-full h-[200px]" />
          </div>
          <div className="mt-[30px]">
            <Skeleton className="w-full h-[200px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLoading;
