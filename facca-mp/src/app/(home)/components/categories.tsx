import { db } from "@/lib/prisma";
import CategoryCard from "./categoryCard";

const Categories = async () => {
  const categories = await db.category.findMany({});
  return (
    <div className="flex justify-around">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category}></CategoryCard>
      ))}
    </div>
  );
};

export default Categories;
