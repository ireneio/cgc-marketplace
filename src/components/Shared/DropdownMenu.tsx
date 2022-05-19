interface Items {
  text: string;
  value: string;
}

interface Props {
  items: Items[];
  onItemClick?: (value: string) => void | Promise<void>;
}

const DropdownMenu = ({ items, onItemClick }: Props) => {
  return (
    <div
      className="bg-[#181818] absolute bottom-[-250%] left-0"
      style={{ width: 'inherit' }}
    >
      {items.map((item, index) => {
        return (
          <div
            key={index}
            className="px-[16px] py-[12px]"
            onClick={(e) => {
              e.stopPropagation();
              onItemClick && onItemClick(item.value);
            }}
          >
            {item.text}
          </div>
        );
      })}
    </div>
  );
};

export default DropdownMenu;
