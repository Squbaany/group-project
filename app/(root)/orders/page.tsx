"use client";

import { Separator } from "@/components/ui/separator";
import { getOrdersByUser } from "@/lib/mongodb/actions/order.actions";
import { Order } from "@/types";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Orders() {
  const { user } = useUser();
  const userId = user?.publicMetadata?.userId as string;

  const [orders, setOrders] = useState<Order[]>();

  useEffect(() => {
    async function fetchOrders() {
      const orders = await getOrdersByUser({ userId });
      setOrders(orders);
    }

    fetchOrders();
  }, [userId]);

  if (!orders)
    return (
      <div className="wrapper flex flex-col items-center justify-center h-full">
        <h2 className="h5-bold">You have no orders yet</h2>
        <Link href="/" className="text-primary-400">
          Back to main page
        </Link>
      </div>
    );

  return (
    <section className="wrapper ">
      <h2 className="h5-bold">Orders</h2>
      <div className="flex flex-col items-center break-all">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border p-4 rounded-xl my-4 w-full max-w-4xl"
          >
            <h3 className="h4-medium">Order nr. {order._id}</h3>
            <p>Payment confirmation nr. {order.stripeId}</p>
            <p>
              Status:{" "}
              <span className="text-green-500">
                Payment recived, awaiting confirmation
              </span>
            </p>
            <Separator className="my-2" />
            <p className="p-medium-20">Ordered items list:</p>
            <ul>
              {order.items.map((item) => (
                <li key={item.id.title}>
                  {item.id.title} X {item.quantity} | Price:{" "}
                  <span className="text-green-500">$ {item.id.price}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-primary-300">
              Shipping fee: {Number(order.totalAmount) < 165 ? "$ 15" : "Free"}
            </p>
            <p className="text-green-500 p-bold-20">
              Total amount: $ {order.totalAmount}
            </p>
            <Separator className="my-2" />
            <p className="p-medium-20">Delivery info:</p>
            <p>
              Buyer: {order.buyer.firstName} {order.buyer.lastName}
            </p>
            <p>
              Address: {order.address.street}, {order.address.postalcode}{" "}
              {order.address.city}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
