"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { CreateCommunitySchema } from "@/lib/validations";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import Image from "next/image";
// import Editor from "../editor";
import { MDXEditorMethods } from "@mdxeditor/editor";
import dynamic from "next/dynamic";
import { z } from "zod";

const Editor = dynamic(() => import("@/components/editor"), { ssr: false });

const CommunityForm = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const editorRef = React.useRef<MDXEditorMethods>(null);

  const form = useForm({
    resolver: zodResolver(CreateCommunitySchema),
    defaultValues: {
      image: "",
      title: "",
      description: "",
      price: "0",
    },
  });

  const handleCreateCommunity = (data: z.infer<typeof CreateCommunitySchema>) => {
    console.log(data);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-10"
        onSubmit={form.handleSubmit(handleCreateCommunity)}
      >
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Community Image <span className="primary-text-gradient">*</span>
              </FormLabel>
              {imagePreview && (
                <img src={imagePreview} alt="Community Preview" width={800} height={400} className="mb-4 max-h-64 object-cover" />
              )}
              <FormControl className="">
                <Input
                  className=" max-sm:text-[15px text-dark300_light700 no-focus min-h-[56px] border-none"
                  type="file"
                  accept="image/*"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    handleImageChange(e);
                  }}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Upload an image for your community
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Community Name <span className="primary-text-gradient">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px]"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                The name of your community
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Description <span className="primary-text-gradient">*</span>
              </FormLabel>
              <FormControl>
                <Editor editorRef={editorRef} value={field.value} fieldChange={field.onChange} />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Give a brief description of your community
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Price <span className="primary-text-gradient">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px]"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                How much does it cost to join your community?, per annum
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-16 flex justify-end">
          <Button
            type="submit"
            className="primary-bg-gradient w-fit !text-light-900"
          >
            Create Community
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CommunityForm;
