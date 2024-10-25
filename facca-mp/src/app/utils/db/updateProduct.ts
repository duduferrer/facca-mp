"use server";
import { db } from "@/lib/prisma";

export interface UpdateProduct {
  productId: string;
  name: string;
  buyPrice: number;
  sellPrice: number;
  barcode: string | null;
  stockLoss: number;
  imageURL: string | null;
  stock: number;
}

const updateProductDB = async (product: UpdateProduct) => {
  try {
    await db.product.update({
      where: {
        id: product.productId,
      },
      data: {
        name: product.name.trim(),
        buyPrice: product.buyPrice,
        sellPrice: product.sellPrice,
        barcode: product.barcode ? product.barcode.trim() : "",
        imageURL: product.imageURL,
        stock: product.stock,
      },
    });
    await db.productLosses.create({
      data: {
        quantity: product.stockLoss,
        productID: product.productId,
      },
    });
    return true;
  } catch (e) {
    console.log(e + " Nao foi possivel atualizar o produto");
    return false;
  }
};

export default updateProductDB;
