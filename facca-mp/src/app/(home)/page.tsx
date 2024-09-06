"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import Categories from "./components/categories";

export default function Home() {
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
      </div>
    </>
  );
  // TODO Criar Card de Produto
}
