import Tag from '../Shared/Tag';

interface Props {
  text: string;
  count: number | string;
  countUnit?: string;
}

const ItemCountPanel = ({ text, count, countUnit }: Props) => {
  return (
    <Tag className="md:px-[64px] md:py-[28px] px-[16px] py-[16px]">
      <div className="text-[#FFFFFF]">
        <div className="flex items-center w-full justify-center">
          <div className="text-[36px] text-center font-bold w-full flex justify-center">
            {count}
          </div>
          {!!countUnit && (
            <div className="mt-[12px] ml-[4px]">
              <img src={countUnit} alt={text} width={14} height={14} />
            </div>
          )}
        </div>
        <div className="text-[14px] capitalize text-center w-full">{text}</div>
      </div>
    </Tag>
  );
};

export default ItemCountPanel;
