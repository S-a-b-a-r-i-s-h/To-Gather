import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import React from "react";
import { FaRegCalendarAlt } from "react-icons/fa";

import { auth } from "@/auth";
import UserAvatar from "@/components/UserAvatar";
import { getEventById } from "@/lib/actions/event.action";

type User = {
  name: string;
  image: string;
  _id: string;
};
type PopulatedEvent = Events & {
  dynamicFields?: {
    namelabel?: string;
    label?: string;
    type?: "text" | "number" | "select" | "textarea";
    options?: string[] | undefined;
    value?: string | number | string[];
  }[] | [];

  createdBy: User;
  participants: Array<{
    participantId: { _id: string; name: string; image: string };
    dynamicFields: Array<{
      label: string;
      value: string | number | string[];
      options?: string[];
      namelabel?: string;
      type?: "text" | "number" | "select" | "textarea";
    }>;  
  }>;
  groupDetails?: Array<{
    name: string;
    members: {_id: string; name: string; image: string}[];
    _id: string;
  }>;
};

const EventDetails = async ({
  params,
}: {
  params: Promise<{ id: string; eventId: string }>;
}) => {
  const session = await auth();
  if (!session) return redirect("/home");

  const { id, eventId } = await params;

  const { data: event, success } = await getEventById({ eventId });
  if (!success) return notFound();

  const populatedEvent = event as PopulatedEvent;

  const canApply =
    event?.dynamicFields &&
    session?.user?.id !== populatedEvent?.createdBy._id &&
    populatedEvent?.participants?.every(
      (participant) => participant?.participantId?._id !== session?.user?.id
    );

  // console.log("participant", populatedEvent?.participants);
  console.log("groups", populatedEvent?.groupDetails);

  const backendDate = event?.date;
  const formattedDate = backendDate
    ? format(new Date(backendDate), "dd MMM yyyy")
    : "Date not available";

  return (
    <>
      <section className="flex justify-center bg-contain">
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
          <Image
            src={event?.imageUrl ? event.imageUrl : "/images/auth-dark.jpg"}
            alt={`event image`}
            width={1000}
            height={1000}
            className="h-full min-h-[300px] rounded-lg object-cover object-center"
          />

          <div className="flex w-full flex-col gap-8 p-5 md:p-10">
            <div className="flex flex-col gap-6">
              <h2 className="h2-bold">{event?.title}</h2>
              {/* <div className="flex gap-3">
                <p className="rounded-full bg-green-500/10 px-5 py-2 text-green-700">
                  {event?.price === 0 ? "Free" : "Rs " + event?.price}
                </p>
              </div> */}

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="ml-2 mt-2 flex items-center gap-6 sm:mt-0">
                  <p>By</p>
                  <div className="flex items-center gap-2">
                    <UserAvatar
                      id={populatedEvent?.createdBy._id}
                      image={populatedEvent?.createdBy.image}
                      name={populatedEvent?.createdBy.name}
                      className="size-7 rounded-full"
                    />
                    <p className="text-primary-500">
                      {populatedEvent?.createdBy.name}
                    </p>
                  </div>
                </div>
              </div>
              <div className="ml-2 mt-2 flex items-center gap-6 sm:mt-0">
                <FaRegCalendarAlt className="text-2xl text-indigo-500" />
                <p>{formattedDate}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="font-semibold">About the Event</h2>
                <p className="text-gray-500">{event?.description}</p>
                {/* <p className="p-medium-16 lg:p-regular-18 truncate text-primary-500 underline">{event.url}</p> */}
              </div>
              <p>
                This is <span className="text-indigo-500">{event?.type}</span>{" "}
                participation event.
              </p>
              {canApply && (
                <Link
                  href={`/community/${id}/event/${eventId}/apply`}
                  className="primary-bg-gradient min-h-[46px] w-fit rounded-lg px-4 py-3 !text-light-900"
                >
                  Apply for this event
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
      {populatedEvent.participants.length > 0 && (
        <div className="mt-16">
          <h1 className="h1-bold mb-5">Participants</h1>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {populatedEvent.participants.map((participant) => (
              <div
                key={participant.participantId._id}
                className="flex flex-col items-start gap-4 rounded-lg bg-white p-6 shadow-lg transition-transform hover:scale-105"
              >
                <div className="flex items-center gap-4">
                  <UserAvatar
                    id={participant.participantId._id}
                    image={participant.participantId.image}
                    name={participant.participantId.name}
                    className="size-10 rounded-full"
                  />
                  <div>
                    <p className="text-lg font-semibold text-gray-800">
                      {participant.participantId.name}
                    </p>
                  </div>
                </div>
                <div className="w-full">
                  {participant.dynamicFields?.map((field, fieldIndex) => (
                    <div
                      key={fieldIndex}
                      className="flex flex-col border-b py-2 last:border-b-0"
                    >
                      <span className="font-medium text-gray-600">
                        {field.label}:
                      </span>
                      <span className="break-words text-gray-800">
                        {field.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {populatedEvent.groupDetails &&
        populatedEvent?.groupDetails?.length > 0 && (
          <div className="mt-16">
            <h1 className="h1-bold mb-5">Groups</h1>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {populatedEvent.groupDetails.map((group) => (
                <div
                  key={group._id}
                  className="flex flex-col items-start gap-4 rounded-lg bg-white p-6 shadow-lg transition-transform hover:scale-105"
                >
                  <div className="flex flex-col gap-4 text-gray-800">
                    <div>
                      <p className="text-lg font-semibold text-gray-800">
                        {group.name}
                      </p>
                      {group.members &&
                        group.members.length > 0 &&
                        session?.user?.id &&
                        (group.members.some(member => member._id === session?.user?.id) ? (
                          <p className="text-gray-800">{group._id}</p>
                        ) : (
                          <p className="text-gray-800">id: Only members can view id.</p>
                        ))}
                    </div>
                    <p className="font-semibold text-gray-800">Members:</p>
                    {group.members?.map((member) => (
                      <div key={member._id} className="flex items-center gap-4">
                        <p>{member.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
    </>
  );
};

export default EventDetails;
