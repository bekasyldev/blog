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

    const publishBlog = await db.blog.update({
      where: {
        id: params.blogId,
      },
      data: {
        isPublished: true,
      }
    });

    return NextResponse.json(publishBlog);
  } catch (error) {
    console.log("[BLOG_ID_PUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  } 
}