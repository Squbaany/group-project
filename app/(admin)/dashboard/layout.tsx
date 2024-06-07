import Nav from "@/components/admin/nav";
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
    <div className="flex min-h-screen bg-primary">
      <Nav />
      {children}
    </div>
  );
}
