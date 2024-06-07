"use server";

import { CreateProductParams } from "@/types";
import { connectToDatabase } from "..";
import Product from "../models/product.model";

export async function createProduct(product: CreateProductParams) {
  try {
    await connectToDatabase();

    const newProduct = await Product.create(product);

    return JSON.parse(JSON.stringify(newProduct));
  } catch (err) {
    console.log(err);
  }
}

export async function getProducts(limit?: number) {
  try {
    await connectToDatabase();

    var products = {};

    if (!limit) {
      products = await Product.find().populate("category", "_id name");
    } else {
      products = await Product.find()
        .populate("category", "_id name")
        .limit(limit);
    }

    return JSON.parse(JSON.stringify(products));
  } catch (err) {
    console.log(err);
  }
}

export async function getProductsByCategory(id: string) {
  try {
    await connectToDatabase();

    const products = await Product.find({ category: id }).populate(
      "category",
      "_id name"
    );

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
