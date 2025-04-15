"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import CommunityCard from "@/components/cards/CommunityCard";
import Pagination from "@/components/Pagination";
import { getCommunitiesByUser } from "@/lib/actions/community.action";
import { cacheWithLocalStorage } from "@/lib/utils/cacheWithLocalStorage";

import LocalSearch from "./search/LocalSearch";

interface Data {
  communities: Community[];
  isNext: boolean;
}
const HomeComponent = ({
  userId,
  query,
  filter,
  page,
  pageSize,
}: {
  userId: string;
  query: string;
  filter: string;
  page: number;
  pageSize: number;
}) => {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    const cacheKey = `home::${userId}::${query}::${filter}::${page}`;
    cacheWithLocalStorage(cacheKey, () =>
      getCommunitiesByUser({
        page,
        pageSize,
        query,
        filter,
        id: userId,
      })
    ).then((data) => {
      setData(data ?? { communities: [], isNext: false });
    });
  }, [userId, query, filter, page, pageSize]);

  //   useEffect(() => {
  //     const cacheKey = `home::${userId}::${query}::${filter}::${page}`;
  // const cached = localStorage.getItem(cacheKey);

  // if (cached) {
  //   console.log("CACHED DATA", query);
  //   setData(JSON.parse(cached));
  // } else {
  //   cacheWithLocalStorage(cacheKey, () =>
  //     getCommunitiesByUser({
  //       page,
  //       pageSize,
  //       query,
  //       filter,
  //       id: userId,
  //     })
  //   ).then((res) => {
  //     if (res.success) {
  //         setData(res.data ?? { communities: [], isNext: false });
  //         }
  //         else {
  //         setData({ communities: [], isNext: false });
  //         }
  //     })
  //   getCommunitiesByUser({
  //     page,
  //     pageSize,
  //     query,
  //     filter,
  //     id: userId,
  //   }).then((res) => {
  //     if (res.success) {
  //       localStorage.setItem(cacheKey, JSON.stringify(res.data));
  //       setData(res.data ?? { communities: [], isNext: false });
  //     } else {
  //       setData({ communities: [], isNext: false });
  //     }
  //   });
  // }
  // setData(community);
  //   }, [userId, query, filter, page, pageSize]);

  if (!data) return null;

  const { communities = [], isNext = false } = data;

  return (
    <>
      {communities.length > 0 && (
        <h2 className="primary-text-gradient h2-bold mt-10 inline-block">
          Admin
        </h2>
      )}
      <section className="mt-11">
        <LocalSearch
          route="/home"
          imgSrc="/icons/search.svg"
          placeholder="Search for your communities..."
          otherClasses="flex-1"
        />
      </section>
      <div>
        {communities.length > 0 ? (
          <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 xl:grid-cols-3">
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
            {query ? (
              <p className="text-dark400_light700">
                No Communities matching <b>&quot;{query}&quot;</b>
              </p>
            ) : (
              <p className="text-dark400_light700">No Communities found</p>
            )}
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

      {communities.length > 0 && (
        <Pagination page={String(page)} isNext={isNext} />
      )}
    </>
  );
};

export default HomeComponent;
