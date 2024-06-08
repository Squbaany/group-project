"use client";

import ProductsShowcase from "@/components/shared/ProductsShowcase";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { getCategoryByName } from "@/lib/mongodb/actions/category.actions";
import {
  getProductsByCategory,
  getProductsBySearch,
} from "@/lib/mongodb/actions/products.actions";
import { useDebounce } from "@/lib/useDebounce";
import { Product, categoryId } from "@/types";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

type CategoriesProps = {
  params: { categoryName: string };
};

export default function Categories({
  params: { categoryName },
}: CategoriesProps) {
  const [category, setCategory] = useState<categoryId>();
  const [products, setProducts] = useState<Product[]>();
  const [filters, setFilters] = useState<string[]>([]);

  const debouncedFilters = useDebounce(filters, 1000);

  function toggleFilter(value: string) {
    setFilters((prev) => {
      if (prev?.includes(value)) {
        return prev?.filter((filter) => filter !== value);
      }

      return [...(prev || []), value];
    });
  }

  useEffect(() => {
    if (debouncedFilters.length > 0) {
      (async () => {
        try {
          const fetchedCategory = await getCategoryByName(categoryName);

          setCategory(fetchedCategory);

          const fetchedProducts = await getProductsBySearch(
            debouncedFilters,
            fetchedCategory._id
          );

          setProducts(fetchedProducts);
        } catch (error) {
          console.log(error);
        }
      })();
    } else {
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
    }
  }, [debouncedFilters]);

  if (!category || !products)
    return (
      <div className="wrapper h-full content-center">
        <div className="flex flex-col text-center items-center">
          <Loader2 />
        </div>
      </div>
    );

  return (
    <div className="wrapper flex flex-col md:flex-row">
      <div className="p-8 md:border-r min-w-fit">
        <h2 className="h5-bold mb-8">Filters</h2>
        <div className="flex flex-col gap-6">
          {category?.properties?.map((property) => (
            <div key={property.key} className="flex flex-col gap-3">
              <p className="p-medium-20">{property.key}</p>
              {property.value.map((value) => (
                <div key={value} className="flex flex-row gap-2 items-center">
                  <Checkbox
                    id={value}
                    onCheckedChange={() => toggleFilter(value)}
                    checked={filters?.includes(value)}
                  />
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
