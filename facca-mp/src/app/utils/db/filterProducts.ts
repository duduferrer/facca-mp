import CategoryType from "@/app/utils/enumCategories";
import { db } from "@/lib/prisma";
/**
 * Returns product list filtered by category
 * @param category - bebidas|salgados|doces|all
 * @param page - pagina atual
 * @param limit - numero de itens por pagina
 * @returns product list filtered by category
 */

const productsFiltered = async (
  category: CategoryType,
  page: number = 1,
  limit: number = 2,
) => {
  const skip = (page - 1) * limit;
  let whereClause: any = { isVisible: true };
  if (category != "all") {
    whereClause = {
      AND: {
        category: {
          slug: {
            equals: category,
          },
        },
        isVisible: true,
      },
    };
  }
  const products = await db.product.findMany({
    orderBy: {
      name: "asc",
    },
    where: whereClause,
    take: limit,
    skip: skip,
  });
  return products;
};
export default productsFiltered;
