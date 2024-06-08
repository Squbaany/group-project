import { Filter } from "@/components/shared/Filters";
import ProductsShowcase from "@/components/shared/ProductsShowcase";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { getCategoryById } from "@/lib/mongodb/actions/category.actions";
import {
  getProductsByCategory,
  getProductsBySearch,
} from "@/lib/mongodb/actions/products.actions";
import { Category, Product } from "@/types";
import { Loader2 } from "lucide-react";

type CategoriesProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Categories({
  params: { id },
  searchParams,
}: CategoriesProps) {
  const category = (await getCategoryById(id)) as Category;

  const paramsSearch = (searchParams.search as string) || "";

  const searched = paramsSearch ? JSON.parse(paramsSearch) : [];

  const products = paramsSearch
    ? ((await getProductsBySearch(searched, id)) as Product[])
    : ((await getProductsByCategory(id)) as Product[]);

  return (
    <div className="wrapper flex flex-col md:flex-row">
      <div className="p-8 md:border-r min-w-fit">
        <h2 className="h5-bold mb-8">Filters</h2>
        <Filter id={id} />
      </div>
      <div className="p-8">
        <h2 className="h5-bold mb-8">Products</h2>
        <ProductsShowcase products={products} />
      </div>
    </div>
  );
}
