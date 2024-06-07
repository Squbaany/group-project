"use server";

import { CreateCategoryParams } from "@/types";
import Category from "../models/category.model";

import { connectToDatabase } from "..";

export async function createCategory({
  name,
  properties,
}: CreateCategoryParams) {
  try {
    await connectToDatabase();

    const newCategory = await Category.create({
      name: name,
      properties: properties,
    });

    return JSON.parse(JSON.stringify(newCategory));
  } catch (err) {
    console.log(err);
  }
}

export async function getCategories() {
  try {
    await connectToDatabase();

    const categories = await Category.find();

    return JSON.parse(JSON.stringify(categories));
  } catch (err) {
    console.log(err);
  }
}

export async function getCategoryById(id: string) {
  try {
    await connectToDatabase();

    const category = await Category.findOne({ _id: id });

    return JSON.parse(JSON.stringify(category));
  } catch (err) {
    console.log(err);
  }
}

export async function getCategoryByName(name: string) {
  try {
    await connectToDatabase();

    const category = await Category.findOne({ name: name });

    return JSON.parse(JSON.stringify(category));
  } catch (err) {
    console.log(err);
  }
}

export async function updateCategory(
  id: string,
  category: CreateCategoryParams
) {
  try {
    await connectToDatabase();

    console.log(category);
    const updatedCategory = await Category.updateOne({ _id: id }, category);

    return JSON.parse(JSON.stringify(updatedCategory));
  } catch (err) {
    console.log(err);
  }
}

export async function deleteCategory(id: string) {
  try {
    await connectToDatabase();

    const delCategory = await Category.deleteOne({ _id: id });
    console.log(delCategory);

    return;
  } catch (err) {
    console.log(err);
  }
}
