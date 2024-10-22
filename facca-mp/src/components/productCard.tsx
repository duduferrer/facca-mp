"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@prisma/client";
import Image from "next/image";
import { BRL } from "../app/utils/convertAsCurrency";
import { CartContext } from "@/app/providers/cartProvider";
import { useContext } from "react";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { increaseQuantity } = useContext(CartContext);
  const handleCardClick = () => {
    increaseQuantity({ ...product });
  };

  return (
    <Card
      className="p-2 min-w-40 max-w-40 h-50 hover:bg-accent/100 hover:text-accent-foreground cursor-pointer"
      onClick={handleCardClick}
    >
      <CardContent className="p-2">
        <div>
          <Image
            className="mx-auto"
            src={
              product.imageURL
                ? (product.imageURL as string)
                : (process.env.NEXT_PUBLIC_NO_IMAGE_PRODUCT as string)
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
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
