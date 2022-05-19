import Divider from '../Shared/Divider';

interface Props {
  image: string;
  name: string;
  brand: string;
  price: string | number;
  id: string | number;
  isAddedToCart: boolean;
  onAddToCart: (id: string | number) => void | Promise<void>;
}

const RowCard = ({
  image,
  name,
  brand,
  price,
  id,
  isAddedToCart,
  onAddToCart,
}: Props) => {
  return (
    <div className="rounded-[5px] w-[364px] bg-[#13002B] border-[1px] border-solid border-[#290030]">
      <div>
        <img src={image} alt={name} width={364} height={364} />
      </div>
      <div className="mt-[12px] px-[12px]">
        <div className="flex justify-between items-end">
          <div className="text-[#FFFFFF] text-semibold text-[24px]">{name}</div>
          <div className="font-light text-[#9497AA] text-[14px]">Price</div>
        </div>
        <div className="flex justify-between items-center mt-[-12px]">
          <div className="font-light text-[#9497AA] text-[14px]">{brand}</div>
          <div className="font-semibold text-[#FFFFFF] text-[24px] mt-[12px] flex items-center">
            <div>{price}</div>
            <div className="mt-[6px] ml-[4px]">
              <img
                src={'/img/icon_unit_sol.png'}
                alt={'sol'}
                width={16}
                height={16}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[12px]">
        <Divider />
      </div>
      <div className="flex">
        <div className="flex items-center justify-center cursor-pointer px-[18px] py-[18px] rounded-bl-[5px] text-[#9497AA] text-[14px]">
          {/* <img
            src={'/img/icon_detail.png'}
            alt={'detail'}
            width={16}
            height={16}
          /> */}
          More Info
        </div>
        {!isAddedToCart && (
          <div
            style={{ flexBasis: '70%' }}
            className="flex items-center justify-center cursor-pointer px-[18px] py-[18px] border-l-[1px] border-l-[#290030] rounded-br-[5px]"
          >
            <div>
              <img
                src={'/img/icon_plus.png'}
                alt={'plus'}
                width={16}
                height={16}
              />
            </div>
            <div
              className="ml-[8px] text-[#9497AA] text-[14px]"
              onClick={() => onAddToCart(id)}
            >
              Add To Cart
            </div>
          </div>
        )}
        {isAddedToCart && (
          <div
            className="flex items-center justify-center cursor-default px-[18px] py-[18px] text-[#FFFFFF] rounded-br-[5px]"
            style={{
              background: 'linear-gradient(180deg, #F41786 0%, #A713ED 100%)',
              flexBasis: '70%',
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
