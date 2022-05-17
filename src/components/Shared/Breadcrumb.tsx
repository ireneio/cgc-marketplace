interface BreadcrumbItem {
  text: string;
  value: string;
  disabled?: boolean;
}
interface Props {
  items: BreadcrumbItem[];
  currentValue: string;
  onItemClick?: (value: string) => void | Promise<void>;
}

const BreadCrumb = ({ items, onItemClick, currentValue }: Props) => {
  return (
    <div className="flex items-center">
      {items.map((item, index, array) => {
        return (
          <div
            key={item.value}
            onClick={() => {
              if (!item.disabled) {
                onItemClick && onItemClick(item.value);
              }
            }}
            className="mr-[8px]"
          >
            <button
              className="font-normal text-[14px] hover:underline text-[#AAAAAA] hover:text-[#FC1F8E]"
              style={{
                cursor:
                  currentValue === item.value
                    ? 'default'
                    : item.disabled
                    ? 'not-allowed'
                    : 'pointer',
              }}
              disabled={item.disabled}
            >
              {item.text}
            </button>
            {index !== array.length - 1 && (
              <span className="ml-[8px] text-[#AAAAAA]">/</span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default BreadCrumb;
