import { IconBadge } from "@/components/IconBadge";
import { db } from "@/lib/db";
import { Edit, Paperclip, File } from "lucide-react";
import { redirect } from "next/navigation";
import TitleForm from "./_components/TitleForm";
import DescriptionForm from "./_components/DescriptionForm";
import ImageForm from "./_components/ImageUrl";
import { CategoryForm } from "./_components/CategoryForm";
import { AttachmentForm } from "./_components/AttachmentForm";
import { Banner } from "@/components/Banner";
import { Actions } from "./_components/Action";

const BlogIdPage = async ({ params }: { params: { blogId: string } }) => {
  const blog = await db.blog.findUnique({
    where: {
      id: params.blogId,
    },
    include: {
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
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
    blog.categoryId,
  ];

  const totalFields = requiredFields.length;
  // to take all fields that not false
  const completedFields = requiredFields.filter(Boolean).length;

  const complextedText = `(${completedFields}/${totalFields})`;

  const isCompleted = requiredFields.every(Boolean);

  return (
    <>
      {!blog.isPublished && (
        <div className="px-16 border-none">
          <Banner label="This blog is unpushlished. It would be not visible to others." />
        </div>
      )}
      <div className="py-10 px-20">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-3xl font-medium">Blog Setup</h1>
            <span>Complete all fields {complextedText}</span>
          </div>
          <Actions
            disabled={!isCompleted}
            blogId={params.blogId}
            isPublished={blog.isPublished}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 text-black">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Edit} />
              <h2 className="text-2xl text-white">Customize your Blog</h2>
            </div>

            <TitleForm initialData={blog} blogId={blog.id} />
            <DescriptionForm initialData={blog} blogId={blog.id} />
            <CategoryForm
              initialData={blog}
              blogId={blog.id}
              options={categories.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
            />
          </div>
          <div>
            <div className="flex items-center  gap-x-2">
              <IconBadge icon={File} />
              <h2 className="text-2xl text-white">Attachment & Resources</h2>
            </div>
            <ImageForm initialData={blog} blogId={blog.id} />
            <AttachmentForm initialData={blog} blogId={blog.id} />
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogIdPage;
