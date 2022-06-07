interface SidebarItem {
  text: string;
  value: string;
  disabled?: boolean;
  icon?: string;
}
interface Props {
  items: SidebarItem[];
  currentValue: string;
  onItemClick?: (value: string) => void | Promise<void>;
}

const Menu = ({ items, currentValue, onItemClick }: Props) => {
  return (
    <div>
      {items.map((item, index) => {
        const isSelectedParent = currentValue === item.value;
        return (
          <div
            key={index}
            className="rounded-[5px] text-[#FFFFFF] flex items-center px-[18px] py-[12px] transition-all"
            style={{
              background: isSelectedParent ? 'rgba(148, 151, 170, .15)' : '',
              color: item.disabled ? '#AAAAAA' : '#FFFFFF',
              cursor: isSelectedParent
                ? 'pointer'
                : item.disabled
                ? 'not-allowed'
                : 'pointer',
            }}
            onClick={() => {
              if (!item.disabled) {
                onItemClick && onItemClick(item.value);
              }
            }}
          >
            {item.icon && (
              <div>
                <img
                  src={item.icon}
                  alt={item.text}
                  width="14px"
                  height="14px"
                />
              </div>
            )}
            <div className="ml-[18px]">{item.text}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Menu;
