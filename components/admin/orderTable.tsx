"use client";
import {useEffect, useState} from "react";
import {getOrdersByUser} from "@/lib/mongodb/actions/order.actions";
import {Order} from "@/types";

export default function OrderTable({userId}: {userId: string}) {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    (async () => {
      const data = await getOrdersByUser({userId});
      setOrders(data);
    })();
  }, [userId]);

  console.log(userId)

  return (
    <>
      <table className="basic mt-2">
        <thead>
        <tr>
          <td>Order time</td>
          <td>Total</td>
          <td>Items</td>
          <td>Address</td>
        </tr>
        </thead>
        <tbody>
          {orders.map((order: any) => (
            <tr key={order._id}>
              <td>{order.createdAt}</td>
              <td>{order.totalAmount}$</td>
              <td>
                {order.items.map((item: any) => (
                  <div key={item._id}>{item.id.title} (x{item.quantity})</div>
                ))}
              </td>
              <td>{order.address.street}, {order.address.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </>
  )
}