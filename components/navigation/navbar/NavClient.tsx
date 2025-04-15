import { Session } from "next-auth";
import React from "react";

import UserAvatar from "@/components/UserAvatar";

import MobileNavigation from "./MobileNavigation";
import Theme from "./Theme";

interface NavProps {
  session: Session | null;
  route?: string;
}

const NavClient = ({ session, route }: NavProps) => {
  return (      
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
      </div>
    // </nav>
  );
};

export default NavClient;
