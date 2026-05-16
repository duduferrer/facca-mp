import Categories from "../../../components/categories";
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
  const [category, { products, hasMore }] = await Promise.all([
    db.category.findFirst({ where: { slug } }),
    productsFiltered(slug, 1, 30),
  ]);

  return (
    <>
      <HomeClient
        products={products}
        initialHasMore={hasMore}
        categoryName={category?.name || "Produtos"}
        category={slug}
      >
        <Categories />
      </HomeClient>
    </>
  );
};

export default CategoriesPage;
