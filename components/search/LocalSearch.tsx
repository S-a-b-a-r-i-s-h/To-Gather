"use client";

import Image from "next/image";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { formUrlQuery, removeKeysFromUrlQuery } from "@/lib/url";

import { Input } from "../ui/input";

interface Props {
  route: string;
  imgSrc: string;
  placeholder: string;
  otherClasses?: string;
}

const LocalSearch = ({ route, imgSrc, placeholder, otherClasses }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "query",
          value: searchQuery,
        });

        router.push(newUrl, { scroll: false });
      } else {
        if (pathname === route) {
          const newUrl = removeKeysFromUrlQuery({
            params: searchParams.toString(),
            keysToRemove: ["query"],
          });

          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, router, route, searchParams, pathname]);

  return (
    <div className="relative p-[1.2px] dark:p-px">
      <div className="absolute left-0 top-0 h-[30px] w-1/2 rounded-tl-[10px] bg-gradient-to-br from-indigo-500 via-transparent to-transparent dark:from-cyan-500 dark:via-transparent dark:to-transparent" />
      <div className="absolute bottom-0 right-0 h-[30px] w-1/2 rounded-br-[10px] bg-gradient-to-tl from-indigo-500 via-transparent to-transparent dark:from-cyan-500 dark:via-transparent dark:to-transparent" />
      <div
        className={`relative z-10 flex min-h-[56px] grow items-center gap-4 rounded-[10px] bg-white px-4 dark:bg-[#101010] ${otherClasses}`}
      >
        <Image
          src={imgSrc}
          width={24}
          height={24}
          alt="Search"
          className="cursor-pointer"
        />

        <Input
          id="homesearch"
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="no-focus border-none font-medium shadow-none outline-none placeholder:text-light-500 dark:placeholder:text-light-400"
        />

        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="text-dark400_light700 ml-5 transition"
          >
            ✖
          </button>
        )}
      </div>
    </div>
  );
};

export default LocalSearch;
