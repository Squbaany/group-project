import { Schema, model, models, Document } from "mongoose";

export interface IOrder extends Document {
  createdAt: Date;
  stripeId: string;
  totalAmount: string;
  items: { id: string; quantity: number }[];
  buyer: {
    _id: string;
    firstName: string;
    lastName: string;
  };
}

const OrderSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  stripeId: {
    type: String,
    required: true,
    unique: true,
  },
  totalAmount: {
    type: String,
  },
  items: [
    {
      id: {
        type: Schema.Types.ObjectId,
        ref: "Event",
      },
      quantity: {
        type: Number,
      },
    },
  ],
  buyer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Order = models.Order || model("Order", OrderSchema);

export default Order;
