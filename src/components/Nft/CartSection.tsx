import { useAppSelector } from '@/store';
import Cart from '../Collection/Cart';
import Button from '../Shared/Button';
import DropdownMenu from '../Shared/DropdownMenu';

const CartSection = ({
  openCart,
  onToggleCart,
  disabled,
}: {
  openCart: boolean;
  onToggleCart: (val: boolean) => void;
  disabled?: boolean;
}) => {
  const cartItems = useAppSelector((state) => state.cart.cartItems);

  return (
    <div className="relative">
      {openCart && (
        <DropdownMenu bottom={-505} left={-235}>
          <Cart onClose={() => onToggleCart(false)} />
        </DropdownMenu>
      )}
      <Button onClick={() => onToggleCart(!openCart)} disabled={disabled}>
        <div className="flex items-center">
          <div>
            <img src={'/img/icon_cart.svg'} alt="cart" width={12} height={12} />
          </div>
          <div className="text-[#FFFFFF] ml-[4px] text-[12px] flex items-center">
            <div>Cart</div>
            <div
              className="ml-[4px] text-[#FFFFFF]"
              // style={{
              //   background: 'linear-gradient(180deg, #F41786 0%, #A713ED 100%)',
              //   backgroundClip: 'text',
              //   WebkitBackgroundClip: 'text',
              //   WebkitTextFillColor: 'transparent',
              // }}
            >
              [{cartItems.length}]
            </div>
          </div>
        </div>
      </Button>
    </div>
  );
};

export default CartSection;
