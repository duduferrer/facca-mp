"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@prisma/client";
import Image from "next/image";
import { BRL } from "../app/utils/convertAsCurrency";
import { CartContext } from "@/app/providers/cartProvider";
import { useContext, useState } from "react";
import { Button } from "./ui/button";
import { MinusSquareIcon, PlusSquareIcon } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [quantity, setQuantity] = useState(0);
  const { addItemToCart } = useContext(CartContext);
  const handleCardClick = () => {
    if (quantity == 0) {
      addItemToCart({ ...product, quantity });
      setQuantity(1);
    }
  };
  const handleMinusClick = () => {
    setQuantity(quantity - 1);
  };
  const handlePlusClick = () => {
    setQuantity(quantity + 1);
  };
  return (
    <Card
      className="p-2 w-48 h-50 hover:bg-accent/100 hover:text-accent-foreground cursor-pointer"
      onClick={handleCardClick}
    >
      <CardContent className="p-2">
        <div>
          <Image
            className="mx-auto"
            src={
              product.imageURL
                ? (product.imageURL as string)
                : (process.env.NO_IMAGE_PRODUCT as string)
            }
            alt={product.name as string}
            width={100}
            height={100}
          />
        </div>
        <div className="justify-between">
          <div>
            <p className="text-md font-semibold max-w-36 text-nowrap text-ellipsis overflow-hidden">
              {product.name}
            </p>
            <p className="text-sm font-semibold">
              {BRL.format(Number(product.sellPrice))}
            </p>
          </div>
          {quantity == 0 ? (
            ""
          ) : (
            <div className="flex justify-center p-2">
              <Button size="icon" variant="ghost" onClick={handleMinusClick}>
                <MinusSquareIcon />
              </Button>
              <Button size="icon" variant="outline" className="font-bold">
                {quantity}
              </Button>
              <Button size="icon" variant="ghost" onClick={handlePlusClick}>
                <PlusSquareIcon />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
