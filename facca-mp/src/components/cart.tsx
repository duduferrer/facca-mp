import { useContext, useEffect, useState } from "react";
import { SheetContent } from "./ui/sheet";
import { CartContext } from "@/app/providers/cartProvider";
import { ShoppingBagIcon, ShoppingCart } from "lucide-react";
import CartCard from "./cartCard";
import { BRL } from "@/app/utils/convertAsCurrency";

const Cart = () => {
  const { products } = useContext(CartContext);
  const [subtotal, setSubtotal] = useState(0);
  useEffect(() => {
    let sum = 0;

    products
      .map((product) => {
        sum = Number(product.sellPrice) * product.quantity + sum;
        return sum;
      })
      .forEach((el) => el + sum);
    setSubtotal(sum);
  }, [products]);
  return (
    <SheetContent side={"right"}>
      <div className="flex">
        <ShoppingCart className="mt-1" />
        <h1 className="ml-2 text-2xl font-bold">Carrinho</h1>
      </div>
      <div>
        {products.length == 0 ? (
          <div className="mt-10">
            <p className="mb-4">Seu carrinho está vazio! </p>
            <p>
              <span className="font-bold">Clique</span> em um produto para
              adicioná-lo.
            </p>
          </div>
        ) : (
          products.map((prod) =>
            prod.quantity > 0 ? <CartCard key={prod.id} product={prod} /> : ""
          )
        )}
        {BRL.format(subtotal)}
      </div>
    </SheetContent>
  );
};

export default Cart;
