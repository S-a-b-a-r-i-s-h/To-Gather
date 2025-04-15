import Link from "next/link";

// import { getCommunities } from "@/lib/actions/community.action";

import CommunityCard from "../cards/CommunityCard";
import Pagination from "../Pagination";

type PageProps = {
  query: string;
  page: number;
  pageSize: number;
  filter: string;
  id?: string;
}
interface CommunitiesProps<T extends PageProps> {
  fetchFunction: (params: T) => Promise<ActionResponse<{ communities: Community[]; isNext: boolean }>>;
  fetchParams: T;
}
const Communities = async <T extends PageProps>({
  fetchFunction,
  fetchParams,
}: CommunitiesProps<T>) => {
  const { success, data, error } = await fetchFunction(fetchParams) as ActionResponse<{
    communities: Community[];
    isNext: boolean;
  }>;

  const { communities, isNext } = data || {};
  return (
    <div>
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
                No Communities matching <b>&quot;{fetchParams.query}&quot;</b>{" "}
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
      {communities && communities.length > 0 && (
        <Pagination page={fetchParams.page} isNext={isNext || false} />
      )}
    </div>
  );
};

export default Communities;
