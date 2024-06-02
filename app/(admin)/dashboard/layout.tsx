import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const ADMIN_ID = process.env.CLERK_ADMIN_ID;

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = auth();

  if (userId !== ADMIN_ID) {
    redirect("/");
  }

  return (
    <div className="flex h-screen flex-col">
      <h1>Admin panel</h1>
      {children}
    </div>
  );
}
