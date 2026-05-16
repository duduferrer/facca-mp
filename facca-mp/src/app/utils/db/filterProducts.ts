import CategoryType from "@/app/utils/enumCategories";
import { db } from "@/lib/prisma";
import { Product } from "@prisma/client";

/**
 * Returns product list filtered by category, with optional name search and pagination.
 * Search is accent-insensitive and case-insensitive via PostgreSQL unaccent extension.
 * @param category - bebidas|salgados|doces|all
 * @param page - pagina atual
 * @param limit - numero de itens por pagina
 * @param search - termo de busca pelo nome do produto (opcional)
 * @returns product list filtered, total count and hasMore flag
 */

const productsFiltered = async (
  category: CategoryType,
  page: number = 1,
  limit: number = 30,
  search: string = "",
) => {
  const skip = (page - 1) * limit;

  // Quando há busca, usa $queryRaw com unaccent para ignorar acentuação e case
  if (search) {
    // Normaliza o termo no JS também: remove acentos e converte para minúsculo
    // Assim funciona mesmo que o unaccent do PG não seja aplicado ao padrão
    const normalizedSearch = search
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .toLowerCase();
    const searchPattern = `%${normalizedSearch}%`;

    if (category !== "all") {
      const [products, countResult] = await Promise.all([
        db.$queryRaw<Product[]>`
          SELECT p.* FROM "Product" p
          JOIN "Category" c ON p."categoryID" = c.id
          WHERE p."isVisible" = true
            AND c.slug = ${category}
            AND lower(unaccent(lower(p.name))) LIKE ${searchPattern}
          ORDER BY p.name ASC
          LIMIT ${limit} OFFSET ${skip}
        `,
        db.$queryRaw<[{ count: bigint }]>`
          SELECT COUNT(*) as count FROM "Product" p
          JOIN "Category" c ON p."categoryID" = c.id
          WHERE p."isVisible" = true
            AND c.slug = ${category}
            AND lower(unaccent(lower(p.name))) LIKE ${searchPattern}
        `,
      ]);

      const total = Number(countResult[0].count);
      return { products, total, hasMore: skip + products.length < total };
    } else {
      const [products, countResult] = await Promise.all([
        db.$queryRaw<Product[]>`
          SELECT * FROM "Product"
          WHERE "isVisible" = true
            AND lower(unaccent(lower(name))) LIKE ${searchPattern}
          ORDER BY name ASC
          LIMIT ${limit} OFFSET ${skip}
        `,
        db.$queryRaw<[{ count: bigint }]>`
          SELECT COUNT(*) as count FROM "Product"
          WHERE "isVisible" = true
            AND lower(unaccent(lower(name))) LIKE ${searchPattern}
        `,
      ]);

      const total = Number(countResult[0].count);
      return { products, total, hasMore: skip + products.length < total };
    }
  }

  // Sem busca: usa ORM do Prisma normalmente
  const categoryFilter =
    category !== "all"
      ? { category: { slug: { equals: category } } }
      : {};

  const whereClause = {
    isVisible: true,
    ...categoryFilter,
  };

  const [products, total] = await db.$transaction([
    db.product.findMany({
      orderBy: { name: "asc" },
      where: whereClause,
      take: limit,
      skip,
    }),
    db.product.count({ where: whereClause }),
  ]);

  return {
    products,
    total,
    hasMore: skip + products.length < total,
  };
};
export default productsFiltered;
