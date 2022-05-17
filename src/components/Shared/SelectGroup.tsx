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
                backgroundColor:
                  currentValue === item.value ? '#FC1F8E' : '#13002B',
                cursor: item.disabled
                  ? 'not-allowed'
                  : currentValue === item.value
                  ? 'default'
                  : 'pointer',
              }}
              className="border-solid border-[1px] border-[#FC1F8E] px-[16px] py-[8px]"
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
