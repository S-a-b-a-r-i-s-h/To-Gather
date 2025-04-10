// import LocalSearch from "@/components/search/LocalSearch";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div>
      <div>
        {/* Profile Header */}
        <div className="flex items-center justify-between">
          <div className="flex w-1/2 items-center justify-start gap-8">
            <Skeleton className="size-[100px] rounded-full" />
            <div className="flex flex-col items-start justify-center">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-5 w-32" />
            </div>
          </div>
          <Skeleton className="h-[46px] w-[100px]" />
        </div>

        {/* About Section */}
        <div className="mt-11">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="mt-3 h-5 w-full" />
          <Skeleton className="mt-1 h-5 w-3/4" />
        </div>

        {/* Social Handles */}
        <div className="mb-5 mt-11">
          <Skeleton className="mb-3 h-6 w-32" />
          <div className="mb-5 flex gap-5">
            <Skeleton className="size-10 rounded-full" />
            <Skeleton className="size-10 rounded-full" />
          </div>
          <Skeleton className="h-5 w-40" />
        </div>
      </div>

      <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 xl:grid-cols-3">
        <div className="my-6 flex w-full max-w-xs flex-col rounded-lg bg-gradient-to-tr from-blue-100 via-white to-white shadow shadow-slate-400 dark:from-gray-900 dark:via-black dark:to-black dark:shadow-slate-600 sm:max-w-sm md:max-w-md lg:max-w-lg">
          {/* Image Section */}
          <div className="relative m-2.5 h-40 overflow-hidden rounded-md">
            <Skeleton className="size-full" />
          </div>

          {/* Content Section */}
          <div className="flex-1 p-4">
            <Skeleton className="mb-2 h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="mt-1 h-4 w-5/6" />
          </div>

          {/* Footer Section */}
          <div className="flex justify-between px-4 pb-4 pt-2 text-sm">
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-5 w-1/4" />
          </div>
        </div>
        <div className="my-6 flex w-full max-w-xs flex-col rounded-lg bg-gradient-to-tr from-blue-100 via-white to-white shadow shadow-slate-400 dark:from-gray-900 dark:via-black dark:to-black dark:shadow-slate-600 sm:max-w-sm md:max-w-md lg:max-w-lg">
          {/* Image Section */}
          <div className="relative m-2.5 h-40 overflow-hidden rounded-md">
            <Skeleton className="size-full" />
          </div>

          {/* Content Section */}
          <div className="flex-1 p-4">
            <Skeleton className="mb-2 h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="mt-1 h-4 w-5/6" />
          </div>

          {/* Footer Section */}
          <div className="flex justify-between px-4 pb-4 pt-2 text-sm">
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-5 w-1/4" />
          </div>
        </div>
        <div className="my-6 flex w-full max-w-xs flex-col rounded-lg bg-gradient-to-tr from-blue-100 via-white to-white shadow shadow-slate-400 dark:from-gray-900 dark:via-black dark:to-black dark:shadow-slate-600 sm:max-w-sm md:max-w-md lg:max-w-lg">
          {/* Image Section */}
          <div className="relative m-2.5 h-40 overflow-hidden rounded-md">
            <Skeleton className="size-full" />
          </div>

          {/* Content Section */}
          <div className="flex-1 p-4">
            <Skeleton className="mb-2 h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="mt-1 h-4 w-5/6" />
          </div>

          {/* Footer Section */}
          <div className="flex justify-between px-4 pb-4 pt-2 text-sm">
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-5 w-1/4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
