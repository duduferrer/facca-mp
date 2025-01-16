import Categories from "../../components/categories";
import Products from "../../components/productsList";
import SearchBar from "@/components/searchBar";
import { getAllProducts } from "../utils/db/getProducts";

export const dynamic = "force-dynamic";
export default async function Home() {
  const products = await getAllProducts();
  return (
    <>
      <div className="px-4">
        <SearchBar />
        <div>
          <Categories />
        </div>
        <div className="mt-6 p-3 max-w-full block">
          <h3 className="text-center font-bold mb-2">Todos os Produtos</h3>
          <div className="flex justify-center">
            <Products products={products} />
          </div>
        </div>
      </div>
    </>
  );
  //TODO adicionar categoria de favoritos
}
