"use server";

import getCategories from "@/app/utils/db/getCategories";

export interface catOptionI {
  value: string;
  label: string;
}

const CategoryOptions = async () => {
  const categories = await getCategories();
  const categoryOptions = categories.map((category) => {
    return {
      value: category.id,
      label: category.name,
    };
  });
  return categoryOptions;
};
export default CategoryOptions;
