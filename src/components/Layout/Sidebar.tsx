interface SidebarItem {
  text: string;
  value: string;
  disabled?: boolean;
  icon?: string;
  children?: SidebarItem[];
}
interface Props {
  items: SidebarItem[];
  currentValue: string;
  onItemClick?: (value: string) => void | Promise<void>;
}

const Sidebar = ({ items, currentValue, onItemClick }: Props) => {
  return (
    <div
      className="fixed top-[75px] left-0 h-[70vh] overflow-auto px-[25px] py-[20px] bg-[#13002B] shadow-xl"
      id="sidebar"
    >
      {items.map((item) => {
        const isSelectedParent = currentValue.split('/')[0] === item.value;
        return (
          <div
            key={item.value}
            className="relative mb-[8px]"
            onClick={() => {
              if (!item.disabled) {
                const child =
                  !item.children || !item.children.length
                    ? item.value + '/'
                    : item.value + '/' + item.children[0].value;
                onItemClick && onItemClick(child);
              }
            }}
          >
            <div
              className="rounded-[5px] text-[#FFFFFF] flex items-center px-[18px] py-[8px] transition-all"
              style={{
                background: isSelectedParent ? 'rgba(148, 151, 170, .15)' : '',
                color: item.disabled ? '#AAAAAA' : '#FFFFFF',
                cursor: isSelectedParent
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
            {isSelectedParent && (
              <div className="px-[42px]">
                {item.children?.map((child) => {
                  const isSelectedChild =
                    currentValue.split('/')[1] === child.value;
                  return (
                    <div
                      key={child.value}
                      className="flex items-center transition-all"
                      style={{
                        cursor: isSelectedChild
                          ? 'default'
                          : child.disabled
                          ? 'not-allowed'
                          : 'pointer',
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!child.disabled) {
                          onItemClick &&
                            onItemClick(item.value + '/' + child.value);
                        }
                      }}
                    >
                      {/* TODO icon */}
                      <div></div>
                      <div
                        style={{
                          color: isSelectedChild ? '#FC1F8E' : '#9497AA',
                        }}
                      >
                        {child.text}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
