import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { blogId: string } }
  ) {
    try {
      const { blogId } = params;
      const values = await req.json();
  
  
      const blog = await db.blog.update({
        where: {
          id: blogId
        },
        data: {
          ...values,
        }
      });
      return NextResponse.json(blog)
    } catch (error) {
        console.log("[BLOG ID]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
};

export async function DELETE(
  req: Request,
  { params } : { params: { blogId: string}}
) {
  try {
    const blog = await db.blog.delete({
      where: {
        id: params.blogId
      }
    })
    return NextResponse.json(blog)
  } catch (error) {
    console.log("[BLOG ID]", error)
    return new NextResponse("Internal error", { status: 500})
  }
}