"use client";

import { useCart } from "@/context/Cart/CartContext";
import { Product } from "@/types";
import { Button } from "../ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CartButton = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();
  const router = useRouter();

  const handleAddToCartClick = (product: Product) => {
    addToCart(product);
    router.push("/cart");
  };

  return (
    <Button
      className="button gap-2"
      onClick={() => handleAddToCartClick(product)}
    >
      <Image
        src="/assets/icons/white-cart.svg"
        width={24}
        height={24}
        alt="Cart"
      />
      <p>Add to cart</p>
    </Button>
  );
};

export default CartButton;
