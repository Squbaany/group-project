import { Schema, model, models, Document } from "mongoose";

export interface IOrder extends Document {
  createdAt: Date;
  stripeId: string;
  totalAmount: string;
  items: {
    product: { _id: string; title: string; price: string };
    quantity: number;
  }[];
  buyer: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  address: {
    street: string;
    postalcode: string;
    city: string;
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
        ref: "Product",
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
  address: {
    street: {
      type: String,
    },
    postalcode: {
      type: String,
    },
    city: {
      type: String,
    },
  },
});

const Order = models.Order || model("Order", OrderSchema);

export default Order;
