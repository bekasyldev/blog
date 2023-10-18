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
        className={cn("hidden h-full gap-4 lg:flex", isOpen && "h-full gap-4")}
      >
        {navLinks.map((link) => (
          <Link href={link.href} key={link.key} className="text-md">
            {link.label}
          </Link>
        ))}
      </ul>

      <div className="lg:flex lg:items-center hidden">
        <Button className="bg-white text-slate-950">Subcribe</Button>
      </div>

      <Menu
        onClick={handleClick}
        className="inline-block cursor-pointer lg:hidden"
      />
    </nav>
  );
};

export default Navbar;
