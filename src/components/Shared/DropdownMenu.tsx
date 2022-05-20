interface Items {
  text: string;
  value: string;
}

interface Props {
  items?: Items[];
  onItemClick?: (value: string) => void | Promise<void>;
  children?: React.ReactNode;
  bottom?: number;
  left?: number;
}

const DropdownMenu = ({
  items,
  onItemClick,
  children,
  bottom,
  left,
}: Props) => {
  return (
    <>
      {!children && (
        <div
          className="bg-[#181818] absolute bottom-[-250%] left-0 z-[3]"
          style={{ width: 'inherit' }}
        >
          {items &&
            items.map((item, index) => {
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
      )}
      <div
        className="absolute left-0 bottom-[-250%] z-[3]"
        style={{
          bottom: bottom ? bottom + 'px' : '250%',
          left: left ? left + 'px' : '0px',
        }}
      >
        {children}
      </div>
    </>
  );
};

export default DropdownMenu;
