import { Schema, model, models, Document } from "mongoose";

export interface ICategory extends Document {
  _id: string;
  name: string;
  properties: { key: string; value: string[] }[];
}

const CategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  properties: [
    {
      key: { type: String },
      value: [{ type: String }],
    },
  ],
});

const Category = models.Category || model("Category", CategorySchema);

export default Category;
