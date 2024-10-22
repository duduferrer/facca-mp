import { CartProduct } from "@/app/providers/cartProvider";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Separator } from "./ui/separator";
import { BRL } from "@/app/utils/convertAsCurrency";
import QuantityController from "./quantityController";

interface Product {
  product: CartProduct;
}

const CartCard = ({ product }: Product) => {
  return (
    <Card className="w-160 h-40 border-none mt-4">
      <CardContent className="p-0 flex">
        <div className="h-40 w-64 flex">
          <div className="ml-5 mt-8 w-14">
            <Image
              src={
                product.imageURL
                  ? (product.imageURL as string)
                  : (process.env.NEXT_PUBLIC_NO_IMAGE_PRODUCT as string)
              }
              alt={product.name}
              width={100}
              height={100}
              className="border-solid align-middle size-24"
            />
          </div>
          <Separator orientation="vertical" className="h-28 mt-6 mx-3" />
        </div>
        <div className="w-full py-3">
          <h3 className="font-semibold h-11 w-48 overflow-hidden text-md text-ellipsis">
            {product.name}
          </h3>
          <p className="mt-2 text-left">
            {BRL.format(Number(product.sellPrice))}
          </p>
          <div className="">
            <QuantityController product={{ ...product }} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CartCard;
