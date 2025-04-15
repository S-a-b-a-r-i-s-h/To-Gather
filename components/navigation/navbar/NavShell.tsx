"use client";

import Image from "next/image";
import React from "react";

import useScrollDirection from "./useScrollDirection";

const NavbarShell = ({ children }: { children: React.ReactNode }) => {
  const { scrollDirection, scrollY } = useScrollDirection();
  console.log(scrollDirection, "scrollDirection");

  const bgClass =
    scrollY === 0
      ? "bg-transparent"
      : "backdrop-blur-3xl bg-white shadow-sm dark:shadow-cyan-500 shadow-indigo-500 dark:bg-black";

  return (
    <nav
      className={`flex-between fixed top-0 z-50 w-full gap-5 rounded-lg p-3 transition-all duration-500 sm:pr-12 ${bgClass} ${
        scrollDirection === "down"
          ? "-translate-y-24"
          : "translate-y-0"
      }`}
    >
      <div
        // href={`${!session?.user?.id ? "/" : "/home"}`}
        // href={"/home"}
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
      </div>
      {children}
    </nav>
  );
};

export default NavbarShell;
