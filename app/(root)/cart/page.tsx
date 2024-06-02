"use client";

import { useCart } from "@/context/Cart/CartContext";

export default function Cart() {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    cartTotal,
    cartCount,
  } = useCart();

  return <div className="wrapper">{cartItems.length}</div>;
}
