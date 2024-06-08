"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/Cart/CartContext";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Cart() {
  const navigate = useRouter();

  const {
    cartItems,
    removeFromCart,
    clearCart,
    updateCartItemQuantity,
    cartTotal,
    cartCount,
  } = useCart();

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
    <div className="wrapper flex flex-col">
      <h2 className="h5-bold mb-10">
        Cart <span className="text-primary-400">({cartCount})</span>
      </h2>
      <div className="flex flex-col lg:flex-row w-full md:gap-4 lg:gap-6 xl:gap-10 justify-center ">
        <div className="flex-1 flex-col border p-4 rounded-xl">
          <div className="flex">
            <Button
              className="ml-auto bg-red-500 hover:bg-red-600"
              onClick={clearCart}
            >
              Clear cart
            </Button>
          </div>
          {cartItems.map((item) => (
            <div
              key={item.product._id}
              className="flex flex-col md:flex-row gap-10 md:gap-0 justify-between items-center border hover:border-primary duration-200 p-5 rounded-xl mt-4"
            >
              <div className="flex flex-row items-center gap-4">
                <Image
                  src={item.product.imageUrl}
                  alt={item.product.title}
                  width={100}
                  height={100}
                />
                <Link href={`/product/${item.product._id}`}>
                  <h3 className="h5-bold">{item.product.title}</h3>
                  <p className="text-primary-400">{item.product.description}</p>
                </Link>
              </div>
              <div className="flex flex-row items-center gap-4 md:gap-6 xl:gap-10">
                <div className="flex flex-row border hover:border-primary duration-200 items-center rounded-full">
                  <Button
                    className="p-3 bg-white hover:bg-primary/10 duration-200 rounded-full"
                    onClick={() =>
                      updateCartItemQuantity(
                        item.product._id,
                        item.quantity - 1
                      )
                    }
                  >
                    <Image
                      src="/assets/icons/minus.svg"
                      width={16}
                      height={16}
                      alt="Decrease quantity"
                    />
                  </Button>
                  <p className="p-regular-16 px-2">{item.quantity}</p>
                  <Button
                    className="p-3 bg-white hover:bg-primary/10 duration-200 rounded-full"
                    onClick={() =>
                      updateCartItemQuantity(
                        item.product._id,
                        item.quantity + 1
                      )
                    }
                  >
                    <Image
                      src="/assets/icons/plus.svg"
                      width={16}
                      height={16}
                      alt="Increase quantity"
                    />
                  </Button>
                </div>
                <div className="flex flex-row items-center">
                  <p className="p-regular-16 text-green-500">
                    $ {(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <Button
                  className="rounded-full p-3 bg-white hover:bg-primary/10 duration-200"
                  onClick={() => removeFromCart(item.product._id)}
                >
                  <Image
                    src="/assets/icons/delete.svg"
                    width={16}
                    height={16}
                    alt="Remove"
                  />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div>
          <div className="flex flex-col border p-4 rounded-xl gap-10">
            <div>
              <h3 className="h5-bold">Cart total: {cartTotal.toFixed(2)}</h3>
              <p className="p-semibold14">
                Shipping: {cartTotal > 150 ? "Free" : "$ 15"}
              </p>
            </div>

            <Button
              className="button bg-green-600 hover:bg-green-700"
              onClick={() => navigate.push("/cart/checkout")}
            >
              Checkout
              <Image
                src="/assets/icons/arrow-right.svg"
                width={16}
                height={16}
                alt="Checkout"
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
