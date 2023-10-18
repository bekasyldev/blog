import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function POST(
    req: Request,
  ) {
    try {
      const { title } = await req.json();
  
      const course = await db.blog.create({
        data: {
          title,
        }
      });
  
      return NextResponse.json(course);
    } catch (error) {
      console.log("[BLOGS]", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }