import type { Metadata } from "next";
// import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import { auth } from "@/auth";
// import CommunityCard from "@/components/cards/CommunityCard";
import ComponentsLoading from "@/components/loading/ComponentsLoading";
// import Pagination from "@/components/Pagination";
import LocalSearch from "@/components/search/LocalSearch";
import Communities from "@/components/show/Communities";
import { getCommunities } from "@/lib/actions/community.action";
// import { getCommunities } from "@/lib/actions/community.action";

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
  },
};

const Community = async ({ searchParams }: SearchParams) => {
  const result = await auth();
  if (!result?.user) {
    return redirect("/");
  }

  const { page, pageSize, query, filter } = await searchParams;

  // const { success, data, error } = await getCommunities({
  //   page: Number(page) || 1,
  //   pageSize: Number(pageSize) || 2,
  //   query: query || "",
  //   filter: filter || "",
  // });

  // const { communities, isNext } = data || {};

  return (
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
      <Suspense fallback={<ComponentsLoading />}>   
        <Communities 
          fetchFunction = {getCommunities}
          fetchParams = {{
            page: Number(page) || 1,
            pageSize: Number(pageSize) || 1,
            query: query || "",
            filter: filter || "",
          }}
          // page={Number(page) || 1}
          // pageSize={Number(pageSize) || 2}
          // query={query || ""}
          // filter={filter || ""}
        />
      </Suspense>
      
    </>
  );
};

export default Community;
