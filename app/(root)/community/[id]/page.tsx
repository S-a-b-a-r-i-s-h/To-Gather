import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import React from "react";
import { BsTwitterX } from "react-icons/bs";
import {
  FaSquareWhatsapp,
  FaSquareInstagram,
  FaSquareGithub,
} from "react-icons/fa6";
import { GrLinkedin } from "react-icons/gr";
import { IoPeopleOutline } from "react-icons/io5";
import { LuTag } from "react-icons/lu";

import { auth } from "@/auth";
// import { Community } from "@/database";
import { Preview } from "@/components/editor/Preview";
import MemberJoin from "@/components/MemberJoin";
import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/UserAvatar";
import ROUTES from "@/constants/routes";
import { getCommunity } from "@/lib/actions/community.action";

type User = {
  name: string;
  image: string;
  _id: string;
};

type PopulatedCommunity = Community & {
  admin: User;
  secondaryAdmins: User[];
  members: User[];
};

export async function generateMetadata({ params }: RouteParams) {
  const { id } = await params;
  if (!id) return notFound();

  const { data: community, success } = await getCommunity({ communityId: id });
  if (!success) return notFound();

  const populatedCommunity = community as PopulatedCommunity;

  return {
    title: populatedCommunity.title,
    description: populatedCommunity.shortDescription,
    image: populatedCommunity.img,
  };
}

const CommunityDetails = async ({ params }: RouteParams) => {
  const { id } = await params;
  if (!id) return notFound();

  const session = await auth();
  if (!session) return redirect("/home");

  const { data: community, success } = await getCommunity({ communityId: id });
  if (!success) return notFound();

  const populatedCommunity = community as PopulatedCommunity;

  const canJoin =
    populatedCommunity.admin._id !== session?.user?.id &&
    !populatedCommunity.secondaryAdmins.some(
      (admin: User) => admin?._id === session?.user?.id
    ) &&
    !populatedCommunity.members.some(
      (member: User) => member?._id === session?.user?.id
    );

  const totalMembers =
    populatedCommunity.members.length +
    populatedCommunity.secondaryAdmins.length +
    1;

  return (
    <div className="">
      <div className="mb-5 flex justify-between ">
        <h1 className="primary-text-gradient h1-bold inline-block">
          {populatedCommunity.title}
        </h1>
        {populatedCommunity?.admin?._id === session?.user?.id && (
          <Button
            className="primary-bg-gradient min-h-[46px] px-4 py-3 !text-light-900"
            asChild
          >
            <Link href={ROUTES.EDITCOMMUNITY(id)}>Edit</Link>
          </Button>
        )}
      </div>
      <div className="mb-5 flex justify-center ">
        <Image
          src={populatedCommunity.img}
          alt={`${populatedCommunity.title} image`}
          width={500}
          height={500}
          className="min-w-[70%] max-w-full rounded-lg"
        />
      </div>
      <div className="mb-5 flex justify-around  max-md:flex-col max-md:gap-4">
        <div className="flex items-center gap-3">
          <IoPeopleOutline className="text-2xl" />
          <p>
            {totalMembers} {totalMembers === 1 ? "member" : "members"}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <LuTag className="text-2xl" />
          <p>
            {Number(populatedCommunity.price) === 0
              ? "Free"
              : populatedCommunity.price + " Rs"}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <UserAvatar
            id={populatedCommunity.admin._id}
            name={populatedCommunity.admin.name}
            image={populatedCommunity.admin.image}
          />
          <p>{"By " + populatedCommunity.admin.name}</p>
        </div>
      </div>

      {populatedCommunity.admin._id !== session?.user?.id && (
        <div className="mb-5 flex justify-center ">
          {canJoin ? (
            <MemberJoin
              id={id}
              user={true}
              action="add"
              memberId={session?.user?.id}
            />
          ) : (
            <MemberJoin
              id={id}
              user={true}
              action="remove"
              memberId={session?.user?.id}
            />
          )}
        </div>
      )}

      {/* SPACE FOR DESCRIPTION */}
      <Preview content={populatedCommunity.description} />

      <div className="mb-5 flex justify-center gap-5">
        {populatedCommunity.linkedin && (
          <Link target="_" href={populatedCommunity.linkedin}>
            <GrLinkedin className="text-3xl" />
          </Link>
        )}
        {populatedCommunity.github && (
          <Link target="_" href={populatedCommunity.github}>
            <FaSquareGithub className="text-3xl" />
          </Link>
        )}
        {populatedCommunity.x && (
          <Link target="_" href={populatedCommunity.x}>
            <BsTwitterX className="text-3xl" />
          </Link>
        )}
        {populatedCommunity.instagram && (
          <Link target="_" href={populatedCommunity.instagram}>
            <FaSquareInstagram className="text-3xl" />
          </Link>
        )}
        {populatedCommunity.whatsapp && (
          <Link target="_" href={populatedCommunity.whatsapp}>
            <FaSquareWhatsapp className="text-3xl" />
          </Link>
        )}
      </div>

      {populatedCommunity.website && (
        <Link href={populatedCommunity.website} className="text-cyan-500">
          Visit our Website
        </Link>
      )}

      <div className="flex justify-around">
        <Link
          href={ROUTES.CREATE_EVENT(id)}
          className="h2-bold inline-block animate-text bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent"
        >
          Create Event
        </Link>
        <Link
          href={ROUTES.EVENT(id)}
          className="h2-bold inline-block animate-text bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent"
        >
          All Events
        </Link>
      </div>

      <div>
        <div className="">
          <table className="w-full ">
            <tbody className="max-md:text-sm">
              <tr className="h-16">
                <td>
                  <UserAvatar
                    id={populatedCommunity.admin._id}
                    name={populatedCommunity.admin.name}
                    image={populatedCommunity.admin.image}
                  />
                </td>
                <td>
                  <p>{populatedCommunity.admin.name}</p>
                </td>
                <td>
                  <p className="inline-block rounded-2xl bg-violet-200 px-3 py-1 font-semibold text-violet-600">
                    Admin
                  </p>
                </td>
              </tr>
              {populatedCommunity.secondaryAdmins &&
                populatedCommunity.secondaryAdmins.map((admin: User) => (
                  <tr key={admin._id} className="h-16">
                    <td>
                      <UserAvatar
                        id={admin._id}
                        name={admin.name}
                        image={admin.image}
                      />
                    </td>
                    <td>
                      <p>{admin.name}</p>
                    </td>
                    <td>
                      <p className="inline-block rounded-2xl bg-orange-200 px-3 py-1 font-semibold text-orange-600">
                        Moderator
                      </p>
                    </td>
                    {populatedCommunity.admin._id === session?.user?.id && (
                      <td>
                        <MemberJoin
                          id={populatedCommunity._id}
                          action="downgrade"
                          user={false}
                          memberId={admin._id}
                        />
                      </td>
                    )}
                    {populatedCommunity.admin._id === session?.user?.id && (
                      <td>
                        <MemberJoin
                          id={populatedCommunity._id}
                          action="remove"
                          user={false}
                          memberId={admin._id}
                        />
                      </td>
                    )}
                  </tr>
                ))}
              {populatedCommunity.members &&
                populatedCommunity.members.map((member: User) => (
                  <tr key={member._id} className="h-16">
                    <td>
                      <UserAvatar
                        id={member._id}
                        name={member.name}
                        image={member.image}
                      />
                    </td>
                    <td>
                      <p>{member.name}</p>
                    </td>
                    <td>
                      <p className="inline-block rounded-2xl bg-fuchsia-200 px-3 py-1 font-semibold text-fuchsia-500">
                        Member
                      </p>
                    </td>
                    {populatedCommunity.admin._id === session?.user?.id && (
                      <td>
                        <MemberJoin
                          id={populatedCommunity._id}
                          action="upgrade"
                          user={false}
                          memberId={member._id}
                        />
                      </td>
                    )}
                    {populatedCommunity.admin._id === session?.user?.id && (
                      <td>
                        <MemberJoin
                          id={populatedCommunity._id}
                          action="remove"
                          user={false}
                          memberId={member._id}
                        />
                      </td>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CommunityDetails;
