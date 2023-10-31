"use client";

import * as z from "zod";
import axios from "axios";
import { PlusCircle, File, X, Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Attachment, Blog } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/FileUpload";

interface AttachmentFormProps {
  initialData: Blog & { attachments: Attachment[] };
  blogId: string;
}

const formSchema = z.object({
  url: z.string().min(1),
});

export const AttachmentForm = ({
  initialData,
  blogId,
}: AttachmentFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [delettingId, setDelettingId] = useState<string | null>(null);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/blogs/${blogId}/attachment`, values);
      toast.success("Course updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };
  const onDelete = async (id: string) => {
    try {
      setDelettingId(id);
      await axios.delete(`/api/blogs/${blogId}/attachment/${id}`);
      toast.success("Attachmet deleted");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setDelettingId(null);
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Blog attachments
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && (
            <>
              <PlusCircle className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:flex">Add a file</span>
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {initialData.attachments.length === 0 && (
            <p className="text-sm mt-2 text-slate-500 italic">
              No attachments yet
            </p>
          )}
          {initialData.attachments.length > 0 && (
            <div className="space-y-2">
              {initialData.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md"
                >
                  <File className="h-4 w-4 mr-2 flex-shrink-0" />
                  <p className="text-xs line-clamp-1">{attachment.name}</p>
                  {delettingId === attachment.id && (
                    <div>
                      <Loader2 className="w-4 h-4 animate-spin" />
                    </div>
                  )}
                  {delettingId !== attachment.id && (
                    <button
                      onClick={() => {
                        onDelete(attachment.id);
                      }}
                      className="ml-auto hover:opacity-75 transition"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="blogAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Add related file to your blog
          </div>
        </div>
      )}
    </div>
  );
};
