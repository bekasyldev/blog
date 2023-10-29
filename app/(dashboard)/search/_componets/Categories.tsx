"use client";

import { Category } from "@prisma/client";

import {
  FcFilmReel,
  FcMusic,
  FcSportsMode,
  FcOldTimeCamera,
  FcSalesPerformance,
  FcShop,
} from "react-icons/fc";

import { IconType } from "react-icons";
import CategoryItem from "./CategoryItem";

interface CategoriesProps {
  items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
  Music: FcMusic,
  Travel: FcOldTimeCamera,
  "Health and Fitness": FcSportsMode,
  Technology: FcSalesPerformance,
  "Fashion and Lifestyle": FcOldTimeCamera,
  "Food and Cooking": FcFilmReel,
};

const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2 px-16">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  );
};

export default Categories;
