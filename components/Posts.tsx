import Image from "next/image";

import { db } from "@/lib/db";

const Blogs = async () => {
  const blogs = await db.blog.findMany({
    where: {
      isPublished: true,
    },
  });

  return (
    <div className="w-full bg-white text-black p-16 flex items-center justify-center ">
      <div className="w-[780px]">
        <h1 className="text-xl font-semibold mb-3">The latest blogs</h1>
        <hr className="mb-6 " />
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="flex flex-row justify-start items-center gap-3 my-5"
          >
            {blog.imageUrl !== null && (
              <Image
                className="flex w-[200px] h-[120px]"
                src={blog.imageUrl}
                alt={blog.title}
                width={100}
                height={100}
              />
            )}
            <div className="h-full space-y-5">
              <h2 className="text-lg font-semibold">{blog.title}</h2>
              <p>{blog.description}</p>
              <span></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
