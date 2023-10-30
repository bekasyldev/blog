"use client";
import Link from "next/link";
import Image from "next/image";
import { navLinks } from "@/constants";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="flex justify-between items-center mx-auto max-w-[1440px] relative py-5 px-6 lg:px-20 3xl:px-0">
      <Link href={"/"} className="flex">
        <Image src={"/cat.png"} alt="logo" width={40} height={40} />
        <h2 className="text-2xl mt-3">Bekasyl</h2>
      </Link>

      <ul
        className={cn(
          isOpen
            ? "flex flex-col h-screen w-full gap-4 bg-black text-white"
            : "hidden"
        )}
      >
        {navLinks.map((link) => (
          <Link href={link.href} key={link.key} className="text-md">
            {link.label}
          </Link>
        ))}
      </ul>

      <div className="lg:flex lg:items-center hidden space-x-3">
        <Link href={"/writer/create"}>
          <Button className="bg-green-500 hover:bg-green-700 text-white">
            Write a blog
          </Button>
        </Link>
        <Button className="bg-white hover:bg-slate-500 hover:text-white  text-slate-950">
          Subcribe
        </Button>
      </div>

      <Menu
        onClick={handleClick}
        className="inline-block cursor-pointer lg:hidden"
      />
    </nav>
  );
};

export default Navbar;
