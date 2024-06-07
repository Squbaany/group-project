import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  products: Product[];
};

const ProductsShowcase = ({ products }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Link
          href={`/product/${product._id}`}
          key={product._id}
          className="border rounded-xl p-4 hover:shadow-xl hover:border-primary duration-200"
        >
          <div className="flex flex-col justify-center items-center ">
            <Image
              src={product.imageUrl}
              alt={product.title}
              width={300}
              height={500}
            />
            <div className="w-full pt-4 px-4">
              <p className="p-semibold-20">{product.title}</p>
              <p className="p-regular-16">{product.description}</p>
              <p className="p-medium-16 text-green-500 mt-6">
                $ {product.price}
                {product.price > 150 && (
                  <span className="text-primary-300 ml-2">free shipping</span>
                )}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductsShowcase;
