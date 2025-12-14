import SearchBar from "../../../components/searchBar";
import Categories from "../../../components/categories";
import Products from "@/components/productsList";
import productsFiltered from "@/app/utils/db/filterProducts";
import CategoryType from "../../utils/enumCategories";
import { db } from "@/lib/prisma";
import HomeClient from "@/app/(home)/homeClient";

interface CategoriesPageProps {
  params: {
    slug: CategoryType;
  };
}

const CategoriesPage = async ({ params: { slug } }: CategoriesPageProps) => {
  const category = await db.category.findFirst({
    where: {
      slug: slug,
    },
  });
  const products = await productsFiltered(slug)
  return (
    <>
      <HomeClient products={products} categoryName={category?.name||"Produtos"}>
        <Categories/>
      </HomeClient>
    </>
  );
};

export default CategoriesPage;
