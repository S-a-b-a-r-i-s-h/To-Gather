"use client";

import { useRouter } from "next/navigation";
import { FaRegArrowAltCircleDown } from "react-icons/fa";
import { GrUpgrade } from "react-icons/gr";
import { IoMdRemoveCircleOutline } from "react-icons/io";

import { toast } from "@/hooks/use-toast";
import { updateCommunityMembers } from "@/lib/actions/community.action";

interface Props {
  id: string;
  user: boolean;
  action: "add" | "remove" | "upgrade" | "downgrade";
  memberId?: string;
}

const MemberJoin = ({ id, user, action, memberId }: Props) => {
  const router = useRouter();
  const handleJoin = async () => {
    const result = await updateCommunityMembers({
      communityId: id,
      actions: action,
      memberId
    });
    if (result.success) {
      toast({
        title: "Success",
        description:
          action === "add"
            ? "Joined Community successfully"
            : action === "upgrade"
              ? "Upgraded to Moderator successfully"
              : action === "downgrade"
                ? "Downgraded to Member successfully"
                : action === "remove" && user === false
                  ? "Removed Member successfully"
                  : "Left Community successfully",
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
    <>
      {action === "add" || action === "upgrade" ? (
        user === true ? (
          <button
            className="primary-bg-gradient min-h-[46px] w-1/2 rounded-lg py-3 text-center font-semibold !text-light-900 max-md:w-full"
            onClick={handleJoin}
          >
            Join Community
          </button>
        ) : (
          <GrUpgrade
            className="text-xl font-bold text-green-500"
            onClick={handleJoin}
          />
        )
      ) : user === true ? (
        <button
          className="primary-bg-gradient min-h-[46px] w-1/2 rounded-lg py-3 text-center font-semibold !text-light-900 max-md:w-full"
          onClick={handleJoin}
        >
          Leave Community
        </button>
      ) : action === "remove" ? (
        <IoMdRemoveCircleOutline
          className="text-2xl text-red-500"
          onClick={handleJoin}
        />
      ) : (
        <FaRegArrowAltCircleDown
          className="text-xl text-red-500"
          onClick={handleJoin}
        />
      )}
    </>
  );
};

export default MemberJoin;
