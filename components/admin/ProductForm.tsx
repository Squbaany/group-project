"use client";

import { useRouter } from "next/navigation";
import { CreateProductParams, ProductId } from "@/types";
import { useEffect, useState } from "react";
import { getCategories } from "@/lib/mongodb/actions/category.actions";
import {
  updateProduct,
  createProduct,
} from "@/lib/mongodb/actions/products.actions";
import { useUploadThing } from "@/lib/uploadthing";
import { FileUploader } from "./FileUploader";

export default function ProductForm(product: ProductId) {
  const router = useRouter();

  const [name, setName] = useState(product.title || "");
  const [category, setCategory] = useState(product.category || "");
  const [description, setDescription] = useState(product.description || "");
  const [price, setPrice] = useState(product.price || "");
  const [image, setImage] = useState(product.imageUrl || "");

  const [files, setFiles] = useState<File[]>([]);
  const [categories, setCategories] = useState([]);
  const [properties, setProperties] = useState(product.properties || []);

  const { startUpload } = useUploadThing("imageUploader");

  const handleSubmit = async () => {
    const rawData: CreateProductParams = {
      title: name,
      description: description,
      imageUrl: image,
      price: +price,
      category: category,
      properties: properties,
    };

    if (files.length > 0) {
      const uploadImages = await startUpload(files);
      if (!uploadImages) return;

      rawData.imageUrl = uploadImages[0].url;
    }

    if (product._id) {
      await updateProduct(product._id, rawData);
    } else {
      await createProduct(rawData);
    }

    return router.push("/dashboard/products");
  };

  useEffect(() => {
    (async () => {
      const data = await getCategories();
      setCategories(data);
    })();
  }, []);

  const propertiesToFill = [];
  if (categories.length > 0 && category) {
    const selectedCat: any = categories.find(({ _id }) => _id === category);
    propertiesToFill.push(...selectedCat?.properties);
  }

  function setProductProp(propKey: string, selVal: string) {
    setProperties((prev) => {
      const prevTab: { key: string; value: string }[] = [...prev];

      if (prevTab.find((el) => el.key === propKey)) {
        const idx = prevTab.findIndex((el) => el.key === propKey);
        prevTab[idx].value = selVal;
        return prevTab;
      } else {
        const propsToAdd = { key: propKey, value: selVal };
        return [...prev, propsToAdd];
      }
    });
  }

  return (
    <>
      <form action={handleSubmit}>
        <label className="adminlabel">Product name</label>
        <input
          type="text"
          placeholder="product name"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
          className="admininput"
        />

        <label className="adminlabel">Image</label>

        <FileUploader
          onFieldChange={setImage}
          imageUrl={image}
          setFiles={setFiles}
        />

        <label className="adminlabel">Category</label>
        <select
          name="category"
          value={category}
          onChange={(ev) => setCategory(ev.target.value)}
          className="admininput"
        >
          <option value="">Uncategorized</option>
          {categories.map((c: any) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
        {categories.length > 0 && category && (
          <div>
            {propertiesToFill.length > 0 &&
              propertiesToFill.map((p) => (
                <div className="flex gap-1" key={p.key}>
                  <div>{p.key}</div>
                  <select
                    className="admininput"
                    //@ts-ignore
                    value={
                      product._id
                        ? properties[
                            properties.findIndex((el) => el.key === p.key)
                          ].value
                        : properties[p._id]
                    }
                    onChange={(ev) => setProductProp(p.key, ev.target.value)}
                  >
                    <option value="None">None</option>
                    {p.value.map((v: string) => (
                      <option value={v} key={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
          </div>
        )}

        <label className="adminlabel">Description</label>
        <textarea
          placeholder="description"
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
          className="admininput"
        ></textarea>

        <label className="adminlabel">Price</label>
        <input
          type="number"
          step="0.01"
          placeholder="price"
          value={price}
          onChange={(ev) => setPrice(+ev.target.value)}
          className="admininput"
        />

        <button type="submit" className="btn-primary">
          Save
        </button>
      </form>
    </>
  );
}
