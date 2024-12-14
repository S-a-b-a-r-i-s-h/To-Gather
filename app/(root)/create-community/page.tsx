import { redirect } from "next/navigation";
import React from "react";

import { auth } from "@/auth";
import CommunityForm from "@/components/forms/CommunityForm";

const CreateCommunity = async () => {

  const session = await auth();
  if (!session?.user) return redirect("/");
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>

      <div className="mt-9">
        <CommunityForm />
      </div>
    </>
  );
};

export default CreateCommunity;
