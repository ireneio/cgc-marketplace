import { useState } from 'react';
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
  addToCartDisabled?: boolean;
  external_marketplace_listing_logo?: string;
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
  addToCartDisabled,
  tokenAddress,
  addBtnText,
  removeBtnText,
  external_marketplace_listing_logo,
}: Props) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showExternalLogo, setShowExternalLogo] = useState(true);

  const handleImageLoad = (e: any, image: string) => {
    e.target.classList.remove('blur');
    e.target.classList.remove('force_card_height');
    e.target.src =
      image === 'undefined' || !image ? '/img/cgc_icon.png' : image;
    e.target.style.width = '100%';
    e.target.style.height = 'auto';
    setImageLoaded(true);
  };

  const handleImageError = (e: any) => {
    if (e.target.src === '/img/spinner.svg') {
      return;
    }
    e.target.src = '/img/spinner.svg';
    setImageLoaded(true);
  };

  return (
    <div
      className="relative cursor-pointer rounded-[5px] w-full bg-[#13002B] border-[2px] border-solid border-[#290030] mx-auto"
      style={{ borderColor: isAddedToCart ? '#F41786' : '#290030' }}
      onClick={() => onMoreInfo(id)}
    >
      {imageLoaded && external_marketplace_listing_logo && showExternalLogo && (
        <div
          aria-label="external marketplace logo"
          className="absolute z-[2] top-[8px] left-[8px] w-[24px] h-[24px] rounded-[50%] bg-[#3C3C3C]"
        >
          <img
            src={external_marketplace_listing_logo}
            className="rounded-[50%] w-[24px] h-auto object-cover"
            alt=""
            onError={() => setShowExternalLogo(false)}
          />
        </div>
      )}
      <div className="w-inherit bg-contain bg-center bg-no-repeat h-auto min-h-[170px]">
        {!imageLoaded && (
          <div className="w-full flex justify-center items-center h-[170px]">
            <img src="/img/spinner.svg" alt="spinner" />
          </div>
        )}
        <img
          src={'/img/spinner.svg'}
          alt={name}
          height={150}
          onError={(e) => handleImageError(e)}
          className="blur rounded-t-[5px] w-full h-auto force_card_height"
          onLoad={(e) => handleImageLoad(e, image)}
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
        {addToCartDisabled && (
          <div
            className="cursor-not-allowed text-[12px] flex items-center justify-center px-[18px] py-[18px] text-[#FFFFFF] rounded-br-[5px]"
            style={{
              background: 'linear-gradient(180deg, #F41786 0%, #A713ED 100%)',
              flexBasis: '70%',
              opacity: 0.5,
            }}
          >
            Not Listed
          </div>
        )}
        {(!isAddedToCart || addToCartLoading) && !addToCartDisabled && (
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
            <div className="ml-[8px] text-[#FFFFFF] text-[12px]">
              {addToCartLoading && <Skeleton className="w-[64px] h-[14px]" />}
              {!addToCartLoading && addBtnText ? addBtnText : 'Add To Cart'}
            </div>
          </div>
        )}
        {isAddedToCart && !addToCartLoading && !addToCartDisabled && (
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
