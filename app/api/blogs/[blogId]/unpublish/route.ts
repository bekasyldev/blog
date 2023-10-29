import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function PATCH (
    req: Request,
    { params } : { params  : { blogId: string}}
) {
    try {
        const blogAuthor = await db.blog.findUnique({
            where: {
                id: params.blogId
            }
        })
        if(!blogAuthor) {
            return new NextResponse("Not found", {status: 404})
        }
        const unpublishedBlog = await db.blog.update({
            where: {
                id: params.blogId
            },
            data: {
                isPublished: false
            }
        })
        return NextResponse.json(unpublishedBlog)
    } catch (error) {
        console.log("[BLOG ID UNPUBLISH]", error)
        return new NextResponse("Internal error", { status: 500 })
    }
}