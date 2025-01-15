import { MinusSquareIcon, PlusSquareIcon, Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";
import { useContext, useEffect, useState } from "react";
import { CartContext, CartProduct } from "@/app/providers/cartProvider";

interface QuantityControllerProps {
  product: CartProduct;
}

const QuantityController = ({ product }: QuantityControllerProps) => {
  const { increaseQuantity, decreaseQuantity, products } =
    useContext(CartContext);
  const handleMinusClick = () => {
    decreaseQuantity({ ...product });
  };
  const handlePlusClick = () => {
    increaseQuantity({ ...product });
  };
  const [qty, setQty] = useState(product.quantity);
  useEffect(() => {
    setQty(product.quantity);
  }, [products]);

  return qty > 0 ? (
    <div className="flex justify-center p-2">
      <Button size="icon" variant="ghost" onClick={handleMinusClick}>
        {qty == 1 ? (
          <Trash2Icon className="text-destructive" />
        ) : (
          <MinusSquareIcon />
        )}
      </Button>
      <Button size="icon" variant="outline" className="font-bold">
        {qty}
      </Button>
      <Button size="icon" variant="ghost" onClick={handlePlusClick}>
        <PlusSquareIcon />
      </Button>
    </div>
  ) : (
    ""
  );
};

export default QuantityController;
