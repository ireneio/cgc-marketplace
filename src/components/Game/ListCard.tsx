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

const ListCard = ({
  image,
  name,
  brand,
  price,
  id,
  isAddedToCart,
  onAddToCart,
}: Props) => {
  return (
    <div className="rounded-[5px] w-[205px] bg-[#13002B] border-[1px] border-solid border-[#290030]">
      <div>
        <img src={image} alt={name} width={205} height={205} />
      </div>
      <div className="mt-[12px] px-[12px]">
        <div className="text-[#FFFFFF] text-semibold">{name}</div>
        <div className="font-light text-[#9497AA] text-[14px] mt-[12px]">
          {brand}
        </div>
        <div className="font-light text-[#9497AA] text-[14px] mt-[12px]">
          Price
        </div>
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
      <div className="mt-[12px]">
        <Divider />
      </div>
      <div className="flex">
        <div
          style={{ flexBasis: '30%' }}
          className="flex items-center justify-center cursor-pointer px-[18px] py-[18px] rounded-bl-[5px]"
        >
          <img
            src={'/img/icon_detail.png'}
            alt={'detail'}
            width={16}
            height={16}
          />
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

export default ListCard;
