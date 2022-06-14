import { useMemo } from 'react';

interface Items {
  text: string | React.ReactNode;
  value: string;
}

interface Props {
  items?: Items[];
  onItemClick?: (value: string) => void | Promise<void>;
  children?: React.ReactNode;
  bottom?: number;
  left?: number | boolean;
  right?: number;
  width?: number;
  // right?: number;
}

const DropdownMenu = ({
  items,
  onItemClick,
  children,
  bottom,
  right,
  left,
  width,
}: Props) => {
  const style = useMemo(() => {
    if ((right || Number(right) === 0) && right !== undefined) {
      return {
        background: 'linear-gradient(180deg, #F41786 0%, #A713ED 100%)',
        width: width ? width : 'inherit',
        bottom: bottom ? bottom + 'px' : '-265%',
        right:
          (right || Number(right) === 0) && right !== undefined
            ? Number(right) + 'px'
            : '',
      };
    }
    return {
      background: 'linear-gradient(180deg, #F41786 0%, #A713ED 100%)',
      width: width ? width : 'inherit',
      bottom: bottom ? bottom + 'px' : '-265%',
      left:
        left || (Number(left) === 0 && left !== undefined)
          ? Number(left) + 'px'
          : '0px',
    };
  }, [left, right]);

  return (
    <>
      {!children && (
        <div
          style={style}
          className="absolute bottom-[-265%] px-[2px] py-[2px] rounded-[5px] flex items-center justify-center z-[102]"
        >
          <div
            className="bg-[#181818]"
            style={{ width: width ? width : 'inherit' }}
          >
            {items &&
              items.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="px-[16px] py-[12px] mx-[4px] text-left"
                    onClick={(e) => {
                      e.stopPropagation();
                      onItemClick && onItemClick(item?.value || '');
                    }}
                    style={{
                      borderBottom:
                        index !== items.length - 1 ? '1px solid grey' : '',
                    }}
                  >
                    {item?.text || ''}
                  </div>
                );
              })}
          </div>
        </div>
      )}
      <div
        className="absolute z-[3]"
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
