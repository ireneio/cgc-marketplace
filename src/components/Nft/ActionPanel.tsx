import { useCart } from '@/hooks/cart';
import { NftInfo } from '@/pages/nft/[id]';
import Button from '../Shared/Button';
import Tag from '../Shared/Tag';

const ActionPanel = ({
  info,
  onCartOpen,
  loading,
}: {
  loading: boolean;
  info: NftInfo;
  onCartOpen: (val: boolean) => void;
}) => {
  const { handleAddToCart, isItemAddedToCart } = useCart();

  const handleBuy = async () => {
    console.log('handleBuy');
  };

  return (
    <Tag className="px-[24px] py-[24px]">
      <div>
        <div className="font-light text-[#FFFFFF] text-[14px]s">
          Current Price
        </div>
        <div className="flex items-center mt-[8px]">
          <div className="text-[24px] font-semibold text-[#FFFFFF]">
            {info.price}
          </div>
          <div className="mt-[2px] ml-[6px]">
            <img
              src={'/img/icon_unit_sol.png'}
              alt={'sol'}
              width={16}
              height={16}
            />
          </div>
          <div className="ml-[8px] self-center mt-[4px] text-[#9497AA]">
            (${info.price})
          </div>
        </div>
        <div className="mt-[34px] flex items-center flex-wrap">
          {!isItemAddedToCart && (
            <Button
              onClick={() => handleBuy()}
              disabled={loading || !info.mintAddress}
            >
              Buy Now
            </Button>
          )}
          <div className={!isItemAddedToCart ? 'ml-[8px]' : ''}>
            <Button
              onClick={() =>
                handleAddToCart({
                  ...info,
                  isAddedToCart: isItemAddedToCart(info?.mintAddress),
                  tokenAddress: info.mintAddress,
                })
              }
              style={{ paddingLeft: 12, paddingRight: 12 }}
              disabled={loading || !info.mintAddress}
            >
              {isItemAddedToCart(info?.mintAddress) ? (
                'Remove From Cart'
              ) : (
                <img
                  src={'/img/icon_cart.svg'}
                  alt="cart"
                  width={21}
                  height={21}
                />
              )}
            </Button>
          </div>
          {!isItemAddedToCart && (
            <div className="ml-auto basis-[100%] lg:basis-auto mt-[12px] lg:mt-0">
              <Button
                secondary
                disabled={!info.auctionEndDate || loading || !info.mintAddress}
              >
                Make Offer
              </Button>
            </div>
          )}
        </div>
      </div>
    </Tag>
  );
};

export default ActionPanel;
