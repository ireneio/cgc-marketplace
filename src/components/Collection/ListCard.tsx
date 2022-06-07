import Divider from '../Shared/Divider';
import Skeleton from '../Shared/Skeleton';

export interface Attr {
  image: string;
  name: string;
  brand: string;
  price: string | number;
  id: string | number;
  isAddedToCart: boolean;
  tokenAddress: string;
  addBtnText?: string;
  removeBtnText?: string;
}
interface Props extends Attr {
  onAddToCart: (params: Attr) => void | Promise<void>;
  onMoreInfo: (id: string | number) => void | Promise<void>;
  addToCartLoading: boolean;
}

const ListCard = ({
  image,
  name,
  brand,
  price,
  id,
  isAddedToCart,
  onAddToCart,
  onMoreInfo,
  addToCartLoading,
  tokenAddress,
  addBtnText,
  removeBtnText,
}: Props) => {
  const handleImageLoad = (e: any) => {
    e.target.classList.remove('blur');
    e.target.src = image === 'undefined' ? '/img/cgc_icon.png' : image;
  };

  const handleImageError = (e: any) => {
    e.target.src = '/img/cgc_icon.png';
  };

  return (
    <div
      className="cursor-pointer rounded-[5px] w-full bg-[#13002B] border-[2px] border-solid border-[#290030] mx-auto"
      style={{ borderColor: isAddedToCart ? '#F41786' : '#290030' }}
      onClick={() => onMoreInfo(id)}
    >
      <div
        className="w-inherit bg-contain bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${'/img/cgc_icon.png'})`,
        }}
      >
        <img
          src={'/img/cgc_icon.png'}
          alt={name}
          // width={205}
          // height={205}
          onError={(e) => handleImageError(e)}
          className="blur rounded-t-[5px] w-full h-auto"
          onLoad={(e) => handleImageLoad(e)}
        />
      </div>
      <div className="mt-[12px] px-[12px]">
        <div className="text-[#FFFFFF] text-[18px] text-semibold">{name}</div>
        <div className="font-light text-[#9497AA] text-[12px] mt-[-1px]">
          <div className="tracking-wider">{brand}</div>
        </div>
        <div className="flex justify-between items-center">
          <div className="font-light text-[#9497AA] text-[14px] mt-[12px]">
            Price
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
          className="hover:bg-[#290030] hover:text-[#FFFFFF] flex items-center justify-center cursor-pointer px-[18px] py-[18px] rounded-bl-[5px]"
          onClick={() => onMoreInfo(id)}
        >
          <img
            src={'/img/icon_misc.svg'}
            alt={'detail'}
            width={16}
            height={16}
          />
        </div>
        {(!isAddedToCart || addToCartLoading) && (
          <div
            style={{ flexBasis: '70%' }}
            className="hover:bg-[#290030] hover:text-[#FFFFFF] flex items-center justify-center cursor-pointer px-[18px] py-[18px] border-l-[1px] border-l-[#290030] rounded-br-[5px]"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart({
                image,
                name,
                brand,
                price,
                id,
                isAddedToCart,
                tokenAddress,
              });
            }}
          >
            {/* {!addToCartLoading && (
              <div>
                <img
                  src={'/img/icon_plus.png'}
                  alt={'plus'}
                  width={16}
                  height={16}
                />
              </div>
            )} */}
            <div className="ml-[8px] text-[#FFFFFF] text-[12px]">
              {addToCartLoading && <Skeleton className="w-[64px] h-[14px]" />}
              {!addToCartLoading && addBtnText ? addBtnText : 'Add To Cart'}
            </div>
          </div>
        )}
        {isAddedToCart && !addToCartLoading && (
          <div
            className="cursor-pointer text-[12px] flex items-center justify-center px-[18px] py-[18px] text-[#FFFFFF] rounded-br-[5px]"
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
                tokenAddress,
              });
            }}
          >
            {removeBtnText ? removeBtnText : 'Added To Cart'}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListCard;
