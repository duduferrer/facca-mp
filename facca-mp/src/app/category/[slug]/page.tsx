import SearchBar from "@/components/searchBar";
import Categories from "../../../components/categories";
import Products from "@/components/productsList";
import productsFiltered from "@/app/utils/filterProducts";
import { CategoryType } from "../../utils/enumCategories";
import { db } from "@/lib/prisma";

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
  return (
    <>
      <div className="px-4">
        <SearchBar />
        <Categories />
        <div className="mt-6 p-3 max-w-full block">
          <h3 className="text-center font-bold mb-2">{category?.name}</h3>
          <div className="flex justify-center">
            <Products products={await productsFiltered(slug)} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoriesPage;
