import Link from "next/link";
import Image from "next/image";
import { navLinks } from "@/constants";
import { Button } from "@/components/ui/button";
const Navbar = () => {
  return (
    <nav className="max-w-[1440px] flex justify-between items-center mx-auto relative py-5 px-6 lg:px-20 3xl:px-0">
      <div className="flex gap-x-10">
        <Link href={"/"} className="flex">
          <Image src={"/cat.png"} alt="logo" width={40} height={40} />
          <h2 className="text-2xl mt-3 font-semibold">Bekasyl</h2>
        </Link>
        <ul className={"hidden lg:flex gap-5 items-end justify-center mb-1"}>
          {navLinks.map((link) => (
            <Link href={link.href} key={link.key} className="text-md">
              {link.label}
            </Link>
          ))}
        </ul>
      </div>

      <div className="lg:flex lg:items-center hidden space-x-3">
        <Link href={"/writer/create"}>
          <Button className="text-white">Write a Blog</Button>
        </Link>
        <Button className="bg-purple-600  hover:bg-purple-700 text-white">
          Subcribe
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
