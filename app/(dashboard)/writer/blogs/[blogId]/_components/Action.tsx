"use client";

import axios from "axios";
import { Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/ConfrimModal";
import { publish } from "@/hooks/Publish";

interface ActionsProps {
  disabled: boolean;
  blogId: string;
  isPublished: boolean;
}

export const Actions = ({ disabled, blogId, isPublished }: ActionsProps) => {
  const router = useRouter();
  const confetti = publish();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      if (isPublished) {
        await axios.patch(`/api/blogs/${blogId}/unpublish`);
        toast.success("Course unpublished");
      } else {
        await axios.patch(`/api/blogs/${blogId}/publish`);
        toast.success("Course published");
        router.push("/");
        confetti.onOpen();
      }

      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/blogs/${blogId}`);

      toast.success("Course deleted");
      router.refresh();
      router.push(`/writer/blogs`);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-2 ">
      <Button
        className="bg-white text-black hover:bg-slate-600"
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button
          className="bg-white text-black hover:bg-slate-600"
          size="sm"
          disabled={isLoading}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};
