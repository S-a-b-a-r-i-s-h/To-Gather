import Image from "next/image";
import React from "react";

interface CommunityCardProps {
  title: string;
  description: string;
  members: number;
  price: number;
}

const CommunityCard: React.FC<CommunityCardProps> = ({
  title,
  description,
  members,
  price,
}) => {
  const truncateDescription = (text: string, limit: number) => {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  };

  return (
    <div className="flex flex-col my-6  bg-gradient-to-tr from-blue-100 via-white to-white dark:from-gray-900 dark:via-black dark:to-black shadow shadow-slate-400 dark:shadow-slate-600 rounded-lg w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
      {/* Image Section */}
      <div className="relative h-40 m-2.5 overflow-hidden rounded-md">
        <Image
          src={`/images/auth-dark.png`}        
          alt="Community Image"
          fill
          className="object-cover rounded-md"
        />
      </div>

      {/* Content Section */}
      <div className="p-4 flex-1">
        <h6 className="mb-2 text-black dark:text-white text-lg sm:text-xl font-semibold truncate">
          {title}
        </h6>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-normal font-light">
          {truncateDescription(description, 100)}
        </p>
      </div>

      {/* Footer Section */}
      <div className="px-4 pb-4 pt-2 text-sm sm:text-base flex justify-between text-black">
        <p className="font-medium primary-text-gradient">Members: {members}</p>
        {price?(
          <p className="font-medium bg-gradient-to-r from-amber-200 to-yellow-500 bg-clip-text text-transparent">&#8377;{price}</p>
        ):(
          <p className="font-medium bg-gradient-to-r from-teal-400 to-teal-700 bg-clip-text text-transparent">Free</p>
        )}
      </div>
    </div>
  );
};

export default CommunityCard;
