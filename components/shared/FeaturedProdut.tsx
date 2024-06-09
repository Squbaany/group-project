import { getFeatured } from "@/lib/mongodb/actions/featured.actions";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Timer from "./Timer";

const FeaturedProdut = async () => {
  const product = await getFeatured();

  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-between items-center mb-10 gap-4">
        <h2 className="h2-bold">Product of the day</h2>
        <div>
          <Timer countDownto={product.createdAt} />
        </div>
      </div>
      <div className="flex-center border p-4 rounded-2xl">
        <div className="flex flex-col lg:flex-row">
          <Image
            src={product.imageUrl}
            alt="Featured"
            width={400}
            height={400}
          />
          <div className="flex flex-col p-4 justify-center">
            <h3 className="h1-bold my-4">The best in its class</h3>
            <p className="p-bold-24">{product.title}</p>
            <p className="p-regular-20 text-primary-300">
              {product.description}
            </p>

            <Link
              href={`/product/${product.prodId}`}
              className="bg-primary text-center text-white p-4 rounded-full mt-4 hover:bg-primary/90 duration-200"
            >
              Check it out !
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProdut;
