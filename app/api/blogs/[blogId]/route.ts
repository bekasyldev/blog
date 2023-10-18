import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { blogId: string } }
  ) {
    try {
      const { blogId } = params;
      const values = await req.json();
  
  
      const course = await db.blog.update({
        where: {
          id: blogId
        },
        data: {
          ...values,
        }
      });
      return NextResponse.json(course)
    } catch (error) {
        console.log("[BLOG ID]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
};