import { useContext } from "react";
import { SheetContent } from "./ui/sheet";
import { CartContext } from "@/app/providers/cartProvider";

const Cart = () => {
  const { products } = useContext(CartContext);
  return <SheetContent side={"right"}></SheetContent>;
};

export default Cart;
