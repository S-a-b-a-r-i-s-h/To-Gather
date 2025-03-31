"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/hooks/use-toast";
import { createEvent } from "@/lib/actions/event.action";
import { useUploadThing } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import { dummySchema } from "@/lib/validations";

import { FileUploader } from "../FileUploader";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

interface Props {
  userId: string;
  paramsId: string;
}

const EventForm = ({ userId, paramsId }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [files, setFiles] = useState<File[]>([]);

  const { startUpload } = useUploadThing("imageUploader");
  const router = useRouter();
  // const { params } = useParams();
  const form = useForm<z.infer<typeof dummySchema>>({
    resolver: zodResolver(dummySchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      date: undefined,
      imageUrl: "",
      // type: "individual",
      teamSize: 0,
      label: "",
      inputType: "text",
      options: "",
      dynamicFields: [],
      participants: [
        // {
        //   id: "",
        //   dynamicFields: [],
        // },
      ],
      communityId: paramsId,
      createdBy: userId,
      groupDetails: [
        {
          name: "",
          members: [],
        },
      ],
      // inputType: "text",
    },
  });

  const type = form.watch("type");
  // const inputType = form.watch("inputType");

  const [label, setLabel] = React.useState("");
  const [inputType, setInputType] = React.useState<
    "text" | "number" | "select" | "textarea"
  >("text");
  const [optionInput, setOptionInput] = React.useState("");
  const [options, setOptions] = React.useState<string[]>([]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "dynamicFields",
  });

  const addField = () => {
    console.log("params is: " + paramsId);
    console.log("userId is: " + userId);
    const namelabel = label.trim().toLowerCase().replace(/\s/g, "_");
    append({ namelabel, label, type: inputType, options, value: "" });
    setLabel("");
    setInputType("text");
    setOptions([]);
  };
  const removeField = (index: number) => {
    remove(index);
  };

  // Add a new option to the options array
  const addOption = () => {
    if (optionInput.trim()) {
      setOptions((prev) => [...prev, optionInput.trim()]);
      setOptionInput(""); // Reset the input field
    }
  };

  // Remove an option from the options array
  const removeOption = (index: number) => {
    setOptions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCreateEvent = async (data: z.infer<typeof dummySchema>) => {
    console.log(data);
    let uploadedImageUrl = data.imageUrl;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) {
        return;
      }

      uploadedImageUrl = uploadedImages[0].url;
      data.imageUrl = uploadedImageUrl;
    }
    startTransition(async () => {
      const result = await createEvent(data);

      if (result.success) {
        toast({
          title: "Success",
          description: "Event created successfully",
        });

        if (result.data)
          router.push(`/community/${paramsId}/event/${result.data?._id}`);
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
        onSubmit={form.handleSubmit(handleCreateEvent)}
      >
        {/* <h1>{paramsId}</h1> */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel
                className="paragraph-semibold text-dark400_light800"
                htmlFor="title"
              >
                Event Name <span className="primary-text-gradient">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px]"
                  id="title"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                The name of your Event
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
                htmlFor="description"
              >
                Description
                <span className="primary-text-gradient">*</span>
              </FormLabel>
              <FormControl className="h-56">
                <Textarea
                  className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px]"
                  id="description"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                About the event.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel
                className="paragraph-semibold text-dark400_light800"
                htmlFor="imageUrl"
              >
                Event Image <span className="primary-text-gradient">*</span>
              </FormLabel>
              <FormControl>
                <FileUploader
                  onFieldChange={field.onChange}
                  imageUrl={field.value}
                  setFiles={setFiles}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Upload an image for the event.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel
                className="paragraph-semibold text-dark400_light800"
                htmlFor="price"
              >
                Price <span className="primary-text-gradient">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px]"
                  type="text"
                  id="price"
                  {...field}
                  onChange={(e) => {
                    // Parse the input value to a number before updating the field value
                    const value =
                      e.target.value === "" ? 0 : parseFloat(e.target.value);
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Price to join the event. Enter 0 if it&apos;s free.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel htmlFor="date">Date of event</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                      id="date"
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto size-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>Enter the date of the event</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel
                className="paragraph-semibold text-dark400_light800"
                htmlFor="description"
              >
                Event Type
                <span className="primary-text-gradient">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an event type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="individual">Individual</SelectItem>
                  <SelectItem value="group">Group</SelectItem>
                </SelectContent>
                <FormDescription className="body-regular mt-2.5 text-light-500">
                  Individual or Group participation.
                </FormDescription>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {type === "group" && (
          <FormField
            control={form.control}
            name="teamSize"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel
                  className="paragraph-semibold text-dark400_light800"
                  htmlFor="teamSize"
                >
                  Team Size <span className="primary-text-gradient">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px]"
                    type="text"
                    id="teamSize"
                    {...field}
                    onChange={(e) => {
                      const value =
                        e.target.value === "" ? 0 : parseFloat(e.target.value);
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormDescription className="body-regular mt-2.5 text-light-500">
                  Number of participants in a team.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <h1 className="h1-bold">Dynamic Fields</h1>
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel
                className="paragraph-semibold text-dark400_light800"
                htmlFor="label"
              >
                Label Name <span className="primary-text-gradient">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px]"
                  id="label"
                  {...field}
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Enter label for the field
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="inputType"
          render={() => (
            <FormItem className="flex w-full flex-col">
              <FormLabel
                className="paragraph-semibold text-dark400_light800"
                htmlFor="description"
              >
                Input Type
                <span className="primary-text-gradient">*</span>
              </FormLabel>
              <Select
                onValueChange={(
                  value: "text" | "number" | "select" | "textarea"
                ) => setInputType(value)}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an event type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="number">Number</SelectItem>
                  <SelectItem value="select">Select</SelectItem>
                  <SelectItem value="textarea">Text Area</SelectItem>
                </SelectContent>
                <FormDescription className="body-regular mt-2.5 text-light-500">
                  Type of the Label.
                </FormDescription>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {inputType === "select" && (
          <FormField
            control={form.control}
            name="options"
            render={() => (
              <FormItem>
                <FormLabel htmlFor="options">Options</FormLabel>
                <FormControl>
                  <Input
                    id="options"
                    value={optionInput}
                    onChange={(e) => setOptionInput(e.target.value)}
                  />
                </FormControl>
                <button
                  type="button"
                  className="rounded-lg px-2 py-1 text-green-500"
                  onClick={addOption}
                >
                  Add Option
                </button>
                <ul>
                  {options.map((option, index) => (
                    <li key={index}>
                      {option}
                      <button
                        type="button"
                        onClick={() => removeOption(index)}
                        className="w-fit p-2 text-red-600"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </FormItem>
            )}
          />
        )}
        <button
          type="button"
          onClick={addField}
          className="w-fit rounded-lg bg-green-500 p-2 !text-light-900"
        >
          Add Field
        </button>

        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex gap-4 rounded-lg px-3 py-2 shadow-sm shadow-black dark:shadow-white"
          >
            <span>{field.label}</span>
            <span>{field.type}</span>
            <button
              type="button"
              onClick={() => removeField(index)}
              className="w-fit text-red-600"
            >
              Remove
            </button>
          </div>
        ))}
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
            <> {"Create an Event"} </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default EventForm;
