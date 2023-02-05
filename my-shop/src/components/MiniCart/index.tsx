import CartIcon from "../Icons/CartIcon";
import { useContext } from "react";
import useCartService from "@/service/cartService";

const MiniCart = () => {
  const { cart } = useCartService();
  const quantity = cart?.reduce((acc, cur) => {
    return acc + cur.quantity;
  }, 0);

  return (
    <div className="relative">
      <CartIcon />
      {quantity > 0 && (
        <span className="absolute top-5 -right-4 bg-white text-sm text-black px-2 py-1 rounded-full">
          {quantity}
        </span>
      )}
    </div>
  );
};

const Bagdge = () => {
  return <div>1</div>;
};

export default MiniCart;
