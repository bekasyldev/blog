import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();
 
export const ourFileRouter = {
  blogImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .onUploadComplete(() => {}),
  blogAttachment: f(["text", "image", "video", "audio", "pdf"])
    .onUploadComplete(() => {}),
  blogVideo: f({ video: { maxFileCount: 1, maxFileSize: "512GB" } })
    .onUploadComplete(() => {})
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;