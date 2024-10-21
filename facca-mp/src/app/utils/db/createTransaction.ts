"use server";
import { CartProduct } from "@/app/providers/cartProvider";
import { db } from "@/lib/prisma";
import { Order } from "@prisma/client";

export const addOrderToDB = async (products: CartProduct[], userID: string) => {
  try {
    const order: Order = await db.order.create({
      data: {
        userID: userID,
      },
    });
    let totalPrice = 0;
    await Promise.all(
      products.map(async (product: CartProduct) => {
        const dbProduct = await db.product.findUnique({
          where: {
            id: product.id,
          },
        });
        if (dbProduct != null) {
          await db.productOrder.create({
            data: {
              orderID: order.id,
              productID: product.id,
              price: dbProduct.sellPrice,
              quantity: product.quantity,
            },
          });
          totalPrice =
            totalPrice + dbProduct.sellPrice.toNumber() * product.quantity;
          await db.user.update({
            where: {
              id: userID,
            },
            data: {
              balance: {
                decrement: totalPrice,
              },
            },
          });
        }
      })
    );
    return true;
  } catch (error) {
    console.error("Error placing order:", error);
    return false;
  }
};
