"use client";

import { headerLinks } from "@/constants";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

const NavItems = () => {
  const name = usePathname().split("/")[2];

  return (
    <ul className="lg:flex-between flex w-full flex-col lg:flex-row items-start gap-5">
      {headerLinks.map((link, index) => {
        const isActive = name === link.route;
        return (
          <li
            key={index}
            className={`flex-center p-medium-16 whitespace-nowrap ${
              isActive && "underline underline-offset-4"
            }`}
          >
            <Link href={`/categories/${link.route}`}>{link.label}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems;
