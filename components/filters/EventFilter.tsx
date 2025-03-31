"use client";

import { useSearchParams, useRouter } from "next/navigation";
import React, { useState } from "react";

import { formUrlQuery, removeKeysFromUrlQuery } from "@/lib/url";
import { cn } from "@/lib/utils";

import { Button } from "../ui/button";

const filters = [
  { name: "Individual", value: "individual" },
  { name: "Group", value: "group" },
];

const EventFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filterParams = searchParams.get("filter");
  const [active, setActive] = useState(filterParams || "");

  const handleTypeClick = (filter: string) => {
    let newUrl = "";

    if (filter === active) {
      setActive("");

      newUrl = removeKeysFromUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ["filter"],
      });
    } else {
      setActive(filter);

      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: filter.toLowerCase(),
      });
    }

    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="mt-10 flex flex-wrap gap-3">
      {filters.map((filter) => (
        <div key={filter.value} className="relative">
          <div
            className={
              active === filter.value
                ? `primary-bg-gradient absolute -inset-1 m-1 opacity-100 blur-sm`
                : ""
            }
          ></div>
          <Button
            key={filter.name}
            className={cn(
              `body-medium rounded-lg px-6 py-3 capitalize shadow-none relative`,
              active === filter.value
                ? "bg-light-800 hover:bg-light-800 text-light-500 dark:bg-dark-300 dark:hover:bg-dark-300 dark:text-light-500"
                : "bg-light-800 hover:bg-light-800 text-light-500 dark:bg-dark-300 dark:hover:bg-dark-300 dark:text-light-500"
            )}
            // className={`bg-light-800 dark:bg-dark-300 text-slate-500`}
            onClick={() => handleTypeClick(filter.value)}
          >
            {filter.name}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default EventFilter;
