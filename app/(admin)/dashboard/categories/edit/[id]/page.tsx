"use client";

import CategoryForm from "@/components/admin/CategoryForm";
import { getCategoryById } from "@/lib/mongodb/actions/category.actions";
import { usePathname } from "next/navigation";

export default async function EditCategory() {
  const path: string = usePathname();
  const id: string = path.slice(path.lastIndexOf("/") + 1, path.length);
  const category = await getCategoryById(id);

  return (
    <div className="bg-primary-300 flex flex-col mt-2 mr-2 rounded-lg p-4 mb-2">
      <h1>Edit Category</h1>
      {category && <CategoryForm {...category} />}
    </div>
  );
}
