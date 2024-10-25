"use server";
import { db } from "@/lib/prisma";

const setProductNotVisible = async (productId: string) => {
  try {
    await db.product.update({
      where: {
        id: productId,
      },
      data: {
        isVisible: false,
      },
    });
    return true;
  } catch (e) {
    console.log("Nao foi possivel deletar" + e);
    return false;
  }
};
export default setProductNotVisible;
