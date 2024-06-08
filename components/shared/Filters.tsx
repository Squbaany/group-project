"use client";

import { getCategoryById } from "@/lib/mongodb/actions/category.actions";
import { Category } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

export const Filter = ({ id }: { id: string }) => {
  const router = useRouter();
  const [category, setCategory] = useState<Category>();
  const searchParams = useSearchParams();

  const searched = JSON.parse(searchParams.get("search") || "[]");

  useEffect(() => {
    const getCategories = async () => {
      const fetchedCategory = await getCategoryById(id);

      setCategory(fetchedCategory as Category);
    };

    getCategories();
  }, []);

  const onFilterChange = (value: string) => {
    var newUrl = "";

    if (searched.includes(value)) {
      const newSearch = searched.filter((search: string) => search !== value);

      if (newSearch.length === 0) {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["search"],
        });
      } else {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          value: JSON.stringify(newSearch),
          key: "search",
        });
      }
    } else {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        value: JSON.stringify([...searched, value]),
        key: "search",
      });
    }

    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="flex flex-col gap-6">
      {category?.properties?.map((property) => (
        <div key={property.key} className="flex flex-col gap-3">
          <p className="p-medium-20">{property.key}</p>
          {property.value.map((value) => (
            <div key={value} className="flex flex-row gap-2 items-center">
              <Checkbox
                id={value}
                onCheckedChange={() => onFilterChange(value)}
                checked={searched.includes(value)}
              />
              <Label htmlFor={value}>{value}</Label>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
