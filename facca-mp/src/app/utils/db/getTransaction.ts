"use server";
import { TableOrder } from "@/app/purchases/ui/table";
import { db } from "@/lib/prisma";
import { useSession } from "next-auth/react";
import { DateRange } from "react-day-picker";

export const getOrders = async (
  date: DateRange | undefined,
  userID: string | undefined
) => {
  try {
    const orders = await db.order.findMany({
      orderBy: {
        timeStamp: "desc",
      },
      where: {
        AND: {
          userID: userID,
          timeStamp: {
            lte: date?.to,
            gte: date?.from,
          },
        },
      },
      include: {
        productOrder: {
          include: {
            product: true,
          },
          where: {
            quantity: {
              gt: 0,
            },
          },
        },
      },
    });
    const formattedOrders: TableOrder[] = orders.map((order) => ({
      ...order,
      products: order.productOrder.map((product) => ({
        name: product.product.name,
        quantity: Number(product.quantity),
        price: Number(product.price),
      })),
    }));
    return formattedOrders;
  } catch (e) {
    console.error("Error getting orders", e);
  }
};
