"use client";

import { headerLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavItems = () => {
  const pathname = usePathname();

  return (
    <ul className="lg:flex-between flex w-full flex-col lg:flex-row items-start gap-5">
      {headerLinks.map((link, index) => {
        const isActive = pathname === link.route;
        return (
          <li
            key={index}
            className={`flex-center p-medium-16 whitespace-nowrap ${
              isActive && "text-primary-500"
            }`}
          >
            <Link href={link.route}>{link.label}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems;
