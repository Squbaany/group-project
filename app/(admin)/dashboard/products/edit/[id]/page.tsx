"use client";

import ProductForm from "@/components/admin/ProductForm";
import { getProductById } from "@/lib/mongodb/actions/products.actions";
import { usePathname } from "next/navigation";

export default async function EditProduct() {
  const path: string = usePathname();
  const id: string = path.slice(path.lastIndexOf("/") + 1, path.length);
  const product = await getProductById(id);

  return (
    <div className="bg-primary-300 flex flex-col mt-2 mr-2 rounded-lg p-4 mb-2">
      <h1>Edit product</h1>
      {product && <ProductForm {...product} />}
    </div>
  );
}
