"use client";

import CategoryForm from "@/components/admin/CategoryForm";
import { getCategoryById } from "@/lib/mongodb/actions/category.actions";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { categoryId } from "@/types";

export default function EditCategory() {
  const path: string = usePathname();
  const id: string = path.slice(path.lastIndexOf("/") + 1, path.length);

  const [category, setCategory] = useState<categoryId>();

  useEffect(() => {
    (async () => {
      const data = await getCategoryById(id);
      setCategory(data);
    })();
  }, [id]);

  if (!category) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-primary-300 flex flex-col mt-2 mr-2 rounded-lg p-4 mb-2">
      <h1>Edit Category</h1>
      {category && <CategoryForm {...category} />}
    </div>
  );
}
