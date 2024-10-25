import { db } from "@/lib/prisma";

const getCategories = async () => {
  const categories = db.category.findMany({});
  return categories;
};

export default getCategories;
