"use client";

import { headerLinks } from "@/constants";
import { useCategory } from "@/context/Category/CategoryContext";
import Link from "next/link";
import React from "react";

const NavItems = () => {
  const { category, setCategory } = useCategory();

  return (
    <ul className="lg:flex-between flex w-full flex-col lg:flex-row items-start gap-5">
      {headerLinks.map((link, index) => {
        const isActive = category === link.label;
        return (
          <li
            key={index}
            className={`flex-center p-medium-16 whitespace-nowrap ${
              isActive && "underline underline-offset-4"
            }`}
          >
            <Link href={"/categories"} onClick={() => setCategory(link.label)}>
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems;
