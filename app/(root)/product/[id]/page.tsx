import BackButton from "@/components/shared/BackButton";
import CartButton from "@/components/shared/CartButton";
import ProductsShowcase from "@/components/shared/ProductsShowcase";
import { Separator } from "@/components/ui/separator";
import {
  getProductById,
  getRelatedProducts,
} from "@/lib/mongodb/actions/products.actions";
import { Product } from "@/types";
import Image from "next/image";

type ProductDetailsParams = {
  params: { id: string };
};

export default async function ProductDetails({
  params: { id },
}: ProductDetailsParams) {
  const product = (await getProductById(id)) as Product;

  const relatedProduccts = await getRelatedProducts(product);

  return (
    <>
      <section className="wrapper flex flex-col">
        <BackButton />
        <div className="justify-center flex">
          <div className="flex flex-col lg:flex-row max-w-4xl gap-20 items-center">
            <Image
              src={product.imageUrl}
              alt={product.title}
              width={400}
              height={400}
            />
            <div>
              <h1 className="h2-bold">{product.title}</h1>
              <p className="p-semibold-14 text-primary-400">
                {product.description}
              </p>
              <Separator className="my-4" />
              <ul>
                {product.properties.map((property) => (
                  <li key={property.key}>
                    <span className="p-semibold-14 text-primary-400">
                      {property.key}:{" "}
                    </span>
                    <span className="p-regular-14">{property.value}</span>
                  </li>
                ))}
              </ul>
              <Separator className="my-4" />
              <div className="flex flex-col gap-4 text-center">
                <p className="p-medium-16 text-green-500">
                  $ {product.price}
                  {product.price > 150 && (
                    <span className="text-primary-300 ml-2">free shipping</span>
                  )}
                </p>
                <CartButton product={product} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="border-t my-8 flex flex-col gap-8 md:gap-12">
        <div className="wrapper">
          <h2 className="h2-bold my-8">Related products</h2>
          <ProductsShowcase products={relatedProduccts} />
        </div>
      </section>
    </>
  );
}
