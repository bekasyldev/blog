import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Hero = () => {
  return (
    <div className="flex justify-center items-center h-[70vh] flex-col gap-10 bg-gray-100">
      <h1 className="xl:text-3xl text-xl md:text-xl  text-center">
        Get quick tech updates for developers worldwide. <br /> Stay ahead in
        programming and innovation trends.
      </h1>
      <div className="bg-white w-[80%] flex flex-row sm:w-[500px] rounded-md h-15 p-2">
        <Input className="text-black" type="email" placeholder="Your email" />
        <Button className="ml-2 bg-purple-600">Subscribe</Button>
      </div>
    </div>
  );
};

export default Hero;
