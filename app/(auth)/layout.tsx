import Link from "next/link";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex-center flex-col min-h-screen w-full bg-primary-50 bg-dotted-pattern bg-cover bg-fixed bg-center">
      <Link href="/" className="mb-8 bg-primary px-4 py-1 border rounded-full">
        <h1 className="h5-bold text-white">TechPoint</h1>
      </Link>
      {children}
    </div>
  );
};

export default Layout;
