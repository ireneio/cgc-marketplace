import Tag from '../Shared/Tag';

interface Props {
  text: string;
  count: number;
  countUnit?: string;
}

const ItemCountPanel = ({ text, count, countUnit }: Props) => {
  return (
    <Tag className="px-[64px] py-[28px]">
      <div className="text-[#FFFFFF]">
        <div className="flex items-center">
          <div className="text-[36px] text-center font-bold">{count}</div>
          {!!countUnit && (
            <div className="mt-[17px] ml-[4px]">
              <img src={countUnit} alt={text} width={14} height={14} />
            </div>
          )}
        </div>
        <div className="text-[14px] capitalize text-center">{text}</div>
      </div>
    </Tag>
  );
};

export default ItemCountPanel;
