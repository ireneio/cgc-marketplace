import Skeleton from './Skeleton';

const LoadingNetflixCard = () => {
  return (
    <div className="w-[380px] h-[235.42px] relative">
      <Skeleton className="w-[380px] h-[235.42px] bg-[#290030]" />
      {/* <div
        className="absolute top-[8px] left-[8px] w-[38px] h-[38px] bg-no-repeat bg-center bg-contain"
        style={{ backgroundImage: `url(/img/cgc-logo-no-text.png)` }}
      ></div> */}
    </div>
  );
};

export default LoadingNetflixCard;
