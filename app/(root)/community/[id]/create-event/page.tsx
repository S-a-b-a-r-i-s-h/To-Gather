import { redirect } from "next/navigation";
import React from "react";

import { auth } from "@/auth";
import EventForm from "@/components/forms/EventForm";


const page = async ({ params }: RouteParams) => {
  const session = await auth();
  if (!session?.user) return redirect("/");
  const {id} = await params;
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Provide necessary details to create an event</h1>

      <div className="mt-9">
        <EventForm userId={session.user.id ? session.user.id : ""} paramsId={id} />
      </div>
    </>
  );
};

export default page;
