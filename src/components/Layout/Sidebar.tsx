import { useWindowHeight, useWindowWidth } from '@/hooks/window';
import { SIDE_BAR_ITEMS } from '@/utils/cgcConsts';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
interface Props {
  onItemClick?: (value: string) => void | Promise<void>;
  rootClassName?: string;
}

const Sidebar = ({ onItemClick, rootClassName }: Props) => {
  const router = useRouter();
  const windowWidth = useWindowWidth();
  const windiwHeight = useWindowHeight();
  const [currentValue, setCurrentValue] = useState('/');

  useEffect(() => {
    setCurrentValue(router.pathname);
  }, [router.pathname]);

  return (
    <div
      className={twMerge(
        'overflow-auto px-[12px] py-[20px] bg-[#0C001C] shadow-xl hide-scrollbar relative z-[5]',
        rootClassName,
      )}
      style={{
        height:
          windowWidth < 768
            ? Number(windiwHeight)
            : Number(windiwHeight) - 120 - 366,
      }}
    >
      {SIDE_BAR_ITEMS.map((item) => {
        const isSelectedParent = currentValue === item.value;
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
                    (currentValue.split('/')[2] === child.value ||
                      (currentValue.split('/').length === 2 &&
                        child.value === '')) &&
                    isSelectedParent;
                  return (
                    <div
                      key={item.value + child.value}
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
