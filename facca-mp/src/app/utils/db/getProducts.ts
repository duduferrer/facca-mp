import { db } from "@/lib/prisma";
import { Product } from "@prisma/client";
import productsFiltered from "./filterProducts";
import CategoryType from "../enumCategories";
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

export async function getAllProducts() {
  const products = await productsFiltered("all");
  return products;
}
