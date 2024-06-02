import { Document, Schema, model, models } from "mongoose";

export interface IProduct extends Document {
  _id: string;
  title: string;
  description?: string;
  imageUrl: string;
  price: number;
  category: { _id: string; name: string };
  properties: { key: string; value: string }[];
}

const ProductSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String, required: true },
  price: { type: Number },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  properties: [
    {
      key: { type: String },
      value: { type: String },
    },
  ],
});

const Event = models.Event || model("Product", ProductSchema);

export default Event;
