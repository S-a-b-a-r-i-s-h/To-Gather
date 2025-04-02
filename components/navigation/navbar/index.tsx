// import Image from "next/image";
import Link from "next/link";
import React from "react";

import { auth } from "@/auth";
import UserAvatar from "@/components/UserAvatar";

import MobileNavigation from "./MobileNavigation";
import Theme from "./Theme";

interface Props{
  route?: string;
}

const Navbar = async ({route}: Props) => {
  const session = await auth();
  const userId = session?.user?.id;
  console.log("route", route);

  return (
    <nav className=" flex-between fixed top-0 z-50 w-full gap-5 bg-transparent p-5 sm:px-12">
      <Link href={`${!userId ? '/' : '/home'}`} className="flex items-center gap-1">
        {/* <Image
          src="/images/site-logo.svg"
          width={23}
          height={23}
          alt="DevFlow Logo"
        /> */}

        <p className="primary-text-gradient font-robotoslab text-3xl font-medium">
          To-Gather
        </p>
      </Link>

      <div className="flex-between gap-5">
        <Theme />
        {session?.user && (
          <UserAvatar
            id={session.user.id!}
            name={session.user.name!}
            image={session.user?.image}
          />
        )}
        {route !== "/" && <MobileNavigation />}
        {/* <MobileNavigation /> */}
      </div>
    </nav>
  );
};

export default Navbar;
