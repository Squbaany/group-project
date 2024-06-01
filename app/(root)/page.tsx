import CategoriesShowcase from "@/components/shared/CategoriesShowcase";
import Perks from "@/components/shared/Perks";
import ProductsShowcase from "@/components/shared/ProductsShowcase";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <>
      <section className="bg-gradient-to-t from-primary-300 to-primary-500 py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">The Number One Tech Store In The World</h1>
            <p className="p-regular-20 md:p-regular-24 w-[70%]">
              Check out hundreds of high quality tech products. Shop with us for
              guaranteed quality, low prices and fast delivery
            </p>

            <Button size="lg" asChild className="button w-full sm:w-fit">
              <Link href="#categories">Shop now</Link>
            </Button>
          </div>
          <div className="bg-primary rounded-3xl content-end">
            <Image
              src={"/ui/hero/hero-1.png"}
              width={1000}
              height={1000}
              alt="Hero"
              className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
            />
          </div>
        </div>
      </section>
      <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold mb-8">Popular products</h2>
        <ProductsShowcase products={[]} />
      </section>
      <section
        id="categories"
        className="wrapper my-8 flex flex-col gap-8 md:gap-12"
      >
        <h2 className="h2-bold mb-8">Find something for you</h2>
        <CategoriesShowcase />
      </section>
      <Perks />
    </>
  );
}
