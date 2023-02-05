import { useState, useEffect, useContext } from "react";
import { doc, setDoc, getDoc, collection } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { authContext } from "@/context/authContext";
import { cartContext } from "@/context/cartContext";

const useCartService = () => {
  const { uid } = useContext(authContext);
  const { cart, setCart } = useContext(cartContext);
  // console.log("cart", cart);
  const cartRef = collection(db, "cart");

  const _setCart = async (data: any) => {
    if (!uid) return;
    await setDoc(doc(cartRef, uid), { data });
    await _getCart();
  };

  const _getCart = async () => {
    if (!uid) return setCart([]);
    const docRef = doc(db, "cart", uid);
    const cart = await getDoc(docRef).then((cart) => cart.data());
    if (cart) {
      setCart(cart.data);
    }
  };

  const addToCart = (item: any) => {
    const isExisted = cart.find((i) => i.id === item.id);
    if (!isExisted) {
      return _setCart([...cart, item]);
    } else {
      return _setCart(
        cart?.map((i: any) => {
          if (i.id === item.id) {
            return { ...i, quantity: i.quantity + item.quantity };
          } else return i;
        })
      );
    }
  };

  const removeItemFromCart = (id: string) => {
    _setCart(cart.filter((item) => item.id !== id));
  };

  const addItemQuantity = (id: string) => {
    _setCart(
      cart.map((item: any) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      })
    );
  };

  const decreaseItemQuantity = (id: string) => {
    const isExisted = cart.find((i) => i.id === id);
    if (isExisted && isExisted.quantity > 1) {
      return _setCart(
        cart.map((item: any) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        })
      );
    }

    if (isExisted && isExisted.quantity === 1) {
      return _setCart(cart.filter((item) => item.id !== id));
    }
  };

  useEffect(() => {
    _getCart();
  }, [uid]);

  return {
    cart,
    addToCart,
    removeItemFromCart,
    addItemQuantity,
    decreaseItemQuantity,
  };
};
export default useCartService;
