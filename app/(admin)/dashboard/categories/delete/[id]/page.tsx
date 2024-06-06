"use client";
import {
  getCategoryById,
  deleteCategory,
} from "@/lib/mongodb/actions/category.actions";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DeleteCategory() {
  const router = useRouter();

  const path: string = usePathname();
  const id: string = path.slice(path.lastIndexOf("/") + 1, path.length);

  const [category, setCategory] = useState({ name: "" });

  useEffect(() => {
    (async () => {
      const data = await getCategoryById(id);
      setCategory(data);
    })();
  }, [id]);

  function goBack() {
    return router.push("/dashboard/products");
  }

  async function delCategory() {
    await deleteCategory(id);
    return router.push("/dashboard/categories");
  }

  return (
    <>
      <h1 className="text-center">
        Do you really want to delete product &quot;{category!.name}&quot;
      </h1>

      <div className="flex gap-2 justify-center">
        <button className="btn-red" onClick={delCategory}>
          Yes
        </button>
        <button className="btn-default" onClick={goBack}>
          No
        </button>
      </div>
    </>
  );
}
