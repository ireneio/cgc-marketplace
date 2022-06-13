import Skeleton from '../Shared/Skeleton';

const DetailViewLoading = () => {
  return (
    <div>
      <div>
        <Skeleton className="w-full h-[50vh] lg:h-[70vh] bg-[#290030]" />
      </div>
      <div className="mt-[24px] grid grid-cols-1 lg:grid-cols-2 gap-[24px]">
        <Skeleton className="w-full h-[240px] bg-[#290030]" />
        <Skeleton className="w-full h-[240px] bg-[#290030]" />
      </div>
      <div className="mt-[24px]">
        <Skeleton className="w-full h-[320px] bg-[#290030]" />
      </div>
      <div className="mt-[24px]">
        <Skeleton className="w-full h-[320px] bg-[#290030]" />
      </div>
      <div className="mt-[24px]">
        <Skeleton className="w-full h-[240px] bg-[#290030]" />
      </div>
    </div>
  );
};

export default DetailViewLoading;
