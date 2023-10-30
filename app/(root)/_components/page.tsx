"use client";

import axios from "axios";
import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const formScheme = z.object({
  title: z.string().min(1, { message: "Title is required" }),
});

const CreateBlog = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formScheme>>({
    resolver: zodResolver(formScheme),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formScheme>) => {
    try {
      const response = await axios.post("/api/blogs", values);
      router.push(`/writer/blogs/${response.data.id}`);
      toast.success("Course created");
    } catch (error) {
      toast.error("Somethign went wrong");
    }
  };

  return (
    <div className="max-w-5xl mx-auto flex items-center justify-center h-full mt-10 text-black">
      <div className="space-y-3 p-10 rounded-md bg-white">
        <h1 className="text-2xl">Title of your blog</h1>
        <p className="text-sm text-slate-700">
          What would you like to name your blog? Don&apos;t worry, you can
          change this later.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blog title</FormLabel>
                  <FormControl>
                    <Input
                      className="text-black"
                      disabled={isSubmitting}
                      placeholder="e.g. 'Advanced web development'"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    What will you provide in this blog?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Link href="/">
                <Button type="button" variant="ghost">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateBlog;
