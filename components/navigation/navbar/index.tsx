import Image from "next/image";
import Link from "next/link";
import React from "react";

import Theme from "./Theme";
import MobileNavigation from "./MobileNavigation";

const Navbar = () => {
  return (
    <nav className=" flex-between bg-transparent top-0 fixed z-50 w-full gap-5 p-5 sm:px-12">
      <Link href="/" className="flex items-center gap-1">
        {/* <Image
          src="/images/site-logo.svg"
          width={23}
          height={23}
          alt="DevFlow Logo"
        /> */}

        <p className="text-3xl font-medium primary-text-gradient font-robotoslab">
          To-Gather
        </p>
      </Link>

      <div className="flex-between gap-5">
        <Theme />
        <MobileNavigation />
      </div>
    </nav>
  );
};

export default Navbar;
