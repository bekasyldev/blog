import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function PATCH (
    req: Request,
    { params } : { params: { blogId: string}}
) {
    try {
        const authorBlog = await db.blog.findUnique({
            where: {
                id: params.blogId
            }
        })
        
        if(!authorBlog){
            return new NextResponse("Not found", {status: 404})
        }

        const publishBlog = await db.blog.update({
            where: {
                id: params.blogId
            },
            data: {
                isPublished: true
            }
        })
        return NextResponse.json(publishBlog)
    } catch (error) {
        console.log("[BLOG ID PUBLISH]", error)
        return NextResponse
    }
}