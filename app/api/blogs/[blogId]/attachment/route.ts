import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { blogId: string } }
) {
  try {
    const { url } = await req.json();

    const authorBlog = await db.blog.findUnique({
      where: {
        id: params.blogId,
      }
    });

    if (!authorBlog) {
      return new NextResponse("Not found", { status: 404 });
    }

    const attachment = await db.attachment.create({
      data: {
        url,
        name: url.split("/").pop(),
        blogId: params.blogId,
      }
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.log("COURSE_ID_ATTACHMENTS", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}