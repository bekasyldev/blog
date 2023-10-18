import { IconBadge } from "@/components/IconBadge";
import { db } from "@/lib/db";
import { ListChecks, Settings } from "lucide-react";
import { redirect } from "next/navigation";
import TitleForm from "./_components/TitleForm";
import DescriptionForm from "./_components/DescriptionForm";
import ImageForm from "./_components/ImageUrl";
import { CategoryForm } from "./_components/CategoryForm";

export default async function BlogPage({
  params: { blogId },
}: {
  params: { blogId: string };
}) {
  const blog = await db.blog.findUnique({
    where: {
      id: blogId,
    },
  });

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  if (!blog) {
    redirect("/");
  }
  const requiredFields = [
    blog.title,
    blog.description,
    blog.imageUrl,
    blog.price,
    blog.categoryId,
  ];

  const totalFields = requiredFields.length;
  // to take all fields that not false
  const completedFields = requiredFields.filter(Boolean).length;

  const complextedText = `(${completedFields}/${totalFields})`;

  return (
    <div className="p-10">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-3xl font-medium">Blog Setup</h1>
          <span>Complete all fields {complextedText}</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 text-black">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={Settings} />
            <h2 className="text-2xl text-white">Customize your Blog</h2>
          </div>

          <TitleForm initialData={blog} blogId={blog.id} />
          <DescriptionForm initialData={blog} blogId={blog.id} />
          <ImageForm initialData={blog} blogId={blog.id} />
          <CategoryForm
            initialData={blog}
            blogId={blog.id}
            options={categories.map((category) => ({
              label: category.name,
              value: category.id,
            }))}
          />
        </div>
      </div>
    </div>
  );
}
