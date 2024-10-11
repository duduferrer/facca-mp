import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import Categories from "./components/categories";
import ProductCard from "./components/productCard";
import Products from "./components/productsList";
import productsFiltered from "./components/filterProducts";

export default async function Home() {
  return (
    <>
      <div className="px-4">
        <div className="flex py-4">
          <Input placeholder="Pesquisar" />
          <Button variant={"outline"}>
            <SearchIcon />
          </Button>
        </div>
        <div>
          <Categories />
        </div>
        <div className="mt-6 bg-accent p-3 max-w-full block">
          <h3 className="text-center font-bold mb-2">Todos os Produtos</h3>
          <div className="flex justify-center">
            <Products products={await productsFiltered()} />
          </div>
        </div>
      </div>
    </>
  );
  // TODO Estilizar Card de Produto
  //TODO productsFiltered deve receber prop enum com categoria ou todos os produtos
  //TODO adicionar categoria de favoritos
}
