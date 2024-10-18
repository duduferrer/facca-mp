import { Product } from "@prisma/client";
import Image from "next/image";

const ProductImage = (product: Product) => {
  return (
    <Image
      className="mx-auto"
      src={product.imageURL ? product.imageURL : process.env.NO_IMAGE_PRODUCT!}
      alt={product.name}
      width={100}
      height={100}
    />
  );
};

export default ProductImage;
