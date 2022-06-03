import Skeleton from '../Shared/Skeleton';

const DetailViewLoading = () => {
  return (
    <div>
      <div>
        <Skeleton className="w-full h-[90vh]" />
      </div>
      <div className="mt-[30px] flex justify-between items-center">
        <Skeleton className="w-full h-[240px]" />
        <Skeleton className="w-full h-[240px]" />
      </div>
      <div className="mt-[30px]">
        <Skeleton className="w-full h-[320px]" />
      </div>
      <div className="mt-[30px]">
        <Skeleton className="w-full h-[320px]" />
      </div>
      <div className="mt-[30px]">
        <Skeleton className="w-full h-[240px]" />
      </div>
    </div>
  );
};

export default DetailViewLoading;
