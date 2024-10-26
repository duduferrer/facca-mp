"use server";

import { ProductsDeleted } from "@/app/manager/purchases/ui/table";
import { db } from "@/lib/prisma";

const deleteOrder = async (
  orderID: string,
  userId: string,
  products: ProductsDeleted[]
) => {
  try {
    const order = await db.order.findFirst({
      where: {
        id: orderID,
      },
    });

    await db.order.delete({
      where: {
        id: orderID,
      },
    });
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        balance: {
          increment: order?.finalPrice,
        },
      },
    });
    products.map(async (product) => {
      await db.product.update({
        where: {
          id: product.id,
        },
        data: {
          stock: {
            increment: product.quantity,
          },
        },
      });
    });
    return true;
  } catch (e) {
    console.error(e + "Nao foi possivel deletar o registro");
    return false;
  }
};
export default deleteOrder;
