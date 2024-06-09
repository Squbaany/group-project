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
  title: { type: String, required: true },
  prodId: { type: String },
  description: { type: String },
  imageUrl: { type: String, required: true },
  price: { type: Number },
  createdAt: { type: Date },
});

const Featured = models.Featured || model("Featured", FeaturedSchema);

export default Featured;
