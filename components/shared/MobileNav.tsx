import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { Separator } from "../ui/separator";
import NavItems from "./NavItems";

const MobileNav = () => {
  return (
    <nav className="lg:hidden flex">
      <Sheet>
        <SheetTrigger className="align-middle">
          <Image
            src="/assets/icons/menu.svg"
            alt="Menu"
            width={24}
            height={30}
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-6 bg-white lg:hidden">
          <div>
            <SheetHeader>
              <SheetTitle>
                <h1 className="h5-bold">TechPoint</h1>
              </SheetTitle>
              <SheetDescription>Explore our products</SheetDescription>
            </SheetHeader>
          </div>
          <Separator />
          <NavItems />
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
