import Link from "next/link";
import Image from "next/image";
import React from "react";
import { CategoryLinks } from "@/constants";

const CategoriesShowcase = () => {
  return (
    <div className="items-center justify-center w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {CategoryLinks.map((category) => (
          <CategoryCard key={category.label} {...category} />
        ))}
      </div>
    </div>
  );
};

export default CategoriesShowcase;

type CategoryCardProps = {
  label: string;
  route: string;
  img: string;
};

const CategoryCard = (category: CategoryCardProps) => (
  <Link
    href={`/categories/${category.route}`}
    className="border-2 border-primary rounded-xl p-4 flex flex-col items-center justify-center hover:shadow-xl  hover:-translate-y-2 duration-200"
  >
    <Image src={category.img} alt={category.label} width={100} height={120} />
    <p className="p-bold-20">{category.label}</p>
  </Link>
);
