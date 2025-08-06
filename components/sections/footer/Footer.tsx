import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { navigationLinks } from "@/constans";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  const socialIcons = [
    { href: "#", icon: <Facebook size={30} /> },
    { href: "#", icon: <Twitter size={30} /> },
    { href: "#", icon: <Instagram size={30} /> },
  ];

  return (
    <footer className="relative bg-black text-white mt-32">
      <div
        className="absolute -top-65 left-1/2 transform -translate-x-1/2
      bg-orange-500 text-left px-6 py-12 rounded-md shadow-lg w-11/12 max-w-6xl h-72
      grid grid-cols-1 md:grid-cols-2 items-center gap-6"
      >
        <div>
          <h2 className="text-3xl font-bold">Ready to get started?</h2>
          <p className="mt-2 text-lg">
            It only takes a few minutes to register your FREE Travel account
          </p>
          <Link href={"/register"}>
            <Button
              className="mt-4 bg-white text-orange-500 px-6 py-2 font-semibold
          rounded shadow-md cursor-pointer"
            >
              OPEN AN ACCOUNT
            </Button>
          </Link>
        </div>
        <div className="flex justify-center relative">
          <Image
            src={"/footerr.png"}
            height={456}
            width={564}
            alt="footer picture"
            className="hidden md:block absolute  -bottom-28 w-70 h-57"
          />
        </div>
      </div>

      <div className="container mx-auto py-12 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2">
          <Image
            src={"/footer.png"}
            alt="travel"
            height={50}
            width={210}
            className="w-36 lg:w-52 h-auto"
          />
          <p className="mt-4 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
            pariatur excepturi nulla tenetur
          </p>
          <div className="flex  space-x-4 mt-4">
            {socialIcons.map((icon, index) => (
              <Link
                className="hover:text-orange-500 text-white"
                href={icon.href}
                key={index}
              >
                {icon.icon}
              </Link>
            ))}
          </div>
        </div>
        <div className="lg:col-span-1">
          <h3 className="text-xl font-bold mb-4 ">Links</h3>
          <div className="relative w-16 h-1 bg-orange-500">
            <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-orange-500"></div>
            <div className="animate-move-dot absolute h-3 w-3 rounded-full top-1/2 -translate-y-1/2 bg-orange-500"></div>
            <div className="animate-move-dot absolute h-1.5 w-1.5 ml-0.5 mt-0.5 bg-white rounded-full -translate-y-1/2"></div>
          </div>
          <div className="text-sm space-y-2 mt-8">
            {navigationLinks.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className=" block hover:text-orange-500"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="lg:col-span-2">
          <h4 className="text-xl font-bold mb-4">Subscribe</h4>
          <div className="relative w-16 h-1 bg-orange-500">
            <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-orange-500"></div>
            <div className="animate-move-dot absolute h-3 w-3 rounded-full top-1/2 -translate-y-1/2 bg-orange-500"></div>
            <div className="animate-move-dot absolute h-1.5 w-1.5 ml-0.5 mt-0.5 bg-white rounded-full -translate-y-1/2"></div>
          </div>

          <p className="text-sm mb-4 mt-8">
            Lorem ipsum dolor, sit amet consectetur adipisicing
          </p>
          <div className="flex flex-col sm:flex-row">
            <Input
              type="email"
              placeholder="Your Email Address"
              className="w-full px-4 py-2 rounded-none"
            />

            <Button className="px-4 py-4 rounded-none bg-orange-500 hover:bg-orange-600">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
      <div className="container mx-auto py-4 text-center text-sm border-t border-gray-700">
        <div className="flex flex-col md:flex-row justify-between">
          <div>
            Copyright © 2025 <span className="text-orange-500">Travel</span>
          </div>
          <div>
            Created by{" "}
            <Link
              href={"http://konyaereglisatis.com/portfolio"}
              className="text-xl text-orange-500 cursor-pointer"
            >
              Nurullah Mencik
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
