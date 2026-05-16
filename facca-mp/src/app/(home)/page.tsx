"use server";
import Categories from "@/components/categories";
import productsFiltered from "../utils/db/filterProducts";
import HomeClient from "./homeClient";
import UpdateToast from "@/components/updateToast";

export default async function Home() {
  const { products, hasMore } = await productsFiltered("all", 1, 30);
  return (
    <>
      <HomeClient
        products={products}
        initialHasMore={hasMore}
        categoryName="Produtos"
        category="all"
      >
        <Categories />
        <UpdateToast />
      </HomeClient>
    </>
  );
  //TODO adicionar categoria de favoritos
}
