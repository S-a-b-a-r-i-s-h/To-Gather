// import Image from "next/image";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { auth } from "@/auth";
import UserAvatar from "@/components/UserAvatar";

import MobileNavigation from "./MobileNavigation";
import Theme from "./Theme";


interface Props {
  route?: string;
}
const Navbar = async ({ route }: Props) => {
  const session = await auth();
  const userId = session?.user?.id;

  console.log("route", route)
  return (
    <nav className=" flex-between fixed top-0 z-50 w-full gap-5 bg-transparent p-5 sm:pr-12">
      <Link
        href={`${!userId ? "/" : "/home"}`}
        className="flex items-center gap-1"
      >
        <Image
          src="/images/logo.png"
          width={60}
          height={60}
          alt="To-Gather Logo"
          priority
        />

        <p className="primary-text-gradient hidden font-robotoslab text-2xl font-medium lg:block">
          To-Gather
        </p>
        {/* <Image 
          src = "/assets/images/logo.png"
        /> */}
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
