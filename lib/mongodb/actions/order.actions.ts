"use server";

import Stripe from "stripe";
import {
  CheckoutOrderParams,
  CreateOrderParams,
  GetOrdersByUserParams,
} from "@/types";
import { redirect } from "next/navigation";
import { handleError } from "@/lib/utils";
import { connectToDatabase } from "..";
import Order from "../models/order.model";
import Product from "../models/product.model";
import User from "../models/user.model";

export const checkoutOrder = async (order: CheckoutOrderParams) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: order.items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.id,
          },
          unit_amount: Number(item.price) * 100,
        },
        quantity: item.quantity,
      })),
      metadata: {
        address: JSON.stringify(order.address),
        buyerId: order.buyerId,
        items: JSON.stringify(order.items),
      },
      shipping_options: [
        {
          shipping_rate:
            Number(order.totalAmount) > 150
              ? "shr_1PPSdaRu4Srsv7TYcncFNPlA"
              : "shr_1PPSdMRu4Srsv7TYZiUGfDw1",
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/orders`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
    });

    redirect(session.url!);
  } catch (error) {
    throw error;
  }
};

export const createOrder = async (order: CreateOrderParams) => {
  try {
    await connectToDatabase();

    const newOrder = await Order.create({
      ...order,
      buyer: order.buyerId,
    });

    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    handleError(error);
  }
};

export async function getOrdersByUser({ userId }: GetOrdersByUserParams) {
  try {
    await connectToDatabase();

    console.log(userId)
    const conditions = { buyer: userId };

    const orders = await Order.distinct("product._id")
      .find(conditions)
      .sort({ createdAt: "desc" })
      .populate({
        path: "items",
        populate: { path: "id", model: Product, select: "_id title price" },
      })
      .populate({
        path: "buyer",
        model: User,
        select: "_id firstName lastName",
      });
    return JSON.parse(JSON.stringify(orders));
  } catch (error) {
    handleError(error);
  }
}
