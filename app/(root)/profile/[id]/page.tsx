import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import React from "react";
import { FaSquareGithub } from "react-icons/fa6";
import { GrLinkedin } from "react-icons/gr";

import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import { getUserById } from "@/lib/actions/user.action";

const UserDetails = async ({ params }: { params: { id: string } }) => {
  const session = await auth();
  if (!session) return redirect("/home");

  const {id: userId} = await params;

  const { data: user, success } = await getUserById({ userId });
  if (!success) return notFound();
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
      {user?.bio && (
        <div>
          <h1 className="h1-bold">Bio</h1>
          <p>{user.bio}</p>
        </div>
      )}

      <div className="mb-5 flex justify-center gap-5">
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
    </div>
  );
};

export default UserDetails;
