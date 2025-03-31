import { notFound, redirect } from "next/navigation";
import React from "react";

import { auth } from "@/auth";
import ApplyEventForm from "@/components/forms/ApplyEventForm";
import { getEventById } from "@/lib/actions/event.action";

type Params = Promise<{ id: string; eventId: string }>;
const page = async ({
  params,
}: {
  params: Params;
}) => {
  const session = await auth();
  if (!session) return redirect("/home");

  const { id, eventId } = await params;

  const { data: event, success } = await getEventById({ eventId });
  if (!success) return notFound();
  const eventType = event?.type;

  return (
    <div>
      <h1 className="h1-bold">Fill the form</h1>

      <ApplyEventForm
        dynamicFields = {event?.dynamicFields ? event?.dynamicFields : []}
        participantId={session?.user?.id || ""}
        eventId={eventId}
        communityId={id}
        eventType={eventType || ""}
      />
    </div>
  );
};

export default page;
