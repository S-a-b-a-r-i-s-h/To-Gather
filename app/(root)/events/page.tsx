import { Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import EventCard from "@/components/cards/EventCard";
import Pagination from "@/components/Pagination";
import LocalSearch from "@/components/search/LocalSearch";
import { getEventsByUserId } from "@/lib/actions/event.action";

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}

export const metadata: Metadata = {
  title: "To-Gather | Communities",
  description:
    "Search for events that you are interested in and join them to start engaging with like-minded people.",
};

const page = async ({ searchParams }: SearchParams) => {
  const result = await auth();
  if (!result?.user) {
    return redirect("/");
  }
  const { page, pageSize, query, filter } = await searchParams;
  const { success, data, error } = await getEventsByUserId({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 2,
    query: query || "",
    filter: filter || "",
    id: result?.user?.id,
  });

  const { events, isNext } = data || {};
  return (
    <>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">Events created by you</h1>

        {/* <Button
          className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900"
          asChild
        >
          <Link href={ROUTES.CREATE_COMMUNITY}>Create a Community</Link>
        </Button> */}
      </section>
      <section className="mt-11">
        <LocalSearch
          route="/community"
          imgSrc="/icons/search.svg"
          placeholder="Search all communities..."
          otherClasses="flex-1"
        />
      </section>
      {/* <HomeFilter /> */}
      {success ? (
        <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {events && events.length > 0 ? (
            events.map((event) => {
                console.log(event);
                return (
                    <EventCard
                        key={event._id}
                        communityId={event.community}
                        eventId={event._id}
                        title={event.title}
                        description={event.description}
                        // price={event.price}
                        date={event.date}
                        imageUrl={event.imageUrl}
                        eventType={event.type}
                    />
                )
            })
          ) : (
            <div className="mt-10 flex w-full items-center justify-center">
              <p className="text-dark400_light700">No Events</p>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-10 flex w-full items-center justify-center">
          <p className="text-dark400_light700">
            {error?.message || "Failed to fetch events"}
          </p>
        </div>
      )}
      <Pagination page={page} isNext={isNext || false} />
    </>
  );
};

export default page;
