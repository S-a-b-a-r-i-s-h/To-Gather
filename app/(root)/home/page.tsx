import { redirect } from "next/navigation";

import { auth } from "@/auth";
import CommunityCard from "@/components/cards/CommunityCard";
// import HomeFilter from "@/components/filters/HomeFilter";
import LocalSearch from "@/components/search/LocalSearch";
import { getCommunitiesByUser } from "@/lib/actions/community.action";

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}

const Home = async ({ searchParams }: SearchParams) => {
  const result = await auth();
  const { user } = result || {};

  const { page, pageSize, query, filter } = await searchParams;

  // const { success, data, error } = await getCommunities({
  //   page: Number(page) || 1,
  //   pageSize: Number(pageSize) || 10,
  //   query: query || "",
  //   filter: filter || "",
  // });

  const { success, data, error } = await getCommunitiesByUser({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    query: query || "",
    filter: filter || "",
    id: user?.id,
  });

  const { communities } = data || {};
  // console.log(communities);

  return result?.user ? (
    <>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">My Communities</h1>

        {/* <Button
          className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900"
          asChild
        >
          <Link href={ROUTES.CREATE_COMMUNITY}>Create a Community</Link>
        </Button> */}
      </section>
      <section className="mt-11">
        <LocalSearch
          route="/home"
          imgSrc="/icons/search.svg"
          placeholder="Search for your communities..."
          otherClasses="flex-1"
        />
      </section>
      {/* <HomeFilter /> */}
      {success ? (
        <div className="">
          {communities && communities.length > 0 && (
            <h1 className="primary-text-gradient h2-bold mt-10 inline-block">
              Admin
            </h1>
          )}
          <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {communities && communities.length > 0 ? (
              communities.map((community) => (
                <CommunityCard
                  key={community._id}
                  id={community._id}
                  title={community.title}
                  description={community.description}
                  members={community.members.length}
                  secondaryAdmins={community.secondaryAdmins.length}
                  price={community.price}
                  image={community.img}
                />
              ))
            ) : (
              <div className="mt-10 flex w-full items-center justify-center">
                <p className="text-dark400_light700">No Communities</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="mt-10 flex w-full items-center justify-center">
          <p className="text-dark400_light700">
            {error?.message || "Failed to fetch communities"}
          </p>
        </div>
      )}
    </>
  ) : (
    redirect("/")
  );
};

export default Home;
