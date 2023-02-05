import { useRouter } from "next/router";
import { mockData } from "@/MockData";
import { Carousel } from "react-responsive-carousel";
import { useState, useContext } from "react";
import MinusIcon from "@/components/Icons/Minus";
import PlusIcon from "@/components/Icons/PlusIcon";
import useCartService from "@/service/cartService";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import useProductDetail from "@/service/productDetailService";
import _isEmpty from "lodash/isEmpty";
import { Button } from "antd";

const ProductDatail = () => {
  const router = useRouter();
  const id = router.query.id;
  // const item = mockData.results.find((item) => item.articles[0].code === id);
  const { item, loading, error } = useProductDetail(id);
  const { addToCart, cart, removeItemFromCart } = useCartService();
  const [quantity, setQuantity] = useState(1);

  const _onAddTocart = () => {
    addToCart({
      id,
      price: item?.whitePrice?.price,
      name: item?.name,
      quantity,
    });
  };

  if (loading || error) {
    return <></>;
  }
  return (
    <div className="flex">
      <div className="basis-1/2">
        {/* <Carousel autoPlay>
          {item?.galleryImages.map((img: any, index: number) => {
            return (
              <div key={`${item.name}-img-${index}`}>
                <img
                  style={{ width: "300px", height: "auto" }}
                  src={img.baseUrl}
                />
              </div>
            );
          })}
        </Carousel> */}
      </div>
      <div className="basis-1/2 p-5">
        <h2 className="text-2xl font-bold mt-8">{item?.name}</h2>
        <p className="text-lg font-medium mt-2">$ {item?.whitePrice?.price}</p>

        <div className="flex my-6">
          <button
            className="border border-2 border-gray-200 h-[30px] p-1 text-center"
            disabled={quantity === 1 || quantity === 0}
            onClick={() => setQuantity((prevQty) => prevQty - 1)}
          >
            <MinusIcon />
          </button>
          <input
            style={{
              width: "60px",
              height: "30px",
              textAlign: "center",
              padding: "5px",
            }}
            type="text"
            pattern="\d*"
            value={quantity}
            onChange={(e) =>
              setQuantity(Number(e.target.value.replace(/\D/g, "")))
            }
          ></input>
          <button
            className="border border-2 border-gray-200 h-[30px] p-1 "
            onClick={() => setQuantity((prevQty) => prevQty + 1)}
          >
            <PlusIcon />
          </button>
        </div>
        {/* <button
          // style={{ border: " dashed", height: "30px" }}
          onClick={_onAddTocart}
          className="my-6 border border-2 border-gray-200 h-[30px] p-1 flex items-center"
        >
          Add to cart
        </button> */}
        <Button className="my-6 h-[30px]" onClick={_onAddTocart}>
          Add to cart
        </Button>
        <div className="pb-6">{item?.description}</div>

        <Cart cart={cart} />
      </div>
    </div>
  );
};

export default ProductDatail;

const Cart = ({ cart }: any) => {
  const subtotal = Math.floor(
    cart?.reduce((curr: number, prev: any) => {
      return curr + prev.price * prev.quantity;
    }, 0)
  );
  return (
    <>
      <div className="w-[600px] h-[400px] shadow-xl flex flex-col p-3">
        <div className="h-[400px] overflow-y-auto">
          {cart?.map((item: any, index: number) => {
            return <CartItem key={`cart-item-${index}`} cartItem={item} />;
          })}
        </div>
        {!_isEmpty(cart) ? (
          <div className="text-gray-700 font-medium text-end m-2">
            Total: $ {subtotal}
          </div>
        ) : null}
      </div>
    </>
  );
};

const CartItem = ({ cartItem }: any) => {
  const { name, quantity, price, id } = cartItem;
  const { removeItemFromCart, addItemQuantity, decreaseItemQuantity } =
    useCartService();

  return (
    <div className="flex items-center justify-between p-2">
      <div className="flex items-center">
        <div className="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
        <div>
          <div className="text-gray-700 font-medium">{name}</div>
          <div className="text-gray-700 font-medium">$ {price}</div>
        </div>
      </div>
      <div className="text-gray-700 font-medium my-2">
        <div className="flex items-center">
          <button
            className="my-6 border border-2 border-gray-200 h-[30px] p-1 text-center"
            onClick={() => decreaseItemQuantity(id)}
          >
            <MinusIcon />
          </button>
          <input
            style={{
              margin: "0px 5px",
              width: "60px",
              height: "30px",
              textAlign: "center",
              padding: "5px",
            }}
            type="text"
            pattern="\d*"
            value={+quantity}
            readOnly
          ></input>
          <button
            className="my-6 border border-2 border-gray-200 h-[30px] p-1 text-center"
            onClick={() => addItemQuantity(id)}
          >
            <PlusIcon />
          </button>
          <button className="ml-4" onClick={() => removeItemFromCart(id)}>
            x
          </button>
        </div>
      </div>
      {/* <div className="text-gray-700 font-medium">
        Total Quantity: totalQuantity
      </div>
      <div className="text-gray-700 font-medium">Total Price: totalPrice</div> */}
    </div>
  );
};
