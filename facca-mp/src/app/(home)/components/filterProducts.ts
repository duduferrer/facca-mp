import { db } from "@/lib/prisma";

const productsFiltered = async () => {
  const products = await db.product.findMany();
  return products;
};
export default productsFiltered;
