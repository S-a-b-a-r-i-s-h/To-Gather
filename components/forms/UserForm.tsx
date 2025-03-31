"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/hooks/use-toast";
import { editUser } from "@/lib/actions/user.action";
import { EditUserSchema } from "@/lib/validations";

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
import { Textarea } from "../ui/textarea";


interface Params {
  user?: User;
  isEdit?: boolean;
}
const UserForm = ({ user, isEdit = false }: Params) => {
  const router = useRouter();

  const [imagePreview, setImagePreview] = useState<string>("");
  //   const editorRef = React.useRef<MDXEditorMethods>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(EditUserSchema),
    defaultValues: {
      name: user?.name || "Add your name",
      username: user?.username || "Add your usename",
      email: user?.email || "Add your email",
      bio: user?.bio || "",
      image: user?.image || "",
      userLocation: user?.userLocation || "",
      portfolio: user?.portfolio || "",
      github: user?.github || "",
      linkedin: user?.linkedin || "",
    },
  });

  const handleEditUser = async (data: z.infer<typeof EditUserSchema>) => {
    startTransition(async () => {
      data.image = imagePreview || user?.image || "";

      console.log({
        userId: user?._id,
        ...data,
      });

    console.log(typeof(user?._id));
        if (isEdit && user) {
          const result = await editUser({
            userId: user?._id,
            ...data,
          });

          if (result.success) {
            toast({
              title: "Success",
              description: "Community updated successfully",
            });

            if (result.data) router.push(`/profile/${result.data?._id}`);
          } else {
            toast({
              title: "Error",
              description: "Something went wrong",
              variant: "destructive",
            });
          }
        }

      //   const result = await createCommunity(data);

      //   if (result.success) {
      //     toast({
      //       title: "Success",
      //       description: "Community created successfully",
      //     });

      //     if (result.data) router.push(`/community/${result.data?._id}`);
      //   } else {
      //     toast({
      //       title: "Error",
      //       description: "Something went wrong",
      //       variant: "destructive",
      //     });
      //   }
    });
  };

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-10"
        onSubmit={form.handleSubmit(handleEditUser)}
      >
        <FormField
          control={form.control}
          name="image"
          render={() => (
            <FormItem className="flex w-full flex-col">
              <FormLabel
                className="paragraph-semibold text-dark400_light800"
                htmlFor="image"
              >
                <Image
                  src={imagePreview || user?.image || "/images/auth-dark.png"}
                  alt="Community Image"
                  width={140}
                  height={70}
                />
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
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Name <span className="primary-text-gradient">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px]"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Enter your name
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Username <span className="primary-text-gradient">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px]"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Enter the Username
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Email <span className="primary-text-gradient">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px]"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Enter your email
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="userLocation"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Location
              </FormLabel>
              <FormControl>
                <Input
                  className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px]"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Enter your City, State / Country
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel
                className="paragraph-semibold text-dark400_light800"
                htmlFor="desc"
              >
                Bio
              </FormLabel>
              <FormControl>
                <Textarea {...field} />
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
          name="portfolio"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Portfolio
              </FormLabel>
              <FormControl>
                <Input
                  className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px]"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Your Porfolio Website Link
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
              <> {isEdit ? "Edit" : "Edit your profile..."} </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UserForm;
