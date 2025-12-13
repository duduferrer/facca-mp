"use server"
import Categories from "@/components/categories";
import { getAllProducts } from "../utils/db/getProducts";
import HomeClient from "./homeClient";

export default async function Home() {
  const products = await getAllProducts();
  return (
    <>
      <HomeClient products={products} categoryName="Produtos">
        <Categories/>
      </HomeClient>
    </>
  );
  //TODO adicionar categoria de favoritos
}
