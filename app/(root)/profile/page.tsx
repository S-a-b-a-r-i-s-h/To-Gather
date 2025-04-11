import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

import { auth } from "@/auth";
import { getUsers } from "@/lib/actions/user.action";

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}



const page = async ({ searchParams }: SearchParams) => {
  const result = await auth();
  if (!result?.user) {
    return redirect("/");
  }

  const { page, pageSize, query, filter } = await searchParams;

  const { data } = await getUsers({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 2,
    query: query || "",
    filter: filter || "",
  });

  const { users } = data || {};
  return (
    <div className="flex flex-col gap-4">
      {users?.map((user) => (
        <Link key={user._id} href={`/profile/${user._id}`}>
          {" "}
          {user.name}{" "}
        </Link>
      ))}
    </div>
  );
};

export default page;
