"use client";

import {
  getProductById,
  deleteProduct,
} from "@/lib/mongodb/actions/products.actions";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { deleteProdName } from "@/types";

export default function DeleteProducts() {
  const router = useRouter();

  const path: string = usePathname();
  const id: string = path.slice(path.lastIndexOf("/") + 1, path.length);

  const [product, setProduct] = useState<deleteProdName>({ title: "" });

  useEffect(() => {
    (async () => {
      const data = await getProductById(id);
      setProduct(data);
    })();
  }, []);

  function goBack() {
    return router.push("/dashboard/products");
  }

  async function delProduct() {
    await deleteProduct(id);
    return router.push("/dashboard/products");
  }

  return (
    <div className="bg-primary-300 flex-grow mt-2 mr-2 rounded-lg p-4 mb-2">
      <h1 className="text-center">
        Do you really want to delete product &quot;{product.title}&quot;
      </h1>

      <div className="flex gap-2 justify-center">
        <button className="btn-red" onClick={delProduct}>
          Yes
        </button>
        <button className="btn-default" onClick={goBack}>
          No
        </button>
      </div>
    </div>
  );
}
