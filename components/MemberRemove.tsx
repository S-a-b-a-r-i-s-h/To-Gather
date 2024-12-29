"use client";

import { useRouter } from "next/navigation";

import { toast } from "@/hooks/use-toast";
import { updateCommunityMembers } from "@/lib/actions/community.action";

interface Props {
  id: string;
  user?: boolean;
}

const MemberRemove = ({ id }: Props) => {
  const router = useRouter();
  const handleJoin = async () => {
    const result = await updateCommunityMembers({
      communityId: id,
      actions: "remove",
    });
    if (result.success) {
      toast({
        title: "Success",
        description: "Removed Member successfully",
      });
      router.refresh();
    } else {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };
  return (
    <button
      className="primary-bg-gradient min-h-[46px] w-1/2 rounded-lg py-3 text-center font-semibold !text-light-900 max-md:w-full"
      onClick={handleJoin}
    >
      Join Community
    </button>
  );
};

export default MemberRemove;