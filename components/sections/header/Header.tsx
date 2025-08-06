"use client";
import {
  Facebook,
  Instagram,
  MessageCircle,
  Phone,
  Twitter,
  User,
  UserPlus,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import MobileMenu from "./MobileMenu";
import { navigationLinks } from "./../../../constans/index";
import SearchComponent from "./Search";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const Header = () => {
  const pathname = usePathname();
  const { data: session} = useSession();
  const socialIcons = [
    { href: "#", icon: <Facebook size={30} /> },
    { href: "#", icon: <Twitter size={30} /> },
    { href: "#", icon: <Instagram size={30} /> },
  ];

  return (
    <header className="bg-black text-white">
      {/** Topbar */}
      <div className="flex container mx-auto h-16 justify-center md:justify-between items-center px-4 py-2 text-sm">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-full">
              <MessageCircle size={12} className="text-orange-500" />
            </div>
            info@travel
          </div>
          <div className="flex items-center gap-5">
            <div className="bg-white p-2 rounded-full">
              <Phone size={12} className="text-orange-500" />
            </div>
            050 500 5000
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {socialIcons.map((icon, index) => (
            <Link
              className="hover:text-orange-500"
              href={icon.href}
              key={index}
            >
              {icon.icon}
            </Link>
          ))}
        </div>
      </div>

      {/** Navigation Bar */}
      <div className="bg-white h-28 text-black shadow flex items-center">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Image
            src={"/logo.png"}
            alt="travel"
            height={50}
            width={210}
            className="w-36 lg:w-52 h-auto"
          />
          <nav className="hidden lg:flex space-x-8 text-lg font-semibold">
            {navigationLinks.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`${pathname === item.href ? "text-orange-500" : "hover:text-orange-500"}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center space-x-4 lg:space-x-2">
            <div className="p-2 hidden md:flex bg-orange-500  text-white rounded-full">
              <SearchComponent />
            </div>
            <MobileMenu />
            {session ? (
              <Link
                href="/profile"
                className="p-2 bg-red-500 cursor-pointer text-white rounded-full"
              >
                <UserPlus size={30} />
              </Link>
            ) : (
              <Link
                href="/login"
                className="p-2 bg-sky-500 cursor-pointer text-white rounded-full"
              >
                <User size={30} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
