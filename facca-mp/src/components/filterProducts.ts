import { CategoryType } from "@/app/utils/enumCategories";
import { db } from "@/lib/prisma";
/**
 * Returns product list filtered by category
 * @param category - bebidas|salgados|doces|all
 * @returns product list filtered by category
 */

const productsFiltered = async (category: CategoryType) => {
  if (category == CategoryType.all) {
    const products = await db.product.findMany({});
    return products;
  } else {
    const products = await db.product.findMany({
      where: {
        category: {
          slug: {
            equals: category,
          },
        },
      },
    });
    return products;
  }
};
export default productsFiltered;
