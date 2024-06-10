"use server";

import { Product as ProdId } from "@/types";
import { connectToDatabase } from "..";
import Category from "../models/category.model";
import Featured from "@/lib/mongodb/models/featured.model";
import Product from "@/lib/mongodb/models/product.model";

export async function getFeatured() {
  try {
    await connectToDatabase();

    const product = await Featured.findOne();

    return JSON.parse(JSON.stringify(product));
  } catch (err) {
    console.log(err);
  }
}

export async function updateFeatured() {
  try {
    await connectToDatabase();

    await Featured.deleteOne();

    let featured;
    await Product.aggregate()
      .sample(1)
      .then((val: ProdId[]) => {
        featured = {
          prodId: val[0]._id,
          title: val[0].title,
          description: val[0].description,
          imageUrl: val[0].imageUrl,
          price: val[0].price,
          createdAt: Date.now(),
        };
      });

    const updatedFeatured = await Featured.create(featured);

    return JSON.parse(JSON.stringify(updatedFeatured));
  } catch (err) {
    console.log(err);
  }
}
