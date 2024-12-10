import React from "react";

import CommunityForm from "@/components/forms/CommunityForm";

const CreateCommunity = () => {
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
