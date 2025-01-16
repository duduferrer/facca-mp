/*
 * 1- LISTA DE PRODUTOS -> OPCAO DE SELECIONAR E EXCLUIR E ABRIR POPUP PARA EDITAR
 * 2- CADASTRO DE PRODUTOS -> ABRIR POPUP PARA CADASTRAR
 */

import { getAllProducts } from "@/app/utils/db/getProducts";
import ProductManagerTable from "./ui/productManagerTable";
export const dynamic = "force-dynamic";
const ProductManager = async () => {
  const products = await getAllProducts();
  return (
    <div>
      <ProductManagerTable products={products} />
    </div>
  );
};

export default ProductManager;
