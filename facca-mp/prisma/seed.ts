const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  try {
    const beverageCategory = await prisma.Category.create({
      data: {
        name: "Bebidas",
        slug: "bebidas",
        imageURL:
          "https://utfs.io/f/f3caf81e-a2dc-423a-a00c-c2157a4cbd09-1t8n66.svg",
      },
    });
    const beverages = [
      {
        name: "Coca Cola",
        slug: "coca-cola",
        sellPrice: 2,
        buyPrice: 1,
        barcode: "78912939",
        imageURL: "https://cdn-cosmos.bluesoft.com.br/products/78912939",
        categoryID: beverageCategory.id,
      },
      {
        name: "Pepsi",
        slug: "pepsi",
        sellPrice: 2.5,
        buyPrice: 2,
        barcode: "7892840800567",
        imageURL:
          "https://cdn-https://cdn-cosmos.bluesoft.com.br/products/7892840800567",
        categoryID: beverageCategory.id,
      },
      {
        name: "Soda Antartica 200ml",
        slug: "soda",
        sellPrice: 3.45,
        buyPrice: 1.5,
        barcode: "7891991014984",
        imageURL: "https://cdn-cosmos.bluesoft.com.br/products/7891991014984",
        categoryID: beverageCategory.id,
      },
    ];
    await prisma.Product.createMany({
      data: beverages,
    });
    const snacksCategory = await prisma.Category.create({
      data: {
        name: "Salgados",
        slug: "salgados",
        imageURL:
          "https://utfs.io/f/f3caf81e-a2dc-423a-a00c-c2157a4cbd09-1t8n66.svg",
      },
    });
    const snacks = [
      {
        name: "Cheetos Requeijão",
        slug: "cheetos-requeijao",
        sellPrice: 5.75,
        buyPrice: 7,
        barcode: "7892840215941",
        imageURL: "https://cdn-cosmos.bluesoft.com.br/products/7892840215941",
        categoryID: snacksCategory.id,
      },
      {
        name: "SALGADINHO FANDANGOS QUEIJO",
        slug: "fandangos-queijo",
        sellPrice: 12.29,
        buyPrice: 10,
        barcode: "7892840222949",
        imageURL: "https://cdn-cosmos.bluesoft.com.br/products/7892840222949",
        categoryID: snacksCategory.id,
      },
      {
        name: "SALGADINHO DE TRIGO BACON ELMA CHIPS PINGO DOURO CLÁSSICOS PACOTE 130G",
        slug: "pingo-douro",
        sellPrice: 5.2,
        buyPrice: 5,
        barcode: "7892840814793",
        imageURL: "https://cdn-cosmos.bluesoft.com.br/products/7892840814793",
        categoryID: snacksCategory.id,
      },
    ];
    await prisma.Product.createMany({
      data: snacks,
    });
    const candyCategory = await prisma.Category.create({
      data: {
        name: "Doces",
        slug: "doces",
        imageURL:
          "https://utfs.io/f/205fac25-861d-4156-9b90-b66f3017c21d-1k7wit.svg",
      },
    });
    const candies = [
      {
        name: "CONFEITO M&M'S AMENDOIM",
        slug: "mms",
        sellPrice: 5.75,
        buyPrice: 3,
        barcode: "7896423413878",
        imageURL: "https://cdn-cosmos.bluesoft.com.br/products/7896423413878",
        categoryID: candyCategory.id,
      },
      {
        name: "CHOCOLATE BRANCO COOKIES & CREAM ARCOR PACOTE 80G",
        slug: "choc-branco",
        sellPrice: 5.07,
        buyPrice: 5.07,
        barcode: "7898142863958",
        imageURL: "https://cdn-cosmos.bluesoft.com.br/products/7898142863958",
        categoryID: candyCategory.id,
      },
      {
        name: "CHOCOLATE BRANCO GAROTO BATON 16G",
        slug: "baton",
        sellPrice: 0.95,
        buyPrice: 0.25,
        barcode: "78912366",
        imageURL: "https://cdn-cosmos.bluesoft.com.br/products/78912366",
        categoryID: candyCategory.id,
      },
    ];
    await prisma.Product.createMany({
      data: candies,
    });
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
