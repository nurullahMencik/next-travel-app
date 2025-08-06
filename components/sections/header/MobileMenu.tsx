import React from "react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { navigationLinks } from "@/constans";
import Link from "next/link";
const MobileMenu = () => {
  return (
    <Sheet>
      <SheetTrigger><div className=" lg:hidden p-2 bg-green-500 cursor-pointer text-white rounded-full">
                    <Menu size={30}/>
                  </div></SheetTrigger>
      <SheetContent>
          <SheetTitle className="flex justify-center mt-2 text-2xl font-bold">Travel</SheetTitle>
            <div className="flex flex-col space-y-2.5 p-2 text-lg text-orange-500 font-semibold mt-2 ">
            {navigationLinks.map((value,index)=>(
                <Link
                key={index}
                href={value.href}
                >{value.label}</Link>
            ))}
            </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
