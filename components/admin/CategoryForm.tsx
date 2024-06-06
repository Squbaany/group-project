"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { categoryId } from "@/types";

import {
  createCategory,
  updateCategory,
} from "@/lib/mongodb/actions/category.actions";

export default function CategoryForm(category: categoryId) {
  const router = useRouter();

  const [name, setName] = useState(category.name || "");
  const [properties, setProperties] = useState(category.properties || []);

  const handleSubmit = async () => {
    properties.forEach((el) => {
      if (typeof el.vals == "string") el.vals = el.vals.split(",");
    });

    const rawData = {
      name: name,
      properties: properties,
    };

    if (category._id) {
      await updateCategory(category._id, rawData);
    } else {
      await createCategory(rawData);
    }

    setName("");

    return router.push("/dashboard/categories");
  };

  function addProperty() {
    setProperties((prev) => {
      return [...prev, { key: "", vals: "" }];
    });
  }

  function handlePropertyName(property, index: number, newVal: string) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].key = newVal;
      return properties;
    });
  }

  function handlePropertyValues(property, index: number, newVal: string) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].vals = newVal;
      return properties;
    });
  }

  function removeProperty(indexToRemove: number) {
    setProperties((prev) => {
      return [...prev].filter((p, pIndex) => {
        return pIndex !== indexToRemove;
      });
    });
  }

  return (
    <>
      <form action={handleSubmit}>
        <label className="adminlabel">Category name</label>
        <input
          className="mb-0 mr-1 admininput"
          type="text"
          placeholder="category name"
          value={name}
          onChange={(v) => setName(v.target.value)}
        />

        <div className="mb-2">
          <label className="block adminlabel">Properties</label>
          <button type="button" className="btn-default" onClick={addProperty}>
            Add new property
          </button>
        </div>

        {properties.length > 0 &&
          properties.map((property, index) => (
            <div key={index} className="flex gap-1 mb-2">
              <input
                className="mb-0 admininput"
                type="text"
                value={property.key}
                onChange={(ev) =>
                  handlePropertyName(property, index, ev.target.value)
                }
                placeholder="property name"
              />
              <input
                className="mb-0 admininput"
                type="text"
                value={property.vals}
                onChange={(ev) =>
                  handlePropertyValues(property, index, ev.target.value)
                }
                placeholder="values, comma seperator"
              />
              <button
                type="button"
                className="btn-default w-full mb-2"
                onClick={() => removeProperty(index)}
              >
                Remove
              </button>
            </div>
          ))}

        <button type="submit" className="btn-primary">
          Save
        </button>
      </form>
    </>
  );
}
