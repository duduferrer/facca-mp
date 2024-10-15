import { db } from "@/lib/prisma";
import ProductCard from "./productCard";
import { Product } from "@prisma/client";

interface ProductsListProps {
  products: Product[];
}

const Products = ({ products }: ProductsListProps) => {
  return (
    <div className="flex flex-row gap-1 flex-wrap justify-center">
      {products.map((product) => (
        <ProductCard key={product.id} product={product}></ProductCard>
      ))}
    </div>
  );
};

export default Products;
