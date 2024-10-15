"use client";

import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

interface CartProduct extends Product {
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  totalPrice: number;
  addItemToCart: (product: CartProduct) => void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  totalPrice: 0,
  addItemToCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [item, setItem] = useState<CartProduct[]>([]);
  const addItemToCart = (product: CartProduct) => {
    setItem((prev) => [...prev, product]);
  };
  <CartContext.Provider value={{ products: [], totalPrice: 0, addItemToCart }}>
    {children}
  </CartContext.Provider>;
};

export default CartProvider;
