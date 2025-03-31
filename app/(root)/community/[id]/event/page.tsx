import { redirect } from "next/navigation";
import React from "react";

import { auth } from "@/auth";
import EventCard from "@/components/cards/EventCard";
import EventFilter from "@/components/filters/EventFilter";
// import HomeFilter from "@/components/filters/HomeFilter";
import LocalSearch from "@/components/search/LocalSearch";
import { getEventsByCommunityId } from "@/lib/actions/event.action";

interface EventPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string }>;
}

const page = async ({ params, searchParams }: EventPageProps) => {
  const session = await auth();
  if (!session) return redirect("/home");

  const { id } = await params;
  const { page, pageSize, query, filter } = await searchParams;

  const { success, data, error } = await getEventsByCommunityId({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    query: query || "",
    filter: filter || "",
    id,
  });

  const { events } = data || {};

  return (
    <>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Events</h1>

        {/* <Button
          className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900"
          asChild
        >
          <Link href={ROUTES.CREATE_COMMUNITY}>Create a Community</Link>
        </Button> */}
      </section>
      <section className="mt-11">
        <LocalSearch
          route={`/community/${id}/event`}
          imgSrc="/icons/search.svg"
          placeholder="Search for your events..."
          otherClasses="flex-1"
        />
      </section>
      {/* <HomeFilter /> */}
      <EventFilter />
      {success ? (
        <div className="">
          {/* {events && events.length > 0 && (
            <h1 className="primary-text-gradient h2-bold mt-10 inline-block">
              Admin
            </h1>
          )} */}
          <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {events && events.length > 0 ? (
              events.map((event) => (
                <EventCard
                  key={event._id}
                  communityId={id}
                  eventId={event._id}
                  title={event.title}
                  description={event.description}
                  // price={event.price}
                  date={event.date}
                  imageUrl={event.imageUrl}
                  eventType={event.type}
                />
              ))
            ) : (
              <div className="mt-10 flex w-full items-center justify-center">
                <p className="text-dark400_light700">No Events</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="mt-10 flex w-full items-center justify-center">
          <p className="text-dark400_light700">
            {error?.message || "Failed to fetch events"}
          </p>
        </div>
      )}
    </>
  );
};

export default page;
