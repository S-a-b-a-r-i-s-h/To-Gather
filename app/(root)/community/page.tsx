import { Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import CommunityCard from "@/components/cards/CommunityCard";
// import HomeFilter from "@/components/filters/HomeFilter";
import Pagination from "@/components/Pagination";
import LocalSearch from "@/components/search/LocalSearch";
import { getCommunities } from "@/lib/actions/community.action";

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}
export const metadata: Metadata = {
  title: "To-Gather | Communities",
  description:
    "Search for communities that you are interested in and join them to start engaging with like-minded people.",
};

export async function generateStaticParams() {
  try {
    const { success, data } = await getCommunities({
      page: 1,
      pageSize: 10,
      query: "",
      filter: "",
    });

    if (!success || !data?.communities) return [];

    return data.communities.map((community) => ({
      params: { id: community._id },
    }));
  } catch (error) {
    console.error("Error fetching communities:", error);
    return [];
  }
}


const Community = async ({ searchParams }: SearchParams) => {
  const result = await auth();
  //   const { user }  = result || {};

  const { page, pageSize, query, filter } = await searchParams;

  const { success, data, error } = await getCommunities({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 2,
    query: query || "",
    filter: filter || "",
  });

  //   const { success, data, error } = await getCommunitiesByUser({
  //     page: Number(page) || 1,
  //     pageSize: Number(pageSize) || 10,
  //     query: query || "",
  //     filter: filter || "",
  //     id: user?.id
  //   })

  const { communities, isNext } = data || {};
  //   console.log(communities);

  return result?.user ? (
    <>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Communities</h1>

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
        <div className="mt-10 grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {communities && communities.length > 0 ? (
            communities.map((community) => (
              <CommunityCard
                key={community._id}
                id={community._id}
                title={community.title}
                // description={community.description}
                members={community.members.length}
                secondaryAdmins={community.secondaryAdmins.length}
                price={community.price}
                image={community.img}
                shortDescription={community.shortDescription}
              />
            ))
          ) : (
            <div className="mt-10 flex w-full items-center justify-center">
              <p className="text-dark400_light700">No Communities</p>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-10 flex w-full items-center justify-center">
          <p className="text-dark400_light700">
            {error?.message || "Failed to fetch communities"}
          </p>
        </div>
      )}
      <Pagination page={page} isNext={isNext || false} />
    </>
  ) : (
    redirect("/")
  );
};

export default Community;
