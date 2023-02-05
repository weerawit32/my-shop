import { createContext, ReactNode, useState } from "react";

type cartContextType = {
  cart: any[];
  setCart: (carts: any[]) => void;
};

const cartContextInitial = {
  cart: [],
  setCart: (carts: any[]) => {},
};

export const cartContext = createContext<cartContextType>(cartContextInitial);

const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCartState] = useState<any[]>([]);

  const setCart = (carts: any[]) => {
    setCartState(carts);
  };

  return (
    <cartContext.Provider value={{ cart, setCart }}>
      {children}
    </cartContext.Provider>
  );
};

export default CartContextProvider;
