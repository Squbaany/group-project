"use client";
import {useEffect, useState} from "react";
import {getUsers} from "@/lib/mongodb/actions/user.actions";
import {adminPanelUser, Order} from "@/types";
import {getOrdersByUser} from "@/lib/mongodb/actions/order.actions";

export default function Orders() {
  const [users, setUsers] = useState<adminPanelUser[]>([]);
  const [selUser, setSelUser] = useState<string>("");
  const [items, setItems] = useState<Order[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getUsers();
      setUsers(data);
    })();
  }, []);

  async function updateItems(){
    const data = await getOrdersByUser({ userId: selUser })
    setItems(data)
  }

  return (
    <div className="bg-primary-300 flex-grow mt-2 mr-2 rounded-lg p-4 mb-2">
      <h1>Orders</h1>

      <select
        name="user"
        value={selUser}
        onChange={async (ev) => {
          setSelUser(ev.target.value)
          await updateItems()
        }}
      >
        <option value="">None</option>
        {users.length > 0 && users.map((user) => (
          <option key={user.clerkId} value={user._id}>
            {user.email}
          </option>
        ))}
      </select>

      {selUser && items.length > 0 && (
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
          {
            items.map((el: any) => (
              <tr key={el._id}>
                <td>{el.createdAt}</td>
                <td>{el.totalAmount} $</td>
                <td>
                  {el.items.map((item: any) => (
                    <p key={item._id}>{item.id.title}</p>
                  ))}
                </td>
                <td>
                  {el.address.city} {el.address.street}
                </td>
              </tr>
            ))
          }
          </tbody>
        </table>
      )}
    </div>
  );
}
