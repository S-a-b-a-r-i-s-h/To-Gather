import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
// import { redirect } from "next/navigation";

import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ROUTES from "@/constants/routes";

import NavLinks from "./NavLinks";

const MobileNavigation = async () => {
  const result = await auth();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src="/icons/hamburger.svg"
          width={36}
          height={36}
          alt="Menu"
          className="invert-colors cursor-pointer lg:hidden"
        />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="background-light900_dark200 border-none"
      >
        <SheetTitle className="hidden">Navigation</SheetTitle>
        <Link href="/" className="flex items-center gap-1">
          {/* <Image
            src="/images/site-logo.svg"
            width={23}
            height={23}
            alt="Logo"
          /> */}
          {/* <p></p> */}

          <p className="h2-bold primary-text-gradient font-montserrat">
            To-Gather
          </p>
        </Link>

        <div className="flex h-[calc(100vh-80px)] flex-col justify-between overflow-y-auto">
          <SheetClose asChild>
            <section className="flex h-full flex-col gap-6 pt-16">
              <NavLinks isMobileNav />
            </section>
          </SheetClose>

          <div className="flex flex-col gap-3">
            {result?.user ? (
              <form
                action={async () => {
                  "use server";

                  await signOut();
                }}
              >
                <Button
                  type="submit"
                  className="base-medium w-fit !bg-transparent px-4 py-3 text-black dark:text-white"
                >
                  <LogOut className="size-5 text-black dark:text-white" />
                  LogOut
                </Button>
              </form>
            ) : (
              <>
                {/* {redirect(ROUTES.ROOT)} */}
                <SheetClose asChild>
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
                 </SheetClose>
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
