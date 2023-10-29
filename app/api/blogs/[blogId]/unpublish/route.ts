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

    const unpublishedBlog = await db.blog.update({
      where: {
        id: params.blogId,
      },
      data: {
        isPublished: false,
      }
    });

    return NextResponse.json(unpublishedBlog);
  } catch (error) {
    console.log("[BLOG_ID_UNPUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  } 
}