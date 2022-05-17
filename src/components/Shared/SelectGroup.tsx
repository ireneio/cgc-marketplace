interface SelectGroupItem {
  text: string;
  value: string;
  disabled?: boolean;
}
interface Props {
  items: SelectGroupItem[];
  currentValue: string;
  onItemClick?: (value: string) => void | Promise<void>;
}

const SelectGroup = ({ items, currentValue, onItemClick }: Props) => {
  return (
    <div className="flex">
      {items.map((item, index) => {
        return (
          <div
            key={index}
            onClick={() => {
              if (!item.disabled) {
                onItemClick && onItemClick(item.value);
              }
            }}
          >
            <button
              style={{
                borderTopLeftRadius: index === 0 ? '4px' : 0,
                borderBottomLeftRadius: index === 0 ? '4px' : 0,
                borderTopRightRadius: index === items.length - 1 ? '4px' : 0,
                borderBottomRightRadius: index === items.length - 1 ? '4px' : 0,
                backgroundColor: item.disabled
                  ? '#181818'
                  : currentValue === item.value
                  ? '#FC1F8E'
                  : '#13002B',
                cursor: item.disabled
                  ? 'not-allowed'
                  : currentValue === item.value
                  ? 'default'
                  : 'pointer',
              }}
              disabled={item.disabled}
              className="text-[#FFFFFF] border-solid border-[1px] border-[#FC1F8E] px-[16px] py-[8px] disabled:bg-[#181818] disabled:text-[#AAA]"
            >
              {item.text}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default SelectGroup;
