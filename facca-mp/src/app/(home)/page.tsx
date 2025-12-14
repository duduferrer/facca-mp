"use server"
import Categories from "@/components/categories";
import { getAllProducts } from "../utils/db/getProducts";
import HomeClient from "./homeClient";
import UpdateToast from "@/components/updateToast";

export default async function Home() {
  const products = await getAllProducts();
  return (
    <>
      <HomeClient products={products} categoryName="Produtos">
        <Categories/>
        <UpdateToast/>
      </HomeClient>
    </>
  );
  //TODO adicionar categoria de favoritos
}
