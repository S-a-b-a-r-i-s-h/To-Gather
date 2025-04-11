import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import CommunityCard from "@/components/cards/CommunityCard";
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
    openGraph: {
      type: "website",
      title: "To-Gather | Communities",
      description:
        "Search for communities that you are interested in and join them to start engaging with like-minded people.",
      url: "https://tgcommunity.vercel.app/community",
    }
};

const Community = async ({ searchParams }: SearchParams) => {
  const result = await auth();
  if (!result?.user) {
    return redirect("/");
  }

  const { page, pageSize, query, filter } = await searchParams;

  const { success, data, error } = await getCommunities({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 2,
    query: query || "",
    filter: filter || "",
  });

  const { communities, isNext } = data || {};

  return(
    <>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Communities</h1>
      </section>
      <section className="mt-11">
        <LocalSearch
          route="/community"
          imgSrc="/icons/search.svg"
          placeholder="Search all communities..."
          otherClasses="flex-1"
        />
      </section>
      {success ? (
        <div>
          {communities && communities.length > 0 ? (
            <div className="mt-10 grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {communities.map((community) => (
                <CommunityCard
                  key={community._id}
                  id={community._id}
                  title={community.title}
                  members={community.members.length}
                  secondaryAdmins={community.secondaryAdmins.length}
                  price={community.price}
                  image={community.img}
                  shortDescription={community.shortDescription}
                />
              ))}
            </div>
          ) : (
            <div className="mt-10 flex w-full flex-col items-center justify-center">
              <p className="text-dark400_light700">
                No Communities matching <b>&quot;{query}&quot;</b>{" "}
              </p>
              <div>
                <Link
                  className="primary-text-gradient"
                  href={`/create-community`}
                >
                  Click Here
                </Link>
                &nbsp; to create a community
              </div>
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
      { communities && communities.length > 0 && <Pagination page={page} isNext={isNext || false} /> }
    </>
  )
};

export default Community;
