"use client";
import {useEffect, useState} from "react";
import {getUsers} from "@/lib/mongodb/actions/user.actions";
import {adminPanelUser} from "@/types";
import OrderTable from "@/components/admin/orderTable";

export default function Orders() {
  const [users, setUsers] = useState<adminPanelUser[]>([]);
  const [selUser, setSelUser] = useState<string>();

  useEffect(() => {
    (async () => {
      const data = await getUsers();
      setUsers(data);
    })();
  }, []);

  return (
    <div className="bg-primary-300 flex-grow mt-2 mr-2 rounded-lg p-4 mb-2">
      <h1>Orders</h1>

      <select
        name="user"
        value={selUser}
        onChange={ev => { setSelUser(ev.target.value) }}
      >
        <option value="">None</option>
        {users.length > 0 && users.map((user) => (
          <option key={user.clerkId} value={user._id}>
            {user.email}
          </option>
        ))}
      </select>

      {selUser &&
        <OrderTable userId={selUser} />
      }
    </div>
  );
}
