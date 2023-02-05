import { useRouter } from "next/router";
import { mockData } from "@/MockData";
import { Carousel } from "react-responsive-carousel";
import { useState, useContext } from "react";
import MinusIcon from "@/components/Icons/Minus";
import PlusIcon from "@/components/Icons/PlusIcon";
import useCartService from "@/service/cartService";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ProductDatail = () => {
  const router = useRouter();
  const id = router.query.id;
  const item = mockData.results.find((item) => item.articles[0].code === id);
  const { addToCart, cart, removeItemFromCart } = useCartService();
  const [quantity, setQuantity] = useState(1);

  const _onAddTocart = () => {
    addToCart({
      id,
      price: item?.price.value,
      name: item?.name,
      iamge_url: item?.images[0].url,
      quantity,
    });
  };
  return (
    <div className="flex">
      <div className="basis-1/2">
        <Carousel autoPlay>
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
        </Carousel>
      </div>
      <div className="basis-1/2">
        <h2 className="text-2xl font-bold mt-8">{item?.name}</h2>
        <p className="text-lg font-medium mt-2">{item?.price.formattedValue}</p>

        <div className="flex">
          <button
            style={{ border: "black solid", height: "30px" }}
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
            style={{ border: "black solid", height: "30px" }}
            onClick={() => setQuantity((prevQty) => prevQty + 1)}
          >
            <PlusIcon />
          </button>
        </div>
        <button
          style={{ border: " dashed", height: "30px" }}
          onClick={_onAddTocart}
          className="mb-6"
        >
          Add to cart
        </button>

        <Cart cart={cart} />
        {/* <div>{item?.description}</div> */}
      </div>
    </div>
  );
};

export default ProductDatail;

const Cart = ({ cart }: any) => {
  return (
    <>
      <div className="w-[600px] min-h-[400px] border-4 border-indigo-500/100 flex flex-col">
        {cart?.map((item: any, index: number) => {
          return <CartItem key={`cart-item-${index}`} cartItem={item} />;
        })}
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
        <div className="text-gray-700 font-medium">{name}</div>
      </div>
      <div className="text-gray-700 font-medium">{price}</div>
      <div className="text-gray-700 font-medium">
        <div className="flex">
          <button
            style={{ border: "black solid", height: "30px" }}
            onClick={() => decreaseItemQuantity(id)}
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
            value={+quantity}
            readOnly
          ></input>
          <button
            style={{ border: "black solid", height: "30px" }}
            onClick={() => addItemQuantity(id)}
          >
            <PlusIcon />
          </button>
        </div>
      </div>
      <button onClick={() => removeItemFromCart(id)}>x</button>
      {/* <div className="text-gray-700 font-medium">
        Total Quantity: totalQuantity
      </div>
      <div className="text-gray-700 font-medium">Total Price: totalPrice</div> */}
    </div>
  );
};
