"use server";
import { CartProduct } from "@/app/providers/cartProvider";
import { db } from "@/lib/prisma";
import { Order } from "@prisma/client";

export const addOrderToDB = async (
  products: CartProduct[],
  userID: string,
  discount: number
) => {
  try {
    const order: Order = await db.order.create({
      data: {
        userID: userID,
        discount: discount,
        finalPrice: 0,
        productsSum: 0,
        profit: 0,
      },
    });
    let totalPrice = 0; //total price of order, without discounts
    let totalCost = 0;
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
              buyPrice: product.buyPrice,
            },
          });
          totalPrice =
            totalPrice + dbProduct.sellPrice.toNumber() * product.quantity; //store the prices sum of every product
          totalCost =
            totalCost + dbProduct.buyPrice.toNumber() * product.quantity; //store the cost sum of every product

          await db.order.update({
            where: {
              id: order.id,
            },
            data: {
              finalPrice: totalPrice - totalPrice * discount,
              discount: discount,
              productsSum: totalPrice,
              profit: totalPrice - totalPrice * discount - totalCost,
            },
          });
        }
      })
    );
    await db.user.update({
      where: {
        id: userID,
      },
      data: {
        balance: {
          decrement: totalPrice - totalPrice * discount,
        },
      },
    });
    return true;
  } catch (error) {
    console.error("Error placing order:", error);
    return false;
  }
};
