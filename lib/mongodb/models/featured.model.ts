import { Document, Schema, model, models } from "mongoose";

export interface IFeatured extends Document {
  _id: string;
  prodId: string;
  title: string;
  description?: string;
  imageUrl: string;
  price: number;
  createdAt: Date;
}

const FeaturedSchema = new Schema({
  prodId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String, required: true },
  price: { type: Number, required: true },
  createdAt: { type: Date, required: true },
});

const Featured = models.Featured || model("Featured", FeaturedSchema);

export default Featured;
