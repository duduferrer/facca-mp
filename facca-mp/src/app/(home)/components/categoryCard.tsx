import { Card, CardContent } from "@/components/ui/card";
import { Category } from "@prisma/client";
import { CandyIcon, CupSodaIcon, SandwichIcon } from "lucide-react";
import Link from "next/link";

interface CategoryItem {
  category: Category;
}
const CategoryCard = ({ category }: CategoryItem) => {
  const categoryIcon = {
    bebidas: <CupSodaIcon width={20} />,
    doces: <CandyIcon width={20} />,
    salgados: <SandwichIcon width={20} />,
  };
  return (
    <Link href={category.slug}>
      <Card className="w-36">
        <CardContent className="font-semibold flex justify-center p-4 gap-3">
          {categoryIcon[category.slug as keyof typeof categoryIcon]}
          {category.name}
        </CardContent>
      </Card>
    </Link>
  );
};

export default CategoryCard;
