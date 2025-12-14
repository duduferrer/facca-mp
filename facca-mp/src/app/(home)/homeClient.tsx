"use client"

import Products from "../../components/productsList";
import SearchBar from "@/components/searchBar";
import { useEffect, useMemo, useState } from "react";
import { Product } from "@prisma/client";
import { useToast } from "@/hooks/use-toast";


type Props = {
    products: Product[];
    children: React.ReactNode;
    categoryName: string;
}

export const dynamic = "force-dynamic";
export default function HomeClient({products, children, categoryName}: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredProducts = useMemo(()=>{
    return products.filter(product=> product.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm, products]);
  useEffect(()=>{
    localStorage.getItem("update")
  },[]);
  return (
    <>
      <div className="px-4 pt-20">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div>
            {children}
        </div>
        <div className="mt-6 p-3 max-w-full block">
          <h3 className="text-center font-bold mb-2">{categoryName}</h3>
          <div className="flex justify-center">
            <Products products={filteredProducts} />
          </div>
        </div>
      </div>
    </>
  );
}
  //TODO adicionar categoria de favoritos