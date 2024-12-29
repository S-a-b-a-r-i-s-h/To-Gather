// import Image from "next/image";
// import Link from "next/link";

// import { useRouter } from "next/router";
import { LogOut } from "lucide-react";
// import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

import { auth, signOut } from "@/auth";
import ROUTES from "@/constants/routes";

import NavLinks from "./navbar/NavLinks";
import { Button } from "../ui/button";
// import { SheetClose } from "../ui/sheet";

const LeftSidebar = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  console.log(session);

  return (
    <section className=" light-border sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-r bg-transparent p-6 pt-36 shadow-light-300 dark:shadow-none max-lg:hidden lg:w-[266px]">
      <div className="flex flex-1 flex-col gap-6">
        <NavLinks userId={userId} />
      </div>

      <div className="flex flex-col gap-3">
        {userId ? (
          <form
            action={async () => {
              "use server";

              await signOut();
            }}
          >
            <Button
              type="submit"
              className="base-medium mb-4 ml-2 w-fit !bg-transparent px-4 py-3 text-black shadow shadow-indigo-400 dark:text-white"
            >
              <LogOut className="size-5 text-black dark:text-white" />
              LogOut
            </Button>
          </form>
        ) : (
          <>
            {/* <SheetClose asChild>
              <Link href={ROUTES.SIGN_IN}>
                <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                  <span className="primary-text-gradient">Log In</span>
                </Button>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link href={ROUTES.SIGN_UP}>
                <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none">
                  Sign Up
                </Button>
              </Link>
            </SheetClose> */}
            {redirect(ROUTES.ROOT)}
          </>
        )}
      </div>
    </section>
  );
};

export default LeftSidebar;
