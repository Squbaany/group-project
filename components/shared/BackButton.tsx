"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import Image from "next/image";

const BackButton = () => {
  const router = useRouter();

  return (
    <div onClick={() => router.back()} className="flex flex-row cursor-pointer">
      <Image
        src="/assets/icons/arrow-left.svg"
        width={24}
        height={24}
        alt="Back"
      />
      Back
    </div>
  );
};

export default BackButton;
