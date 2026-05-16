require("dotenv").config();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Garantir que as categorias existam (upsert por slug)
  const bebidas = await prisma.category.upsert({
    where: { id: (await prisma.category.findFirst({ where: { slug: "bebidas" } }))?.id ?? "" },
    update: {},
    create: { name: "Bebidas", slug: "bebidas" },
  });

  const salgados = await prisma.category.upsert({
    where: { id: (await prisma.category.findFirst({ where: { slug: "salgados" } }))?.id ?? "" },
    update: {},
    create: { name: "Salgados", slug: "salgados" },
  });

  const doces = await prisma.category.upsert({
    where: { id: (await prisma.category.findFirst({ where: { slug: "doces" } }))?.id ?? "" },
    update: {},
    create: { name: "Doces", slug: "doces" },
  });

  const bebidasId = bebidas.id;
  const salgadosId = salgados.id;
  const docesId = doces.id;

  const products = [
    // ===================== BEBIDAS (17) =====================
    { name: "Água Mineral Crystal 500ml",        slug: "agua-crystal-500ml",      sellPrice: 2.50,  buyPrice: 1.20,  barcode: "7891238003056", imageURL: "https://cdn-cosmos.bluesoft.com.br/products/7891238003056", categoryID: bebidasId, stock: 40 },
    { name: "Água com Gás Pedra 500ml",           slug: "agua-gas-pedra-500ml",    sellPrice: 3.00,  buyPrice: 1.50,  barcode: "7896004904024", imageURL: "https://cdn-cosmos.bluesoft.com.br/products/7896004904024", categoryID: bebidasId, stock: 30 },
    { name: "Coca-Cola Lata 350ml",               slug: "coca-cola-lata-350ml",    sellPrice: 4.50,  buyPrice: 2.80,  barcode: "7894900011517", imageURL: "https://cdn-cosmos.bluesoft.com.br/products/7894900011517", categoryID: bebidasId, stock: 60 },
    { name: "Coca-Cola Zero Lata 350ml",          slug: "coca-zero-lata-350ml",    sellPrice: 4.50,  buyPrice: 2.80,  barcode: "7894900700060", imageURL: "https://cdn-cosmos.bluesoft.com.br/products/7894900700060", categoryID: bebidasId, stock: 50 },
    { name: "Guaraná Antarctica Lata 350ml",      slug: "guarana-lata-350ml",      sellPrice: 4.00,  buyPrice: 2.50,  barcode: "7891991299029", imageURL: "https://cdn-cosmos.bluesoft.com.br/products/7891991299029", categoryID: bebidasId, stock: 55 },
    { name: "Fanta Laranja Lata 350ml",           slug: "fanta-laranja-lata",      sellPrice: 4.00,  buyPrice: 2.50,  barcode: "7894900027006", imageURL: "https://cdn-cosmos.bluesoft.com.br/products/7894900027006", categoryID: bebidasId, stock: 40 },
    { name: "Sprite Lata 350ml",                  slug: "sprite-lata-350ml",       sellPrice: 4.00,  buyPrice: 2.50,  barcode: "7894900014150", imageURL: "https://cdn-cosmos.bluesoft.com.br/products/7894900014150", categoryID: bebidasId, stock: 35 },
    { name: "Red Bull 250ml",                     slug: "red-bull-250ml",          sellPrice: 9.90,  buyPrice: 6.50,  barcode: "90162705",       imageURL: "https://cdn-cosmos.bluesoft.com.br/products/90162705",      categoryID: bebidasId, stock: 25 },
    { name: "Monster Energy Green 473ml",         slug: "monster-green-473ml",     sellPrice: 10.90, buyPrice: 7.00,  barcode: "70847020019",    imageURL: "https://cdn-cosmos.bluesoft.com.br/products/70847020019",   categoryID: bebidasId, stock: 20 },
    { name: "Suco Del Valle Uva 200ml",           slug: "delvalle-uva-200ml",      sellPrice: 3.50,  buyPrice: 1.80,  barcode: "7894900525601", imageURL: "https://cdn-cosmos.bluesoft.com.br/products/7894900525601", categoryID: bebidasId, stock: 45 },
    { name: "Suco Del Valle Laranja 200ml",       slug: "delvalle-laranja-200ml",  sellPrice: 3.50,  buyPrice: 1.80,  barcode: "7894900525618", imageURL: "https://cdn-cosmos.bluesoft.com.br/products/7894900525618", categoryID: bebidasId, stock: 45 },
    { name: "Iced Tea Lipton Pêssego 1L",         slug: "lipton-pessego-1l",       sellPrice: 6.90,  buyPrice: 4.00,  barcode: "7891991019279", imageURL: "https://cdn-cosmos.bluesoft.com.br/products/7891991019279", categoryID: bebidasId, stock: 30 },
    { name: "Leite Ninho Inteiro 200ml",          slug: "ninho-200ml",             sellPrice: 3.00,  buyPrice: 1.60,  barcode: "7613036261128", imageURL: "https://cdn-cosmos.bluesoft.com.br/products/7613036261128", categoryID: bebidasId, stock: 35 },
    { name: "Achocolatado Toddynho 200ml",        slug: "toddynho-200ml",          sellPrice: 2.50,  buyPrice: 1.20,  barcode: "7892840803681", imageURL: "https://cdn-cosmos.bluesoft.com.br/products/7892840803681", categoryID: bebidasId, stock: 60 },
    { name: "Café Pilão 3 Corações Sachê 50g",    slug: "cafe-3coracoes-sache",    sellPrice: 2.00,  buyPrice: 0.90,  barcode: "7896045100548", imageURL: "https://cdn-cosmos.bluesoft.com.br/products/7896045100548", categoryID: bebidasId, stock: 50 },
    { name: "Isotônico Gatorade Laranja 500ml",   slug: "gatorade-laranja-500ml",  sellPrice: 6.50,  buyPrice: 4.00,  barcode: "7892840818142", imageURL: "https://cdn-cosmos.bluesoft.com.br/products/7892840818142", categoryID: bebidasId, stock: 25 },
    { name: "Água de Coco Kero Coco 1L",          slug: "kerococo-1l",             sellPrice: 7.90,  buyPrice: 5.00,  barcode: "7896336401015", imageURL: "https://cdn-cosmos.bluesoft.com.br/products/7896336401015", categoryID: bebidasId, stock: 20 },

    // ===================== SALGADOS (17) =====================
    { name: "Batata Pringles Original 109g",      slug: "pringles-original-109g",  sellPrice: 15.90, buyPrice: 10.00, barcode: "38000845263",    imageURL: "https://cdn-cosmos.bluesoft.com.br/products/38000845263",   categoryID: salgadosId, stock: 20 },
    { name: "Batata Pringles Queijo 109g",        slug: "pringles-queijo-109g",    sellPrice: 15.90, buyPrice: 10.00, barcode: "38000112490",    imageURL: "https://cdn-cosmos.bluesoft.com.br/products/38000112490",   categoryID: salgadosId, stock: 20 },
    { name: "Ruffles Original 57g",               slug: "ruffles-original-57g",    sellPrice: 5.50,  buyPrice: 3.20,  barcode: "7892840813987", imageURL: "https://cdn-cosmos.bluesoft.com.br/products/7892840813987", categoryID: salgadosId, stock: 40 },
    { name: "Ruffles Cheddar 57g",                slug: "ruffles-cheddar-57g",     sellPrice: 5.50,  buyPrice: 3.20,  barcode: "7892840804572", imageURL: "https://cdn-cosmos.bluesoft.com.br/products/7892840804572", categoryID: salgadosId, stock: 40 },
    { name: "Doritos Nacho 54g",                  slug: "doritos-nacho-54g",       sellPrice: 5.50,  buyPrice: 3.00,  barcode: "7892840803070", imageURL: "https://cdn-cosmos.bluesoft.com.br/products/7892840803070", categoryID: salgadosId, stock: 35 },
    { name: "Doritos Queijo Nacho 54g",           slug: "doritos-queijo-54g",      sellPrice: 5.50,  buyPrice: 3.00,  barcode: "7892840015017", imageURL: "https://cdn-cosmos.bluesoft.com.br/products/7892840015017", categoryID: salgadosId, stock: 35 },
    { name: "Cheetos Crunchy 45g",                slug: "cheetos-crunchy-45g",     sellPrice: 4.50,  buyPrice: 2.50,  barcode: "7892840215972", imageURL: "https://cdn-cosmos.bluesoft.com.br/products/7892840215972", categoryID: salgadosId, stock: 50 },
    { name: "Fandangos Bacon 87g",                slug: "fandangos-bacon-87g",     sellPrice: 6.90,  buyPrice: 4.00,  barcode: "7892840222956", imageURL: "https://cdn-cosmos.bluesoft.com.br/products/7892840222956", categoryID: salgadosId, stock: 30 },
    { name: "Tortilhas Barcel 140g",              slug: "tortilhas-barcel-140g",   sellPrice: 8.90,  buyPrice: 5.50,  barcode: "7501023208051", imageURL: "https://cdn-cosmos.bluesoft.com.br/products/7501023208051", categoryID: salgadosId, stock: 25 },
    { name: "Biscoito Cream Cracker Nestlé 200g", slug: "cream-cracker-nestle",    sellPrice: 4.90,  buyPrice: 2.80,  barcode: "7613036277526", imageURL: "https://cdn-cosmos.bluesoft.com.br/products/7613036277526", categoryID: salgadosId, stock: 30 },
    { name: "Biscoito Club Social Original 141g", slug: "club-social-original",    sellPrice: 5.50,  buyPrice: 3.20,  barcode: "7622300980986", imageURL: "https://cdn-cosmos.bluesoft.com.br/products/7622300980986", categoryID: salgadosId, stock: 35 },
    { name: "Biscoito Trissê Queijo 60g",         slug: "trisse-queijo-60g",       sellPrice: 3.00,  buyPrice: 1.50,  barcode: "7896045108063", imageURL: "https://cdn-cosmos.bluesoft.com.br/products/7896045108063", categoryID: salgadosId, stock: 40 },
    { name: "Amendoim Japonês Elma Chips 150g",   slug: "amendoim-japones-150g",   sellPrice: 7.90,  buyPrice: 5.00,  barcode: "7892840210830", imageURL: "https://cdn-cosmos.bluesoft.com.br/products/7892840210830", categoryID: salgadosId, stock: 25 },
    { name: "Pipoca de Microondas Yoki Manteiga", slug: "pipoca-yoki-manteiga",    sellPrice: 4.90,  buyPrice: 2.80,  barcode: "7896004500043", imageURL: "https://cdn-cosmos.bluesoft.com.br/products/7896004500043", categoryID: salgadosId, stock: 30 },
    { name: "Salgadinho Baconzitos 87g",          slug: "baconzitos-87g",          sellPrice: 5.90,  buyPrice: 3.50,  barcode: "7892840813741", imageURL: "https://cdn-cosmos.bluesoft.com.br/products/7892840813741", categoryID: salgadosId, stock: 35 },
    { name: "Lays Maionese 45g",                  slug: "lays-maionese-45g",       sellPrice: 4.50,  buyPrice: 2.50,  barcode: "7892840014584", imageURL: "https://cdn-cosmos.bluesoft.com.br/products/7892840014584", categoryID: salgadosId, stock: 40 },
    { name: "Nissin Lámen Galinha Caipira 85g",   slug: "nissin-galinha-85g",      sellPrice: 2.50,  buyPrice: 1.20,  barcode: "7891903068085", imageURL: "https://cdn-cosmos.bluesoft.com.br/products/7891903068085", categoryID: salgadosId, stock: 50 },

    // ===================== DOCES (16) =====================
    { name: "Chocolate Bis Ao Leite 100g",        slug: "bis-ao-leite-100g",       sellPrice: 6.90,  buyPrice: 4.00,  barcode: "7622210511973", imageURL: "https://cdn-cosmos.bluesoft.com.br/products/7622210511973", categoryID: docesId, stock: 30 },
    { name: "Chocolate Bis Branco 100g",          slug: "bis-branco-100g",         sellPrice: 6.90,  buyPrice: 4.00,  barcode: "7622300871758", imageURL: "https://cdn-cosmos.bluesoft.com.br/products/7622300871758", categoryID: docesId, stock: 25 },
    { name: "Kitkat Original 45g",                slug: "kitkat-original-45g",     sellPrice: 5.50,  buyPrice: 3.20,  barcode: "7613035846951", imageURL: "https://cdn-cosmos.bluesoft.com.br/products/7613035846951", categoryID: docesId, stock: 35 },
    { name: "Snickers 52g",                       slug: "snickers-52g",            sellPrice: 5.90,  buyPrice: 3.50,  barcode: "4000417030009", imageURL: "https://cdn-cosmos.bluesoft.com.br/products/4000417030009", categoryID: docesId, stock: 30 },
    { name: "Twix 40g",                           slug: "twix-40g",                sellPrice: 5.50,  buyPrice: 3.20,  barcode: "4000417030108", imageURL: "https://cdn-cosmos.bluesoft.com.br/products/4000417030108", categoryID: docesId, stock: 30 },
    { name: "M&M's Ao Leite 80g",                 slug: "mms-ao-leite-80g",        sellPrice: 7.90,  buyPrice: 5.00,  barcode: "7896423413809", imageURL: "https://cdn-cosmos.bluesoft.com.br/products/7896423413809", categoryID: docesId, stock: 25 },
    { name: "Barra Lacta Ao Leite 90g",           slug: "lacta-ao-leite-90g",      sellPrice: 6.50,  buyPrice: 4.00,  barcode: "7622300494018", imageURL: "https://cdn-cosmos.bluesoft.com.br/products/7622300494018", categoryID: docesId, stock: 35 },
    { name: "Barra Lacta Oreo 90g",               slug: "lacta-oreo-90g",          sellPrice: 7.50,  buyPrice: 4.50,  barcode: "7622300481391", imageURL: "https://cdn-cosmos.bluesoft.com.br/products/7622300481391", categoryID: docesId, stock: 30 },
    { name: "Trident Melancia 8g",                slug: "trident-melancia-8g",     sellPrice: 2.50,  buyPrice: 1.20,  barcode: "7622210707505", imageURL: "https://cdn-cosmos.bluesoft.com.br/products/7622210707505", categoryID: docesId, stock: 60 },
    { name: "Halls Menta 28g",                    slug: "halls-menta-28g",         sellPrice: 2.90,  buyPrice: 1.50,  barcode: "7622210702692", imageURL: "https://cdn-cosmos.bluesoft.com.br/products/7622210702692", categoryID: docesId, stock: 60 },
    { name: "Bala Fini Ursinho 22g",              slug: "fini-ursinho-22g",        sellPrice: 2.00,  buyPrice: 1.00,  barcode: "8410525025282", imageURL: "https://cdn-cosmos.bluesoft.com.br/products/8410525025282", categoryID: docesId, stock: 70 },
    { name: "Pirulito Pop Bala Morango",          slug: "pop-bala-morango",        sellPrice: 1.50,  buyPrice: 0.60,  barcode: "7898915890168", imageURL: "https://cdn-cosmos.bluesoft.com.br/products/7898915890168", categoryID: docesId, stock: 80 },
    { name: "Wafer Bauducco Chocolate 78g",       slug: "wafer-bauducco-choco",    sellPrice: 3.50,  buyPrice: 1.80,  barcode: "7896067002399", imageURL: "https://cdn-cosmos.bluesoft.com.br/products/7896067002399", categoryID: docesId, stock: 40 },
    { name: "Biscoito Recheado Oreo 36g",         slug: "oreo-36g",                sellPrice: 3.00,  buyPrice: 1.50,  barcode: "7622300948628", imageURL: "https://cdn-cosmos.bluesoft.com.br/products/7622300948628", categoryID: docesId, stock: 50 },
    { name: "Paçoca Rolha Santa Helena 20g",      slug: "pacoca-rolha-20g",        sellPrice: 1.50,  buyPrice: 0.70,  barcode: "7896064201029", imageURL: "https://cdn-cosmos.bluesoft.com.br/products/7896064201029", categoryID: docesId, stock: 60 },
    { name: "Chocolate Suflair 50g",              slug: "suflair-50g",             sellPrice: 5.50,  buyPrice: 3.20,  barcode: "7622300481421", imageURL: "https://cdn-cosmos.bluesoft.com.br/products/7622300481421", categoryID: docesId, stock: 30 },
  ];

  const result = await prisma.product.createMany({
    data: products,
    skipDuplicates: true,
  });

  console.log(`✅ ${result.count} produtos inseridos com sucesso!`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error("❌ Erro ao inserir produtos:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
