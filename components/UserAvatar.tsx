import Image from "next/image";
import Link from "next/link";
import React from "react";

import ROUTES from "@/constants/routes";

import { Avatar, AvatarFallback } from "./ui/avatar";

interface Props {
  id: string;
  name: string;
  image?: string | null;
  className?: string;
}

const UserAvatar = ({ id, name, image, className = "h-9 w-9" }: Props) => {
  const initials = name
    .split(" ")
    .map((word: string) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Link href={ROUTES.PROFILE(id)}>
      <Avatar className={className}>
        {image ? (
          <Image
            src={image}
            alt={name}
            className="object-cover"
            width={50}
            height={50}
            quality={100}
          />
        ) : (
          <AvatarFallback className="primary-bg-gradient font-montserrat font-bold tracking-wider text-white">
            {initials}
          </AvatarFallback>
        )}
      </Avatar>
    </Link>
  );
};

export default UserAvatar;