import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import React, { cache, Suspense } from "react";
import { FaSquareGithub } from "react-icons/fa6";
import { GrLinkedin } from "react-icons/gr";

import { auth } from "@/auth";
// import CommunityCard from "@/components/cards/CommunityCard";
import ComponentsLoading from "@/components/loading/ComponentsLoading";
// import Pagination from "@/components/Pagination";
import Communities from "@/components/show/Communities";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import { getAllCommunitiesByUser } from "@/lib/actions/community.action";
import { getUserById, getUsers } from "@/lib/actions/user.action";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string }>;
}

const getUserByIdCached = cache((userId: string) => getUserById({ userId }));

export async function generateMetadata({ params }: RouteParams) {
  const { id: userId } = await params;
  if (!userId) return notFound();

  const { data: user, success } = await getUserByIdCached(userId);
  if (!success) return notFound();

  return {
    title: `${user?.name} | Profile`,
    description: user?.bio,
    openGraph: {
      type: "website",
      title: `Profile | ${user?.name}`,
      description: user?.bio,
      url: `https://tgcommunity.vercel.app/profile/${userId}`,
      images: [
        {
          url: user?.image,
          width: 1200,
          height: 630,
          alt: `${user?.name} Profile`,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  const { data } = await getUsers({});
  const { users } = data || {};

  if (!users) return [{ id: "1" }, { id: "2" }, { id: "3" }];
  console.log(users.length, "users.length");
  return users.map((user) => ({
    id: user._id.toString(),
  }));
}

const UserDetails = async ({ params, searchParams }: Props) => {
  // Parallel fetching for auth, params and searchParams
  const [session, param, searchParam] = await Promise.all([
    auth(),
    params,
    searchParams,
  ]);

  if (!session) return redirect("/home");

  const { id: userId } = param;

  const { page = "1", pageSize = "1", query = "", filter = "" } = searchParam;

  const { data: user, success } = await getUserByIdCached(userId);
  if (!success) return notFound();

  console.log("inside profile details page");
  const socialHandles = user?.linkedin || user?.github || user?.portfolio;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex w-1/2 items-center justify-start gap-8">
          {user?.image && (
            <Image
              src={user.image}
              alt="Profile Picture"
              width={100}
              height={100}
              className="rounded-full"
            />
          )}
          <div className="flex flex-col items-start justify-center">
            <h1 className="h2-bold">{user?.name}</h1>
            <p className="primary-text-gradient">@{user?.username}</p>
          </div>
        </div>
        {session.user?.id === userId && (
          <Button
            className="primary-bg-gradient min-h-[46px] px-4 py-3 !text-light-900"
            asChild
          >
            <Link href={ROUTES.EDITUSER(userId)}>Edit</Link>
          </Button>
        )}
      </div>
      <div className="mb-5 mt-11">
        {user?.bio && (
          <div>
            <h1 className="h2-bold mb-3">About</h1>
            <p>{user.bio}</p>
          </div>
        )}
      </div>

      {socialHandles && (
        <div className="mt-11 border-2">
          {socialHandles && <h1 className="h2-bold mb-3"> Social handles </h1>}
          <div className="mb-5 flex gap-5">
            {user?.linkedin && (
              <Link target="_" href={user.linkedin}>
                <GrLinkedin className="text-3xl" />
              </Link>
            )}
            {user?.github && (
              <Link target="_" href={user.github}>
                <FaSquareGithub className="text-3xl" />
              </Link>
            )}
          </div>
          {user?.portfolio && (
            <Link
              target="_blank"
              href={user?.portfolio || ""}
              className="primary-text-gradient"
            >
              Visit my Portfolio
            </Link>
          )}
        </div>
      )}

      {/* <div>
        {communities.length > 0 && (
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
        )}
      </div>
      {communities && communities.length > 0 && (
        <Pagination page={page} isNext={isNext || false} />
      )} */}
      <Suspense fallback={<ComponentsLoading />}>
        <Communities
          fetchFunction={getAllCommunitiesByUser}
          fetchParams={{
            page: Number(page) || 1,
            pageSize: Number(pageSize) || 1,
            query: query || "",
            filter: filter || "",
            id: user?._id,
          }}
        />
      </Suspense>
    </div>
  );
};

export default UserDetails;
