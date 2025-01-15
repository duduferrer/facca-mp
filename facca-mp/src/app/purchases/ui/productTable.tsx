import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableOrder } from "./table";
import { BRL } from "@/app/utils/convertAsCurrency";
import { randomUUID } from "crypto";
const ProductTable = ({ order }: { order: TableOrder }) => {
  return (
    <Table className="-mt-4">
      <TableHeader className="">
        <TableRow className="">
          <TableHead className="w-16"></TableHead>
          <TableHead>Produto</TableHead>
          <TableHead className="text-center">Preço</TableHead>
          <TableHead className="text-center">Quantidade</TableHead>
          <TableHead className="text-right">Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {order.products.map((product) => {
          let name = product.name;
          let price = product.price;
          let quantity = product.quantity;
          return (
            <TableRow key={randomUUID()}>
              <TableCell></TableCell>
              <TableCell className="max-w-48 text-ellipsis text-nowrap overflow-hidden">
                {name}
              </TableCell>
              <TableCell className="text-center">{BRL.format(price)}</TableCell>
              <TableCell className="text-center">{quantity}</TableCell>
              <TableCell className="text-right">
                {BRL.format(quantity * price)}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default ProductTable;
