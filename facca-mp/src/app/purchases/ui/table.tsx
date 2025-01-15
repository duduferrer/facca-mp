"use client";

import { BRL } from "@/app/utils/convertAsCurrency";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Order } from "@prisma/client";
import { SquareArrowDown, SquareArrowRight } from "lucide-react";
import ProductTable from "./productTable";
import { useState } from "react";

export interface TableOrder extends Order {
  products: {
    name: string;
    quantity: number;
    price: number;
  }[];
}

export const OrdersTable = ({
  data,
  finalSum,
}: {
  data: TableOrder[] | undefined;
  finalSum: number;
}) => {
  const [activeArrow, setActiveArrow] = useState("");
  const [activeProduct, setActiveProduct] = useState("");
  const handleCellClick = (order: TableOrder) => {
    const orderID = order.id;
    const arrow = orderID + "-arrow";
    const row = orderID + "-products";
    if (arrow == activeArrow) {
      setActiveArrow("");
      setActiveProduct("");
    } else {
      setActiveArrow(arrow);
      setActiveProduct(row);
    }
  };
  if (data !== undefined) {
    return (
      <>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className=""></TableHead>
              <TableHead className="">Data</TableHead>
              <TableHead className="text-center">Preço Sem Desconto</TableHead>
              <TableHead className="text-center">Desconto</TableHead>
              <TableHead className="text-right">Preço Final</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((order) => (
              <>
                <TableRow key={order.id}>
                  <TableCell
                    key={order.id + "-arrow"}
                    onClick={() => handleCellClick(order)}
                    className="cursor-pointer"
                  >
                    {activeArrow == order.id + "-arrow" ? (
                      <SquareArrowDown />
                    ) : (
                      <SquareArrowRight />
                    )}
                  </TableCell>
                  <TableCell className="font-medium">
                    {order.timeStamp.toLocaleString().replace(",", " -")}
                  </TableCell>
                  <TableCell className="text-center">
                    {BRL.format(Number(order.productsSum))}
                  </TableCell>
                  <TableCell className="text-center">
                    {order.discount * 100 + "%"}
                  </TableCell>
                  <TableCell className="text-right">
                    {BRL.format(Number(order.finalPrice))}
                  </TableCell>
                </TableRow>
                <TableRow
                  key={order.id + "-products"}
                  className={
                    activeProduct == order.id + "-products"
                      ? "visible"
                      : "collapse"
                  }
                >
                  <TableCell colSpan={5}>
                    <ProductTable order={order} />
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Total</TableCell>
              <TableCell className="text-right">
                {BRL.format(finalSum)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        <h3 className="text-sm text-right mr-1">
          Total de Compras encontrado: {" " + data.length}
        </h3>
      </>
    );
  } else {
    <h1>Houve um erro ao processar a solicitação.</h1>;
  }
};

export default OrdersTable;
