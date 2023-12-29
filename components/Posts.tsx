import Image from "next/image";
import { db } from "@/lib/db";
import { Separator } from "./ui/separator";

const Blogs: React.FC = () => {
  const shortenText = (text: string | null, maxLength: number): string => {
    if (!text) {
      return "";
    }
    if (text.length > maxLength) {
      return `${text.substring(0, maxLength)}...`;
    }
    return text;
  };

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const fetchBlogs = async () => {
    const blogs = await db.blog.findMany({
      where: {
        isPublished: true,
      },
    });
    return blogs;
  };

  return (
    <div className="w-full bg-white text-black px-20 py-10 flex items-center justify-center ">
      <div className="w-full">
        <h2 className="text-xl font-semibold mb-3">The latest</h2>
        <hr className="mb-6 " />
        <div className="grid grid-cols-4 gap-4">
          {fetchBlogs().then((blogs) =>
            blogs.map((blog, index) => (
              <div key={blog.id} className="flex flex-wrap">
                {blog.imageUrl !== null && (
                  <Image
                    className="flex md:w-[260px] md:h-[160px] mb-4"
                    src={blog.imageUrl}
                    alt={blog.title}
                    width={100}
                    height={100}
                  />
                )}
                <div className="h-full space-y-2 md:space-y-2 w-80">
                  <h2 className="text-lg font-semibold">{blog.title}</h2>
                  <p className="text-sm md:text-md">
                    {shortenText(blog.description, 80)}
                  </p>
                  <span className="text-[14px] text-gray-400 mt-2">
                    By Bekasyl - {formatDate(new Date(blog.createdAt))}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
