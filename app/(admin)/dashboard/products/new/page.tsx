import ProductForm from "@/components/admin/ProductForm";

export default async function New() {
  return (
    <div className="bg-primary-300 flex flex-col mt-2 mr-2 rounded-lg p-4 mb-2">
      <h1>New product</h1>
      <ProductForm />
    </div>
  );
}
