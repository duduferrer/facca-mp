import CategoryType from "@/app/utils/enumCategories";
import { db } from "@/lib/prisma";
/**
 * Returns product list filtered by category
 * @param category - bebidas|salgados|doces|all
 * @returns product list filtered by category
 */

const productsFiltered = async (category: CategoryType) => {
  if (category == "all") {
    const products = await db.product.findMany({
      where: {
        isVisible: true,
      },
    });
    return products;
  } else {
    const products = await db.product.findMany({
      orderBy: {
        name: "asc",
      },
      where: {
        AND: {
          category: {
            slug: {
              equals: category,
            },
          },
          isVisible: true,
        },
      },
    });
    return products;
  }
};
export default productsFiltered;
