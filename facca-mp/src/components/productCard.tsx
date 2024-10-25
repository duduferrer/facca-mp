"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@prisma/client";
import Image from "next/image";
import { BRL } from "../app/utils/convertAsCurrency";
import { CartContext } from "@/app/providers/cartProvider";
import { useContext } from "react";
import { useSession } from "next-auth/react";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { increaseQuantity } = useContext(CartContext);
  const handleCardClick = () => {
    increaseQuantity({ ...product });
  };
  const { data } = useSession();

  return (
    <Card
      className="p-2 min-w-40 max-w-40 h-50 hover:bg-accent/100 hover:text-accent-foreground cursor-pointer"
      onClick={handleCardClick}
    >
      <CardContent className="p-2">
        <div className="">
          <Image
            className="mx-auto size-20"
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
            {data?.user.member ? (
              <div className="flex justify-between">
                <p className="text-sm font-semibold line-through mt-auto decoration-red-600">
                  {BRL.format(Number(product.sellPrice))}
                </p>
                <p className="text-md font-semibold">
                  {BRL.format(
                    Number(product.sellPrice) -
                      Number(product.sellPrice) *
                        Number(process.env.NEXT_PUBLIC_DISCOUNT_PERCENTAGE)
                  )}
                </p>
              </div>
            ) : (
              <div>
                <p className="text-sm font-semibold">
                  {BRL.format(Number(product.sellPrice))}
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
