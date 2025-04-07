// import LocalSearch from "@/components/search/LocalSearch";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Communities</h1>
      </section>
      <section className="mt-11 min-h-[56px]">
        <Skeleton className="mt-11 h-[20px] min-h-[56px] w-full rounded-[10px]" />
      </section>
      {/* <h1 className="primary-text-gradient h2-bold mt-10 inline-block">
        Admin
      </h1> */}
      <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 xl:grid-cols-3">
        <div className="my-6 flex w-full max-w-xs flex-col rounded-lg bg-gradient-to-tr from-blue-100 via-white to-white shadow shadow-slate-400 dark:from-gray-900 dark:via-black dark:to-black dark:shadow-slate-600 sm:max-w-sm md:max-w-md lg:max-w-lg">
          {/* Image Section */}
          <div className="relative m-2.5 h-40 overflow-hidden rounded-md">
            <Skeleton className="size-full" />
          </div>
          <div className="flex-1 p-4">
            <Skeleton className="mb-2 h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="mt-1 h-4 w-5/6" />
          </div>
          <div className="flex justify-between px-4 pb-4 pt-2 text-sm">
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-5 w-1/4" />
          </div>
        </div>
        <div className="my-6 flex w-full max-w-xs flex-col rounded-lg bg-gradient-to-tr from-blue-100 via-white to-white shadow shadow-slate-400 dark:from-gray-900 dark:via-black dark:to-black dark:shadow-slate-600 sm:max-w-sm md:max-w-md lg:max-w-lg">
          <div className="relative m-2.5 h-40 overflow-hidden rounded-md">
            <Skeleton className="size-full" />
          </div>
          <div className="flex-1 p-4">
            <Skeleton className="mb-2 h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="mt-1 h-4 w-5/6" />
          </div>
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
