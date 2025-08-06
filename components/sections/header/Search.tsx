import React from "react";
import { Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
const SearchComponent = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Search size={30} className="cursor-pointer" />
      </DialogTrigger>

      <DialogContent className="bg-transparent border-none shadow-none">
        <DialogTitle></DialogTitle>
        <div className="flex text-bold text-4xl items-center">
          <Input placeholder="Search..." className="bg-white p-6 w-full" />
          <Button className="py-6 px-4 bg-orange-500 hover:bg-orange-600 ml-2 cursor-pointer">
            <Search />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchComponent;
