import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@prisma/client";
import Image from "next/image";
import { BRL } from "../../utils/convertAsCurrency";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="p-2 w-40 h-42">
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
        <div>
          <p className="text-xs max-w-36 text-nowrap text-ellipsis overflow-hidden">
            {product.name}
          </p>
          <p>{BRL.format(Number(product.sellPrice))}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
