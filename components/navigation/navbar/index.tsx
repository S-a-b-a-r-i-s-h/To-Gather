import { auth } from "@/auth";

import NavClient from "./NavClient";
import NavbarShell from "./NavShell";

interface Props {
  route?: string;
}

const Navbar = async ({ route }: Props) => {
  const session = await auth();

  return (
    <NavbarShell>
      <NavClient session={session} route={route} />
    </NavbarShell>
  );
};

export default Navbar;
