"use client";

import { Product } from "@prisma/client";
import { createContext, ReactNode, useEffect, useState } from "react";

export interface CartProduct extends Product {
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  totalPrice: number;
  increaseQuantity: (product: Product) => void;
  decreaseQuantity: (product: Product) => void;
  setProducts: (products: CartProduct[]) => void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  totalPrice: 0,
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  setProducts: () => {},
});

const CartProvider = ({ children }: { children: ReactNode }) => {
  const sessionStorageCart = JSON.parse(
    sessionStorage.getItem("@facca/cart-products") || "[]"
  );
  const [products, setProducts] = useState<CartProduct[]>([]);

  useEffect(() => {
    setProducts(sessionStorageCart);
  }, []);

  useEffect(() => {
    sessionStorage.setItem("@facca/cart-products", JSON.stringify(products));
  }, [products]);

  const addProductToCart = (product: Product) => {
    setProducts((prev) => [...prev, { ...product, quantity: 1 }]);
  };

  const increaseQuantity = (product: Product) => {
    const productInCart = products.some((item) => item.id == product.id);
    if (productInCart) {
      setProducts(
        products.map((el) =>
          el.id == product.id ? { ...el, quantity: el.quantity + 1 } : el
        )
      );
    } else {
      addProductToCart(product);
    }
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
        setProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
