import Categories from "../../components/categories";
import Products from "../../components/productsList";
import productsFiltered from "../../components/filterProducts";
import SearchBar from "@/components/searchBar";
import { CategoryType } from "../utils/enumCategories";

export default async function Home() {
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
            <Products products={await productsFiltered(CategoryType.all)} />
          </div>
        </div>
      </div>
    </>
  );
  // TODO Estilizar Card de Produto
  //TODO adicionar categoria de favoritos
}
