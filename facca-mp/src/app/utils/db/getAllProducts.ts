import { CategoryType } from "../enumCategories";
import productsFiltered from "./filterProducts";

export default async function allProducts() {
  const products = await productsFiltered(CategoryType.all);
  return products;
}
