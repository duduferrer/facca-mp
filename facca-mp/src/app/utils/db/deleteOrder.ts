"use server";

import { db } from "@/lib/prisma";

const deleteOrder = async (orderID: string, userId: string) => {
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
    return true;
  } catch (e) {
    console.error(e + "Nao foi possivel deletar o registro");
    return false;
  }
};
export default deleteOrder;
