"use server";

import productsFiltered from "@/app/utils/db/filterProducts";
import CategoryType from "@/app/utils/enumCategories";

/**
 * Server Action to fetch products with optional search and pagination
 * @param category - category slug or "all"
 * @param page - current page (1-indexed)
 * @param search - optional name search term
 */
export async function fetchProducts(
  category: CategoryType,
  page: number,
  search: string,
) {
  return productsFiltered(category, page, 30, search);
}
