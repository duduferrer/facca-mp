"use client";

import Products from "../../components/productsList";
import SearchBar from "@/components/searchBar";
import { useEffect, useRef, useState } from "react";
import { Product } from "@prisma/client";
import { fetchProducts } from "@/app/actions/productActions";
import CategoryType from "@/app/utils/enumCategories";
import { Loader2Icon } from "lucide-react";

type Props = {
  products: Product[];
  initialHasMore: boolean;
  children: React.ReactNode;
  categoryName: string;
  category: CategoryType;
};

export const dynamic = "force-dynamic";
export default function HomeClient({
  products: initialProducts,
  initialHasMore,
  children,
  categoryName,
  category,
}: Props) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const sentinelRef = useRef<HTMLDivElement>(null);
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const isLoadingRef = useRef(false);
  // Bloqueia o IntersectionObserver enquanto o debounce de busca está pendente
  const isSearchingRef = useRef(false);
  // Evita o fetch desnecessário no primeiro render (produtos já vêm do SSR)
  const isMountedRef = useRef(false);

  // Busca com debounce ao mudar o searchTerm
  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      return;
    }

    // Sinaliza que uma busca está em andamento — bloqueia o scroll
    isSearchingRef.current = true;
    clearTimeout(searchTimeoutRef.current);

    searchTimeoutRef.current = setTimeout(async () => {
      isLoadingRef.current = true;
      setIsLoading(true);
      const result = await fetchProducts(category, 1, searchTerm);
      setProducts(result.products);
      setPage(1);
      setHasMore(result.hasMore);
      isLoadingRef.current = false;
      isSearchingRef.current = false; // libera o scroll após a busca
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(searchTimeoutRef.current);
  }, [searchTerm, category]);

  // Infinite scroll via IntersectionObserver
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      async ([entry]) => {
        // Não executa se: fora da tela, carregando, buscando ou sem mais páginas
        if (
          !entry.isIntersecting ||
          isLoadingRef.current ||
          isSearchingRef.current ||
          !hasMore
        )
          return;

        isLoadingRef.current = true;
        setIsLoading(true);
        const nextPage = page + 1;
        const result = await fetchProducts(category, nextPage, searchTerm);
        setProducts((prev) => [...prev, ...result.products]);
        setPage(nextPage);
        setHasMore(result.hasMore);
        isLoadingRef.current = false;
        setIsLoading(false);
      },
      { threshold: 0.1 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, page, searchTerm, category]);

  return (
    <>
      <div className="px-4 pt-20">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div>{children}</div>
        <div className="mt-6 p-3 max-w-full block">
          <h3 className="text-center font-bold mb-2">{categoryName}</h3>
          <div className="flex justify-center">
            <Products products={products} />
          </div>

          {/* Sentinel para disparar o infinite scroll */}
          <div ref={sentinelRef} className="h-4 w-full" />

          {/* Spinner de carregamento */}
          {isLoading && (
            <div className="flex justify-center py-4">
              <Loader2Icon
                className="animate-spin text-muted-foreground"
                size={24}
              />
            </div>
          )}

          {/* Mensagem de fim da lista */}
          {!hasMore && !isLoading && products.length > 0 && (
            <p className="text-center text-sm text-muted-foreground py-4">
              Todos os produtos foram carregados
            </p>
          )}

          {/* Nenhum resultado encontrado */}
          {!isLoading && products.length === 0 && (
            <p className="text-center text-sm text-muted-foreground py-4">
              Nenhum produto encontrado
            </p>
          )}
        </div>
      </div>
    </>
  );
}
//TODO adicionar categoria de favoritos
