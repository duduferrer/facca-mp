import { db } from "@/lib/prisma";
import { Product } from "@prisma/client";
/**
 * Returns product, search by ID
 * @param id - Product ID
 * @returns First product found by ID
 */

export const getProductByID = async (id: string) => {
  const product: Product | null = await db.product.findFirst({
    where: {
      id: {
        equals: id,
      },
    },
  });
  return product;
};
