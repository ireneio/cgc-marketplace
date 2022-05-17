interface SidebarItem {
  text: string;
  value: string;
  disabled?: boolean;
  icon: string;
}
interface Props {
  items: SidebarItem[];
  currentValue: string;
  onItemClick?: (value: string) => void | Promise<void>;
}

const Sidebar = ({ items, currentValue, onItemClick }: Props) => {
  return (
    <div className="fixed top-[75px] left-0 h-[70vh] overflow-auto px-[25px] py-[20px] bg-[#13002B] shadow-xl">
      {items.map((item) => {
        return (
          <div
            key={item.value}
            className="mb-[8px]"
            onClick={() => {
              if (!item.disabled) {
                onItemClick && onItemClick(item.value);
              }
            }}
          >
            <div
              className="rounded-[5px] text-[#FFFFFF] flex items-center px-[18px] py-[8px]"
              style={{
                background:
                  currentValue === item.value ? 'rgba(148, 151, 170, .15)' : '',
                cursor:
                  currentValue === item.value
                    ? 'default'
                    : item.disabled
                    ? 'not-allowed'
                    : 'pointer',
              }}
            >
              {/* TODO add icon */}
              <div></div>
              <div className="ml-[18px]">{item.text}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
