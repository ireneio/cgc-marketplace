interface SelectGroupItem {
  text: string | React.ReactNode;
  value: string;
  disabled?: boolean;
}
interface Props {
  items: SelectGroupItem[];
  currentValue?: string;
  onItemClick?: (value: string) => void | Promise<void>;
}

const SelectGroup = ({ items, currentValue, onItemClick }: Props) => {
  return (
    <div className="flex items-stretch">
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
                height: '100%',
                borderTopLeftRadius: index === 0 ? '4px' : 0,
                borderBottomLeftRadius: index === 0 ? '4px' : 0,
                borderTopRightRadius: index === items.length - 1 ? '4px' : 0,
                borderBottomRightRadius: index === items.length - 1 ? '4px' : 0,
                background: item.disabled
                  ? '#181818'
                  : currentValue === item.value
                  ? 'linear-gradient(180deg, #F41786 0%, #A713ED 100%)'
                  : '#13002B',
                cursor: item.disabled
                  ? 'not-allowed'
                  : currentValue === item.value
                  ? 'default'
                  : 'pointer',
                color: currentValue === item.value ? '#FFFFFF' : '#9497AA',
                fontWeight: currentValue === item.value ? 'semibold' : 'normal',
              }}
              disabled={item.disabled}
              className="text-[#FFFFFF] border-solid border-[1px] border-[#290030] px-[12px] py-[6px] disabled:bg-[#181818] disabled:text-[#AAA] text-[14px]"
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
