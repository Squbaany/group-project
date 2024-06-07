"use client";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";
import { useCart } from "@/context/Cart/CartContext";

const OrdersIcon = () => {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 7L12 11L4 7"
        stroke="#131118"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M18.6246 4.66762L13.6246 2.35827C12.5903 1.88058 11.4097 1.88058 10.3754 2.35827L5.37545 4.66762C3.93093 5.33479 3 6.82344 3 8.46617V15.5338C3 17.1766 3.93094 18.6652 5.37545 19.3324L10.3754 21.6417C11.4097 22.1194 12.5903 22.1194 13.6246 21.6417L18.6246 19.3324C20.0691 18.6652 21 17.1766 21 15.5338V8.46617C21 6.82344 20.0691 5.33479 18.6246 4.66762Z"
        stroke="#131118"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8 4L17 9V19.5"
        stroke="#131118"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12 11V22"
        stroke="#131118"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

const Header = () => {
  const { cartCount } = useCart();

  return (
    <header className="w-full border-b">
      <div className="wrapper flex items-center justify-between">
        <Link href="/" className="bg-primary px-4 py-1 border rounded-full">
          <h1 className="h5-bold text-white">TechPoint</h1>
        </Link>

        <nav className="lg:flex-between hidden w-full max-w-sm">
          <NavItems />
        </nav>

        <div className="flex justify-end gap-3 items-center">
          <SignedOut>
            <Button asChild className="rounded-full size-lg">
              <Link href="/sign-in">Sign in</Link>
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/">
              <UserButton.UserProfileLink
                label="Orders"
                url="/orders"
                labelIcon={<OrdersIcon />}
              />
            </UserButton>
          </SignedIn>
          <MobileNav />
          <Link href="/cart" className="relative">
            <Image
              src="/assets/icons/cart.svg"
              width={24}
              height={30}
              alt="Cart"
              className="cursor-pointer"
            />
            {cartCount !== 0 && (
              <div className="absolute top-3 left-3 bg-red-500  w-4 h-4 text-center rounded-full">
                <p className="text-[10px] text-white">{cartCount}</p>
              </div>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
