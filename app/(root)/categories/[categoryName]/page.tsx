"use client";

import ProductsShowcase from "@/components/shared/ProductsShowcase";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { getCategoryByName } from "@/lib/mongodb/actions/category.actions";
import { getProductsByCategory } from "@/lib/mongodb/actions/products.actions";
import { ProductId, categoryId } from "@/types";
import Link from "next/link";
import { useState, useEffect } from "react";

type CategoriesProps = {
  params: { categoryName: string };
};

export default function Categories({
  params: { categoryName },
}: CategoriesProps) {
  const [category, setCategory] = useState<categoryId>();
  const [products, setProducts] = useState<ProductId[]>();

  useEffect(() => {
    (async () => {
      try {
        const fetchedCategory = await getCategoryByName(categoryName);
        setCategory(fetchedCategory);

        const fetchedProducts = await getProductsByCategory(
          fetchedCategory._id
        );
        setProducts(fetchedProducts);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  if (!category || !products)
    return (
      <div className="wrapper h-full content-center">
        <div className="flex flex-col text-center">
          <h1 className="h4-medium">Ooops, something went wrong</h1>
          <Link href="/" className="p-semibold-18">
            Back to main page
          </Link>
        </div>
      </div>
    );

  return (
    <div className="wrapper flex flex-col md:flex-row">
      <div className="p-8 md:border-r">
        <h2 className="h5-bold mb-8">Filters</h2>
        <div className="flex flex-col gap-6">
          {category?.properties?.map((property) => (
            <div key={property.key} className="flex flex-col gap-3">
              <p className="p-medium-20">{property.key}</p>
              {property.value.map((value) => (
                <div key={value} className="flex flex-row gap-2 items-center">
                  <Checkbox id={value} value={value} onChange={() => {}} />
                  <Label htmlFor={value}>{value}</Label>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="p-8">
        <h2 className="h5-bold mb-8">Products</h2>
        <ProductsShowcase products={products} />
      </div>
    </div>
  );
}
