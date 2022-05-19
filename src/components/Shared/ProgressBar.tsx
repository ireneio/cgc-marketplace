interface Props {
  percentage: number;
  width?: string | number;
  showIndicator?: boolean;
}

const ProgressBar = ({ percentage, width, showIndicator }: Props) => {
  return (
    <div
      className="relative rounded-[5px] border-solid border-[2px] border-[#290030] bg-[#0C001C] w-full h-[10px]"
      style={{ width: width ? width + 'px' : '100%' }}
    >
      <div
        className="absolute left-[0px] top-[0px] bg-[#FFFFFF] h-[5px] rounded-[5px]"
        style={{
          width: width ? Number(width) * (percentage / 100) + 'px' : '',
        }}
      ></div>
      {showIndicator && (
        <div
          className="absolute bottom-[-12px]"
          style={{
            left: width ? Number(width) * (percentage / 100) - 7 + 'px' : '',
          }}
        >
          <img
            src="/img/icon_triangle.png"
            alt="triangle"
            width={12}
            height={12}
          />
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
