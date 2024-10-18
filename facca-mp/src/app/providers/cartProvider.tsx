"use client";

import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

export interface CartProduct extends Product {
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  totalPrice: number;
  increaseQuantity: (product: Product) => void;
  decreaseQuantity: (product: Product) => void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  totalPrice: 0,
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
});

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);

  const addProductToCart = (product: Product) => {
    setProducts((prev) => [...prev, { ...product, quantity: 1 }]);
    console.log(products);
  };

  const increaseQuantity = (product: Product) => {
    const productInCart = products.some((item) => item.id == product.id);
    if (productInCart) {
      console.log(products);
      setProducts(
        products.map((el) =>
          el.id == product.id ? { ...el, quantity: el.quantity + 1 } : el
        )
      );
    } else {
      addProductToCart(product);
    }
    debugger;
  };
  const decreaseQuantity = (product: Product) => {
    setProducts((prev) =>
      prev
        .map((cartProduct) => {
          if (cartProduct.id === product.id) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity - 1,
            };
          }

          return cartProduct;
        })
        .filter((cartProduct) => cartProduct.quantity > 0)
    );
  };

  return (
    <CartContext.Provider
      value={{
        products,
        totalPrice: 0,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
