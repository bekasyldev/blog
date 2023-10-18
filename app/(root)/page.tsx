import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <Link href={"/writer/create"}>
        <Button className="bg-black text-white">Write a blog</Button>
      </Link>
    </main>
  );
}
