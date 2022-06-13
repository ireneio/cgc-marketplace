import { useRouter } from 'next/router';

interface BreadcrumbItem {
  text: string;
  value: string;
  disabled?: boolean;
  route?: string;
}
interface Props {
  items: BreadcrumbItem[];
  onItemClick?: (value: string) => void | Promise<void>;
}

const Breadcrumb = ({ items, onItemClick }: Props) => {
  const router = useRouter();

  const handleSideBarPathUpdate = (val: string) => {
    router.push(val);
  };

  return (
    <div className="flex items-center">
      {items &&
        items.map((item, index, array) => {
          return (
            <div
              key={index}
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
                  textDecoration:
                    index === array.length - 1 ? 'none' : 'underline',
                  color: index !== array.length - 1 ? '#FC1F8E' : '#AAAAAA',
                  cursor: item.disabled
                    ? 'not-allowed'
                    : index !== array.length - 1
                    ? 'pointer'
                    : 'default',
                }}
                disabled={item.disabled}
                onClick={() => {
                  if (!item.disabled && index !== array.length - 1) {
                    handleSideBarPathUpdate(item.value);
                  }
                }}
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

export default Breadcrumb;
