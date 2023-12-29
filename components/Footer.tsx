import React from "react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

export default function Footer() {
  return (
    <footer className="px-20">
      <Separator />
      <div className="flex justify-between items-center my-6">
        <h1 className="text-2xl font-semibold">Bekasyl</h1>
        <Button variant={"outline"}>Subcribe</Button>
        <p>
          Powered by <span className="underline">Ghost</span>
        </p>
      </div>
      <Separator className="mb-10" />
    </footer>
  );
}
