import CategoryForm from "@/components/admin/CategoryForm";
import { getCategories } from "@/lib/mongodb/actions/category.actions";
import Link from "next/link";
import { categoryProps } from "@/types";

export default async function Categories() {
  const categories = await getCategories();

  return (
    <div className="bg-primary-300 flex-grow mt-2 mr-2 rounded-lg p-4 mb-2">
      <h1>Categories</h1>

      <CategoryForm />

      <table className="basic mt-2">
        <thead>
          <tr>
            <td>Product name</td>
            <td>Properties</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {categories.map((category: any) => (
            <tr key={category._id}>
              <td>{category.name}</td>
              <td>
                {category.properties.map((obj: categoryProps) => (
                  <div key={obj.key} className="mb-2">
                    <p>{obj.key}</p>
                    Properties:
                    {obj.value &&
                      obj.value.map((el: String, idx: Number) => (
                        <span key={idx.toString()} className="ml-0.5">
                          {el},
                        </span>
                      ))}
                  </div>
                ))}
              </td>
              <td>
                <Link href={`/dashboard/categories/edit/${category._id}`}>
                  Edit
                </Link>
                <Link href={`/dashboard/categories/delete/${category._id}`}>
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
