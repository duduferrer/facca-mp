"use client";

import { BRL } from "@/app/utils/convertAsCurrency";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Order, ProductOrder } from "@prisma/client";
import { SquareArrowDown, SquareArrowRight, Trash2Icon } from "lucide-react";
import ProductTable from "./productTable";
import { useEffect, useState } from "react";
import { Dialog } from "@radix-ui/react-dialog";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import deleteOrder from "@/app/utils/db/deleteOrder";
import { toast } from "@/hooks/use-toast";

export interface TableOrder extends Order {
  products: ProductsDeleted[];
}
export interface ProductsDeleted {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export const OrdersTable = ({
  data,
  finalSum,
  userId,
}: {
  data: TableOrder[] | undefined;
  finalSum: number;
  userId: string;
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
  const handleDeleteOrderClick = (
    orderID: string,
    products: ProductsDeleted[]
  ) => {
    deleteOrder(orderID, userId, products).then((res) => {
      if (res) {
        toast({
          variant: "default",
          title: "Sucesso!",
          description: "Registro apagado",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Falha!",
          description: "Houve uma falha ao apagar o registro",
        });
      }
      location.reload();
    });
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
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((order) => {
              return (
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
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <TableCell className="text-destructive cursor-pointer w-6">
                          <Trash2Icon className="m-auto flex" />
                        </TableCell>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>Apagar Registro</AlertDialogHeader>
                        <AlertDialogDescription>
                          Você tem certeza que quer apagar este registro?
                        </AlertDialogDescription>

                        <AlertDialogAction
                          className="bg-destructive hover:bg-red-400"
                          onClick={() =>
                            handleDeleteOrderClick(order.id, order.products)
                          }
                        >
                          Apagar
                        </AlertDialogAction>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      </AlertDialogContent>
                    </AlertDialog>
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
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5}>Total</TableCell>
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
