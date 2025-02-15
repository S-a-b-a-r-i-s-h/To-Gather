import { notFound, redirect } from "next/navigation";
import React from "react";

import { auth } from "@/auth";
import UserForm from "@/components/forms/UserForm";
import { getUserById } from "@/lib/actions/user.action";

const EditProfile = async ({ params }: RouteParams) => {
  const { id } = await params;
  if (!id) return notFound();

  const session = await auth();
  if (!session) return redirect("/home");

  const { data: user, success } = await getUserById({ userId: id });
  if (!success) return notFound();

  return (
    <main>
      <UserForm user={user} isEdit />
    </main>
  );
};

export default EditProfile;
