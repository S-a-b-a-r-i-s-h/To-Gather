import Image from "next/image";
import Link from "next/link";
import React from "react";

import Theme from "./Theme";

const Navbar = () => {
  return (
    <nav className="mb-10 flex-between bg-transparent top-0 sticky z-50 w-full gap-5 p-5 shadow-light-300 dark:shadow-none sm:px-12">
      <Link href="/" className="flex items-center gap-1">
        {/* <Image
          src="/images/site-logo.svg"
          width={23}
          height={23}
          alt="DevFlow Logo"
        /> */}

        <p className="text-3xl font-medium primary-text-gradient font-robotoslab  max-sm:hidden">
          To-Gather
        </p>
      </Link>

      <p>Global Search</p>

      <div className="flex-between gap-5">
        <Theme />
      </div>
    </nav>
  );
};

export default Navbar;
