import { notFound, redirect } from "next/navigation";
import React from "react";

import { auth } from "@/auth";
import CommunityForm from "@/components/forms/CommunityForm";
import ROUTES from "@/constants/routes";
import { getCommunity } from "@/lib/actions/community.action";

const EditCommunity = async ({ params }: RouteParams) => {
  const { id } = await params;
  if (!id) return notFound();

  const session = await auth();
  if (!session) return redirect("/sign-in");

  const { data: community, success } = await getCommunity({ communityId: id });
  if (!success) return notFound();

  if (community?.admin.toString() !== session?.user?.id)
    redirect(ROUTES.COMMUNITY(id));

  return (
    <main>
      <CommunityForm community={community} isEdit />
    </main>
  );
};

export default EditCommunity;
