import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex items-center justify-between">
        <Link href="/" className="bg-primary px-4 py-1 border rounded-full">
          <h1 className="h5-bold text-white">TechPoint</h1>
        </Link>

        <nav className="lg:flex-between hidden w-full max-w-sm">
          <NavItems />
        </nav>

        <div className="flex justify-end gap-3  items-center">
          <SignedOut>
            <Button asChild className="rounded-full size-lg">
              <Link href="/sign-in">Sign in</Link>
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <MobileNav />
          <Link href="/cart">
            <Image
              src="/assets/icons/cart.svg"
              width={24}
              height={30}
              alt="Cart"
              className="cursor-pointer"
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
