"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BRL } from "@/app/utils/convertAsCurrency";
import { Product } from "@prisma/client";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import ProductManagerCard from "./productManagerCard";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PlusSquareIcon } from "lucide-react";
import CreateProduct from "./productManagerCreateProduct";
const ProductManagerTable = ({ products }: { products: Product[] }) => {
  return (
    <Table className="">
      <TableHeader className="">
        <TableRow className="">
          <TableHead>Produto</TableHead>
          <TableHead className="text-center">Preço Venda</TableHead>
          <TableHead className="text-center">Preço Compra</TableHead>
          <TableHead className="text-center">Estoque</TableHead>
          <Dialog>
            <DialogTrigger asChild>
              <TableHead className="text-center cursor-pointer hover:text-green-600">
                <PlusSquareIcon />
              </TableHead>
            </DialogTrigger>
            <DialogContent>
              <CreateProduct />
            </DialogContent>
          </Dialog>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <Dialog key={product.id}>
            <HoverCard>
              <DialogTrigger asChild>
                <TableRow className="cursor-pointer">
                  <HoverCardTrigger asChild>
                    <TableCell className="max-w-48 text-ellipsis text-nowrap overflow-hidden">
                      {product.name}
                    </TableCell>
                  </HoverCardTrigger>
                  <TableCell className="text-center">
                    {BRL.format(Number(product.sellPrice))}
                  </TableCell>
                  <TableCell className="text-center">
                    {BRL.format(Number(product.buyPrice))}
                  </TableCell>
                  <TableCell className="text-center">{product.stock}</TableCell>
                </TableRow>
              </DialogTrigger>
              <HoverCardContent className="">
                <div>{product.name}</div>
              </HoverCardContent>
            </HoverCard>
            <DialogContent className="w-full">
              <ProductManagerCard product={product} />
            </DialogContent>
          </Dialog>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductManagerTable;
