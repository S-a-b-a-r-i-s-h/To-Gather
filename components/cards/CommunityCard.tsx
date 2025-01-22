import Image from "next/image";
import Link from "next/link";
import React from "react";

import ROUTES from "@/constants/routes";

interface CommunityCardProps {
  id: string;
  title: string;
  description: string;
  members: number;
  secondaryAdmins: number;
  price: string;
  image: string;
  shortDescription: string;
}

const CommunityCard: React.FC<CommunityCardProps> = ({
  id,
  title,
  description,
  members,
  secondaryAdmins,
  price,
  image,
  shortDescription,
}) => {
  const truncateDescription = (text: string, limit: number) => {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  };

  return (
    <Link
      href={ROUTES.COMMUNITIES(id)}
      className="my-6 flex w-full  max-w-xs flex-col rounded-lg bg-gradient-to-tr from-blue-100 via-white to-white shadow shadow-slate-400 dark:from-gray-900 dark:via-black dark:to-black dark:shadow-slate-600 sm:max-w-sm md:max-w-md lg:max-w-lg"
    >
      {/* Image Section */}
      <div className="relative m-2.5 h-40 overflow-hidden rounded-md">
        <Image
          src={image}
          alt="Community Image"
          fill
          className="rounded-md object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="flex-1 p-4">
        <h6 className="mb-2 truncate text-lg font-semibold text-black dark:text-white sm:text-xl">
          {title}
        </h6>
        <p className="text-sm font-light leading-normal text-slate-600 dark:text-slate-400 sm:text-base">
          {/* {truncateDescription(description, 100)} */}
          {shortDescription}
        </p>
      </div>

      {/* Footer Section */}
      <div className="flex justify-between px-4 pb-4 pt-2 text-sm text-black sm:text-base">
        <p className="primary-text-gradient font-medium">Members: {members + secondaryAdmins + 1}</p>
        {price !== "0" ? (
          <p className="bg-gradient-to-r from-amber-200 to-yellow-500 bg-clip-text font-medium text-transparent">
            &#8377;{price}
          </p>
        ) : (
          <p className="bg-gradient-to-r from-teal-400 to-teal-700 bg-clip-text font-medium text-transparent">
            Free
          </p>
        )}
      </div>
    </Link>
  );
};

export default CommunityCard;
