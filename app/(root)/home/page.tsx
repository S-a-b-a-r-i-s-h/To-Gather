// import type { Metadata } from "next";
// import dynamic from "next/dynamic";
// import Link from "next/link";
// import { redirect } from "next/navigation";
// import { cache } from "react";

// import { auth } from "@/auth";
// // import CommunityCard from "@/components/cards/CommunityCard";
// // import LocalSearch from "@/components/search/LocalSearch";
// import Pagination from "@/components/Pagination";
// import { getCommunitiesByUser } from "@/lib/actions/community.action";
// import { cacheWithLocalStorage } from "@/lib/utils/cacheWithLocalStorage";

// // import Loading from "./loading";

// // import Loading from "./loading";

// // Consider dynamic imports for components that aren't immediately needed
// const CommunityCard = dynamic(() => import("@/components/cards/CommunityCard"));
// const LocalSearch = dynamic(() => import("@/components/search/LocalSearch"));

// export const metadata: Metadata = {
//   title: "Home | To-Gather",
//   description:
//     "Your home page where you can view communities that you are a part of.",
//   metadataBase: new URL("https://tgcommunity.vercel.app"),
//   openGraph: {
//     type: "website",
//     title: "Home | To-Gather",
//     description:
//       "Your home page where you can view communities that you are a part of.",
//     url: "https://tgcommunity.vercel.app/home",
//     images: [
//       {
//         url: "https://tgcommunity.vercel.app/opengraph-image.png",
//         width: 1200,
//         height: 630,
//         alt: "To-Gather",
//       },
//     ],
//   },
// };

// // Cache auth result
// const getAuth = cache(() => auth());

// interface SearchParams {
//   searchParams: Promise<{ [key: string]: string }>;
// }

// const Home = async ({ searchParams }: SearchParams) => {
//   // Parallel fetching for auth and search params
//   const [result, param] = await Promise.all([getAuth(), searchParams]);
//   const { user } = result || {};
//   const { page = "1", pageSize = "2", query = "", filter = "" } = param;

//   if (!user) return redirect("/");

//   // Fetch communities
//   // const { success, data, error } = await getCommunitiesByUser({
//   //   page: Number(page),
//   //   pageSize: Number(pageSize),
//   //   query,
//   //   filter,
//   //   id: user?.id,
//   // });
//   const cacheKey = `home::${user.id}::${query}::${filter}::${page}`;
//   const { success, data, error } = await cacheWithLocalStorage(cacheKey, () =>
//     getCommunitiesByUser({
//       page: Number(page),
//       pageSize: Number(pageSize),
//       query,
//       filter,
//       id: user?.id,
//     })
//   );

//   const { communities, isNext } = data || { communities: [], isNext: false };

//   // const loading = true;
//   // if (loading) return <Loading />;
//   return (
//     <>
//       <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
//         <h1 className="h1-bold text-dark100_light900">My Communities</h1>
//       </section>

//       <section className="mt-11">
//         <LocalSearch
//           route="/home"
//           imgSrc="/icons/search.svg"
//           placeholder="Search for your communities..."
//           otherClasses="flex-1"
//         />
//       </section>

//       {success ? (
//         // <Suspense>
//         <div>
//           {communities.length > 0 && (
//             <h2 className="primary-text-gradient h2-bold mt-10 inline-block">
//               Admin
//             </h2>
//           )}
//           <div>
//             {communities.length > 0 ? (
//               <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 xl:grid-cols-3">
//                 {communities.map((community) => (
//                   <CommunityCard
//                     key={community._id}
//                     id={community._id}
//                     title={community.title}
//                     members={community.members.length}
//                     secondaryAdmins={community.secondaryAdmins.length}
//                     price={community.price}
//                     image={community.img}
//                     shortDescription={community.shortDescription}
//                   />
//                 ))}
//               </div>
//             ) : (
//               <div className="mt-10 flex w-full flex-col items-center justify-center">
//                 {query ? (
//                   <p className="text-dark400_light700">
//                     No Communities matching <b>&quot;{query}&quot;</b>
//                   </p>
//                 ) : (
//                   <p className="text-dark400_light700">No Communities found</p>
//                 )}
//                 <div>
//                   <Link
//                     className="primary-text-gradient"
//                     href={`/create-community`}
//                   >
//                     Click Here
//                   </Link>
//                   &nbsp; to create a community
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       ) : (
//         // </Suspense>
//         <div className="mt-10 flex w-full items-center justify-center">
//           <p className="text-dark400_light700">
//             {error?.message || "Failed to fetch communities"}
//           </p>
//         </div>
//       )}
//       {communities && communities.length > 0 && (
//         <Pagination page={page} isNext={isNext || false} />
//       )}
//     </>
//   );
// };

// export default Home;

// app/home/page.tsx
// import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import { cache, Suspense } from "react";

import { auth } from "@/auth";
import HomeComponent from "@/components/HomeComponent";

import Loading from "../create-community/loading";

const getAuth = cache(() => auth());

// Dynamically import the client component
// const HomeComponent = dynamic(() => import("@/components/HomeComponent"), {
//   ssr: false,
// });

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}

const Home = async ({ searchParams }: SearchParams) => {
  const [result, param] = await Promise.all([getAuth(), searchParams]);
  const { user } = result || {};
  const { page = "1", pageSize = "2", query = "", filter = "" } = param;

  if (!user) return redirect("/");

  return (
    <div>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">My Communities</h1>
      </section>

      <Suspense fallback={<Loading />}>
        <HomeComponent
          userId={user.id || ""}
          query={query}
          filter={filter}
          page={Number(page)}
          pageSize={Number(pageSize)}
        />
      </Suspense>
    </div>
  );
};

export default Home;
