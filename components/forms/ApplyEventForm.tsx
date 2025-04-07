"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/hooks/use-toast";
import { updateEventParticipants } from "@/lib/actions/event.action";
import { ApplyEventSchema } from "@/lib/validations";

import { Form, FormControl } from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

interface Props {
  dynamicFields: {
    namelabel?: string;
    label?: string;
    type?: "text" | "number" | "select" | "textarea";
    options?: string[];
    value?: string | number | string[];
  }[];
  participantId: string;
  eventId: string;
  eventType: string;
  communityId: string;
  groups: { name: string; members: string[] }[];
}

const ApplyEventForm = ({
  dynamicFields,
  participantId,
  eventId,
  eventType,
  communityId,
  groups
}: Props) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof ApplyEventSchema>>({
    resolver: zodResolver(ApplyEventSchema),
    defaultValues: {
      dynamicFields: dynamicFields.map((field) => ({
        namelabel: "",
        label: field.label,
        type: field.type,
        options: field.options || [],
        value: field.value || "",
      })),
      participants: [],
      groupDetails: [],
    },
  });

  const handleApplyEvent = async (data: z.infer<typeof ApplyEventSchema>) => {
    const groupDetails = data.groupDetails;
    if (eventType === "group") {
      if (groupDetails?.[0]?.name) {
        // Create a new group
        const newGroup = {
          name: groupDetails[0].name,
          members: [participantId],
        };
        groupDetails.push(newGroup);
      } else if (groupDetails?.[0]?.members) {
        // Join an existing group
        groupDetails[0].members.push(participantId);
      }
    }
    // console.log("Submitted Data: dynamicField", data.dynamicFields);
    // console.log({
    //   participantId,
    //   dynamicFields: data.dynamicFields,
    // });
    const datadynamicFields = data.dynamicFields;
    // console.log("datadynamicFields", datadynamicFields);

    const groupAction = form.getValues("groupAction");
    let newGroup: { name: string; members: string[] } = {
      name: "",
      members: [],
    };
    if (groupAction === "create") {
      const groupName = form.getValues("groupDetails.0.name"); // Get the group name
      if (groupName) {
        newGroup = {
          name: groupName,
          members: [participantId], // Add the participant's ID to members
        };
  
        console.log("New Group Created:", newGroup);
      } else {
        console.error("Group name is required to create a group.");
      }
    } else if (groupAction === "join") {
      const groupName = form.getValues("groupDetails.0.name"); // Get the group name
      if (groupName) {
        newGroup = {
          name: groupName,
          members: [participantId], 
        };
  
        console.log("New Group Joined:", newGroup);
      } else {
        console.error("Group name is required to join a group.");
      }
    }
    console.log({
      eventId,
      participantId,
      datadynamicFields,
      newGroup,
      groupAction,
    })

    startTransition(async () => {
      const result = await updateEventParticipants({
        eventId,
        participantId,
        datadynamicFields,
        newGroup,
        groupAction,
      });

      if (result.success) {
        toast({
          title: "Success",
          description: "Event participation updated successfully",
        });

        if (result.data) router.push(`/community/${communityId}/event/${eventId}`);
      } else {
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
        });
      }
    });
  };
  console.log(groups, "groups")

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-10"
        onSubmit={form.handleSubmit(handleApplyEvent)}
      >
        {dynamicFields.map((dynamicField, index) => (
          <div key={index} className="mb-4">
            <Label>{dynamicField.label}</Label>
            <div className="mt-2">
              {dynamicField.type === "text" && (
                <Input
                  {...form.register(`dynamicFields.${index}.value`)}
                  placeholder="Enter value"
                />
              )}
              {dynamicField.type === "number" && (
                <Input
                  type="number"
                  {...form.register(`dynamicFields.${index}.value`)}
                  placeholder="Enter value"
                />
              )}
              {dynamicField.type === "textarea" && (
                <Textarea
                  {...form.register(`dynamicFields.${index}.value`)}
                  placeholder="Enter value"
                />
              )}
              {dynamicField.type === "select" && (
                <Controller
                  name={`dynamicFields.${index}.value`}
                  control={form.control}
                  render={({ field }) => (
                    <Select
                      value={String(field.value)}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {dynamicField.options?.map((option, optionIndex) => (
                          <SelectItem key={optionIndex} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              )}
            </div>
          </div>
        ))}
        {eventType === "group" && (
          <div className="mb-4">
            <Label>Create or Join a Group</Label>
            <div className="mt-2 flex flex-col gap-4">
              <Controller
                name="groupAction"
                control={form.control}
                defaultValue={undefined}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an action" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="create">Create Group</SelectItem>
                      <SelectItem value="join">Join Group</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {form.watch("groupAction") === "create" && (
                <Input
                  {...form.register("groupDetails.0.name")}
                  placeholder="Enter group name"
                />
              )}
              {/* ask for the group name to join */}
              {form.watch("groupAction") === "join" && (
                <Input
                  {...form.register("groupDetails.0.name")}
                  placeholder="Enter group name"
                />
              )}
            </div>
          </div>
        )}
        <button
          type="submit"
          className="primary-bg-gradient w-fit rounded-lg px-4 py-2"
        >
          Submit
        </button>
      </form>
    </Form>
  );
};

export default ApplyEventForm;
