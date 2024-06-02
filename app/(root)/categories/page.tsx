"use client";

import { useCategory } from "@/context/Category/CategoryContext";

export default function Categories() {
  const { category } = useCategory();

  return <div className="wrapper">{category}</div>;
}
