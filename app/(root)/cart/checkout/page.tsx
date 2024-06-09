"use client";

import { useCart } from "@/context/Cart/CartContext";
import Link from "next/link";
import Image from "next/image";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { checkoutOrder } from "@/lib/mongodb/actions/order.actions";

export default function Checkout() {
  const { user } = useUser();
  const userId = user?.publicMetadata?.userId as string;

  const { cartItems, clearCart, cartTotal, cartCount } = useCart();

  const formSchema = z.object({
    street: z.string().min(2).max(50),
    postalCode: z.string().min(2).max(10),
    city: z.string().min(2).max(50),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      street: "",
      postalCode: "",
      city: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const order = {
      totalAmount: cartTotal.toFixed(2),
      items: cartItems.map((item) => ({
        id: item.product._id,
        price: item.product.price.toString(),
        quantity: item.quantity,
      })),
      buyerId: userId,
      address: {
        street: values.street,
        postalcode: values.postalCode,
        city: values.city,
      },
    };

    await checkoutOrder(order);

    clearCart();
  }

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

  if (cartItems.length === 0) {
    return (
      <div className="wrapper flex flex-col items-center justify-center h-full">
        <h2 className="h5-bold">Your cart is empty</h2>
        <Link href="/" className="text-primary-400">
          Back to main page
        </Link>
      </div>
    );
  }

  return (
    <div className="wrapper flex flex-col gap-10">
      <h2 className="h5-bold">
        Cart <span className="text-primary-400">({cartCount})</span>
      </h2>
      <div className="w-full">
        <div className="flex flex-col border p-4 rounded-xl gap-4">
          {cartItems.map((item) => (
            <div
              key={item.product._id}
              className="flex flex-col md:flex-row gap-10 md:gap-0 justify-between items-center border hover:border-primary duration-200 p-5 rounded-xl"
            >
              <div className="flex flex-row items-center gap-4">
                <Image
                  src={item.product.imageUrl}
                  alt={item.product.title}
                  width={100}
                  height={100}
                />
                <div>
                  <h3 className="h5-bold">{item.product.title}</h3>
                  <p className="text-primary-400">{item.product.description}</p>
                </div>
              </div>
              <div className="flex flex-row items-center gap-4 md:gap-6 xl:gap-10">
                <div className="flex flex-row items-center gap-3">
                  <p>{item.quantity} X </p>
                  <p className="p-regular-16 text-green-500">
                    $ {item.product.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div className="mt-4 text-right">
            <p>Shipping: {cartTotal > 150 ? "Free" : "$ 15"} </p>
            <h3 className="h5-bold">
              Cart total:{" "}
              {cartTotal > 150
                ? cartTotal.toFixed(2)
                : (cartTotal + 15).toFixed(2)}
            </h3>
          </div>
        </div>
      </div>
      <h2 className="h5-bold">Shipping info</h2>
      <div className="flex justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 flex flex-col w-full max-w-xl"
          >
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Street name and house number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Postal code (eg. 12-345)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="City name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="button py bg-green-600 hover:bg-green-700"
            >
              Place order
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
