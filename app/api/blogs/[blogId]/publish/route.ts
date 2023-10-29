import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { blogId: string } }
) {
  try {

    const blog = await db.blog.findUnique({
      where: {
        id: params.blogId,
      },
    });

    if (!blog) {
      return new NextResponse("Not found", { status: 404 });
    }


    if (!blog.title || !blog.description || !blog.imageUrl || !blog.categoryId) {
      return new NextResponse("Missing required fields", { status: 401 });
    }

    const publishedBlog = await db.blog.update({
      where: {
        id: params.blogId,
      },
      data: {
        isPublished: true,
      }
    });

    return NextResponse.json(publishedBlog);
  } catch (error) {
    console.log("[COURSE_ID_PUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  } 
}