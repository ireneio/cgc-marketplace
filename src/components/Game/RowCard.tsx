import Divider from '../Shared/Divider';
import Skeleton from '../Shared/Skeleton';

export interface Attr {
  image: string;
  name: string;
  brand: string;
  price: string | number;
  id: string | number;
  isAddedToCart: boolean;
}
interface Props extends Attr {
  onAddToCart: (params: Attr) => void | Promise<void>;
  onMoreInfo: (id: string | number) => void | Promise<void>;
  addToCartLoading: boolean;
}

const RowCard = ({
  image,
  name,
  brand,
  price,
  id,
  isAddedToCart,
  onAddToCart,
  onMoreInfo,
  addToCartLoading,
}: Props) => {
  return (
    <div
      className="rounded-[5px] xl:w-[340px] w-[300px] bg-[#13002B] border-[2px] border-solid border-[#290030] mx-auto"
      style={{ borderColor: isAddedToCart ? '#F41786' : '#290030' }}
      onClick={() => onMoreInfo(id)}
    >
      <div>
        <img
          src={image}
          alt={name}
          className="w-[300px] h-[300px] xl:w-[340px] xl:h-[340px]"
        />
      </div>
      <div className="mt-[12px] px-[12px]">
        <div className="flex justify-between items-start">
          <div className="text-[#FFFFFF] text-semibold text-[24px]">{name}</div>
          <div className="font-light text-[#9497AA] text-[14px] mt-[3px]">
            Price
          </div>
        </div>
        <div className="flex justify-between items-end mt-[-18px]">
          <div className="font-light text-[#9497AA] text-[14px] tracking-wider mb-[6px]">
            {brand}
          </div>
          <div className="font-semibold text-[#FFFFFF] text-[24px] mt-[12px] flex items-center">
            <div className="mt-[4px] mr-[4px]">
              <img
                src={'/img/icon_unit_sol.png'}
                alt={'sol'}
                width={12}
                height={12}
              />
            </div>
            <div>{price}</div>
          </div>
        </div>
      </div>
      <div className="mt-[12px]">
        <Divider />
      </div>
      <div className="flex">
        <div
          style={{ flexBasis: '30%' }}
          className="hover:bg-[#290030] hover:text-[#FFFFFF] flex items-center justify-center cursor-pointer px-[18px] py-[18px] rounded-bl-[5px] text-[#9497AA] text-[14px]"
          onClick={() => onMoreInfo(id)}
        >
          {/* <img
            src={'/img/icon_detail.png'}
            alt={'detail'}
            width={16}
            height={16}
          /> */}
          More Info
        </div>
        {(!isAddedToCart || addToCartLoading) && (
          <div
            style={{ flexBasis: '70%' }}
            className="hover:bg-[#290030] hover:text-[#FFFFFF] flex items-center justify-center cursor-pointer px-[18px] py-[18px] border-l-[1px] border-l-[#290030] rounded-br-[5px]"
          >
            {!addToCartLoading && (
              <div>
                <img
                  src={'/img/icon_plus.png'}
                  alt={'plus'}
                  width={16}
                  height={16}
                />
              </div>
            )}
            <div
              className="ml-[8px] text-[#9497AA] text-[14px]"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart({
                  image,
                  name,
                  brand,
                  price,
                  id,
                  isAddedToCart,
                });
              }}
            >
              {addToCartLoading && <Skeleton className="w-[64px] h-[14px]" />}
              {!addToCartLoading && 'Add To Cart'}
            </div>
          </div>
        )}
        {isAddedToCart && !addToCartLoading && (
          <div
            className="text-[14px] flex items-center justify-center cursor-default px-[18px] py-[18px] text-[#FFFFFF] rounded-br-[5px]"
            style={{
              background: 'linear-gradient(180deg, #F41786 0%, #A713ED 100%)',
              flexBasis: '70%',
            }}
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart({
                image,
                name,
                brand,
                price,
                id,
                isAddedToCart,
              });
            }}
          >
            Added To Cart
          </div>
        )}
      </div>
    </div>
  );
};

export default RowCard;
