import { useContext } from "react";
import allProducts from "./getAllProducts";
import { CartContext } from "@/app/providers/cartProvider";

export async function checkPrice() {
  const DBproducts = await allProducts();
  const { products, setProducts } = useContext(CartContext);

  products.map((cartProduct) => {
    const dbProduct = DBproducts.find(
      (dbProduct) => dbProduct.id == cartProduct.id
    );
    cartProduct.sellPrice == dbProduct?.sellPrice
      ? ""
      : (cartProduct.sellPrice = dbProduct?.sellPrice!);
  });
}
