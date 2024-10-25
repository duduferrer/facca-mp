"use server";
import { db } from "@/lib/prisma";

export interface CreateProductI {
  name: string;
  buyPrice: number;
  sellPrice: number;
  barcode: string | null;
  imageURL: string | null;
  stock: number;
  category: string;
}

const createProductDB = async (product: CreateProductI) => {
  console.log("entrou cpdb");
  const slug = product.name.replace(" ", "-");
  console.log(slug);
  try {
    await db.product.create({
      data: {
        name: product.name.trim(),
        buyPrice: product.buyPrice,
        sellPrice: product.sellPrice,
        barcode: product.barcode ? product.barcode.trim() : "",
        imageURL: product.imageURL,
        stock: product.stock,
        slug: slug,
        categoryID: product.category,
      },
    });
    return true;
  } catch (e) {
    console.log(e + " Nao foi possivel criar o produto");
    return false;
  }
};

export default createProductDB;
