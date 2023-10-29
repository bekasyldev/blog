import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Hero = () => {
  return (
    <div className="flex justify-center items-center h-[70vh] flex-col gap-6">
      <h1 className="text-4xl font-2xl text-center">
        Join me on a behind-the-scenes coding <br />
        journey. Weekly updates on projects, <br />
        tutorials, and videos
      </h1>
      <div className="bg-white flex flex-row w-[500px] rounded-md h-15 p-2">
        <Input
          className="text-black"
          type="email"
          placeholder="Your email adress"
        />
        <Button className="ml-2">Subscribe</Button>
      </div>
    </div>
  );
};

export default Hero;
