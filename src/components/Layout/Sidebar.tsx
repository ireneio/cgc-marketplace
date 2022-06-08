import { useAppSelector } from '@/store';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

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
  const [innerHeight, setInnerHeight] = useState<string | number>(0);
  const router = useRouter();
  const sidebarPath = useAppSelector((state) => state.layout.navigation.path);

  useEffect(() => {
    if (window) {
      // const height = Math.max(document.body.getBoundingClientRect().height, 0);
      const height =
        window.document.documentElement.scrollHeight -
        window.document.documentElement.clientHeight;

      if (sidebarPath === 'Home') {
        setInnerHeight(height);
        // setInnerHeight('70vh');
      } else {
        setInnerHeight(window.document.documentElement.clientHeight);
      }
    }
  }, [router.pathname, sidebarPath]);

  return (
    <div
      className="overflow-auto px-[12px] py-[20px] bg-[#0C001C] shadow-xl hide-scrollbar relative z-[5]"
      style={{ height: Number(innerHeight) - 120 - 75 }}
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
                    ? item.value
                    : item.value + '/' + item.children[0].value;
                onItemClick && onItemClick(child);
              }
            }}
          >
            <div
              className="rounded-[5px] text-[#9497AA] flex items-center px-[18px] py-[8px] transition-all text-[16px]"
              style={{
                background: isSelectedParent ? 'rgba(148, 151, 170, .15)' : '',
                color: item.disabled ? '#AAAAAA' : '#FFFFFF',
                cursor: isSelectedParent
                  ? 'pointer'
                  : item.disabled
                  ? 'not-allowed'
                  : 'pointer',
              }}
            >
              <div>
                <img
                  src={item.icon}
                  alt={item.text}
                  width="14px"
                  height="14px"
                />
              </div>
              <div className="ml-[18px]">{item.text}</div>
            </div>
            {isSelectedParent && (
              <div className="px-[38px]">
                {item.children?.map((child) => {
                  const isSelectedChild =
                    currentValue.split('/')[1] === child.value;
                  return (
                    <div
                      key={child.value}
                      className="flex items-center transition-all py-[6px]"
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
