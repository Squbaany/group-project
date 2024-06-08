"use server";

import { CreateProductParams, ProductId } from "@/types";
import { connectToDatabase } from "..";
import Product, { IProduct } from "../models/product.model";
import Category from "../models/category.model";

export async function createProduct(product: CreateProductParams) {
  try {
    await connectToDatabase();

    const newProduct = await Product.create(product);

    return JSON.parse(JSON.stringify(newProduct));
  } catch (err) {
    console.log(err);
  }
}

export async function getProducts() {
  try {
    await connectToDatabase();

    const products = await Product.find().populate({
      path: "category",
      model: Category,
      select: "_id name",
    });

    return JSON.parse(JSON.stringify(products));
  } catch (err) {
    console.log(err);
  }
}

export async function getProductsByQuery(limit = 4) {
  try {
    await connectToDatabase();

    const products = await Product.find()
      .populate({
        path: "category",
        model: Category,
        select: "_id name",
      })
      .limit(limit);

    return JSON.parse(JSON.stringify(products));
  } catch (err) {
    console.log(err);
  }
}

export async function getProductsBySearch(
  search: Record<string, string[]>,
  id: string
) {
  try {
    await connectToDatabase();

    const products = await Product.find({
      category: id,
      properties: { $elemMatch: { value: { $in: search } } },
    }).populate({
      path: "category",
      model: Category,
      select: "_id name",
    });

    return JSON.parse(JSON.stringify(products));
  } catch (err) {
    console.log(err);
  }
}

export async function getProductsByCategory(id: string) {
  try {
    await connectToDatabase();

    const products = await Product.find({ category: id }).populate({
      path: "category",
      model: Category,
      select: "_id name",
    });

    return JSON.parse(JSON.stringify(products));
  } catch (err) {
    console.log(err);
  }
}

export async function getRelatedProducts(product: ProductId) {
  try {
    await connectToDatabase();

    const conditions = {
      $and: [{ category: product.category }, { _id: { $ne: product._id } }],
    };

    const products = await Product.find(conditions).populate({
      path: "category",
      model: Category,
      select: "_id name",
    });

    return JSON.parse(JSON.stringify(products));
  } catch (err) {
    console.log(err);
  }
}

export async function getProductById(id: string) {
  try {
    await connectToDatabase();

    const products = await Product.findOne({ _id: id });

    return JSON.parse(JSON.stringify(products));
  } catch (err) {
    console.log(err);
  }
}

export async function updateProduct(id: string, product: CreateProductParams) {
  try {
    await connectToDatabase();

    const updatedProduct = await Product.updateOne({ _id: id }, product);

    return JSON.parse(JSON.stringify(updatedProduct));
  } catch (err) {
    console.log(err);
  }
}

export async function deleteProduct(id: string) {
  try {
    await connectToDatabase();

    const delProduct = await Product.deleteOne({ _id: id });

    return;
  } catch (err) {
    console.log(err);
  }
}
