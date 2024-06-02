"use client";

type CategoriesProps = {
  params: { categoryName: string };
};

export default function Categories({
  params: { categoryName },
}: CategoriesProps) {
  return <div className="wrapper">{categoryName}</div>;
}
