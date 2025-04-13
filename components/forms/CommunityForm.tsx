"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { ReloadIcon } from "@radix-ui/react-icons";
import dynamic from "next/dynamic";
// import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/hooks/use-toast";
import { createCommunity, editCommunity } from "@/lib/actions/community.action";
import { useUploadThing } from "@/lib/uploadthing";
import { CreateCommunitySchema } from "@/lib/validations";

import { FileUploader } from "../FileUploader";
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

const Editor = dynamic(() => import("@/components/editor"), { ssr: false });

interface Params {
  community?: Community;
  isEdit?: boolean;
}
const CommunityForm = ({ community, isEdit = false }: Params) => {
  const [files, setFiles] = useState<File[]>([]);

  const { startUpload } = useUploadThing("imageUploader");
  const router = useRouter();

  // const [imagePreview, setImagePreview] = useState<string>("");
  const editorRef = React.useRef<MDXEditorMethods>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(CreateCommunitySchema),
    defaultValues: {
      image: community?.img || "",
      title: community?.title || "",
      description: community?.description || "",
      shortDescription: community?.shortDescription || "",
      price: community?.price || "",
      linkedin: community?.linkedin || "",
      x: community?.x || "",
      github: community?.github || "",
      instagram: community?.instagram || "",
      whatsapp: community?.whatsapp || "",
      website: community?.website || "",
    },
  });

  const handleCreateCommunity = async (
    data: z.infer<typeof CreateCommunitySchema>
  ) => {
    let uploadedImageUrl = data.image;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) {
        return;
      }

      uploadedImageUrl = uploadedImages[0].url;
      data.image = uploadedImageUrl;
    }
    startTransition(async () => {
      // data.image = imagePreview || community?.img || "";
      // data.price = ""
      console.log(data);

      if (isEdit && community) {
        const result = await editCommunity({
          communityId: community?._id,
          ...data,
        });

        if (result.success) {
          toast({
            title: "Success",
            description: "Community updated successfully",
          });

          if (result.data) router.push(`/community/${result.data?._id}`);
        } else {
          toast({
            title: "Error",
            description: "Something went wrong",
            variant: "destructive",
          });
        }
        return;
      }
      const result = await createCommunity(data);

      if (result.success) {
        toast({
          title: "Success",
          description: "Community created successfully",
        });

        if (result.data) router.push(`/community/${result.data?._id}`);
      } else {
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-10"
        onSubmit={form.handleSubmit(handleCreateCommunity)}
      >
        {/* <FormField
          control={form.control}
          name="image"
          render={() => (
            <FormItem className="flex w-full flex-col">
              <FormLabel
                className="paragraph-semibold text-dark400_light800"
                htmlFor="image"
              >
                {
                  <div className="flex-center flex-col py-5">
                    {imagePreview || community?.img ? (
                      <Image
                        src={imagePreview || community?.img || ""}
                        alt="preview"
                        width={1000}
                        height={1000}
                        className="size-[200px] w-auto rounded-md object-cover"
                      />
                    ) : (
                      <p className="rounded-full bg-black px-4 py-2 text-center text-sm font-semibold text-white dark:bg-white dark:text-black">
                        Select from computer
                      </p>
                    )}
                  </div>
                }
              </FormLabel>
              <FormControl className="">
                <Input
                  className=" text-dark300_light700 no-focus min-h-[56px] border-none max-sm:text-[15px]"
                  type="file"
                  accept="image/*"
                  id="image"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      const file = e.target.files[0];
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        const base64Image = reader.result as string;
                        setImagePreview(base64Image);
                        form.setValue("image", base64Image);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Upload an image for your community
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel
                className="paragraph-semibold text-dark400_light800"
                htmlFor="image"
              >
                Community Image <span className="primary-text-gradient">*</span>
              </FormLabel>
              <FormControl>
                <FileUploader
                  onFieldChange={field.onChange}
                  imageUrl={field.value}
                  setFiles={setFiles}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Upload an image for the Community.
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
                  type="text"
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
          name="shortDescription"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Short Description{" "}
                <span className="primary-text-gradient">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px]"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                This description will be displayed on the front page.
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
              <FormLabel
                className="paragraph-semibold text-dark400_light800"
                htmlFor="desc"
              >
                Description <span className="primary-text-gradient">*</span>
              </FormLabel>
              <FormControl>
                <Editor
                  id="desc"
                  editorRef={editorRef}
                  value={field.value}
                  fieldChange={field.onChange}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Give a brief description of your community
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {
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
        }
        <FormField
          control={form.control}
          name="linkedin"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                LinkedIn
              </FormLabel>
              <FormControl>
                <Input
                  className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px]"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Community LinkedIn page link
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="x"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                X
              </FormLabel>
              <FormControl>
                <Input
                  className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px]"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Community X page link
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="github"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                GitHub
              </FormLabel>
              <FormControl>
                <Input
                  className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px]"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Community GitHub page link
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="instagram"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Instagram
              </FormLabel>
              <FormControl>
                <Input
                  className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px]"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Community Instagram page link
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="whatsapp"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                WhatsApp
              </FormLabel>
              <FormControl>
                <Input
                  className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px]"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Community WhatsApp channel or group link
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Website
              </FormLabel>
              <FormControl>
                <Input
                  className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px]"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Community Website link
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
            {isPending ? (
              <>
                <ReloadIcon className="mr-2 size-4 animate-spin" />
                <span>Submitting</span>
              </>
            ) : (
              <> {isEdit ? "Edit" : "Create a Community"} </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CommunityForm;
