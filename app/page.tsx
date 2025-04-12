import type { Metadata } from "next";
// import Link from "next/link";
// import { redirect } from "next/navigation";
// import { auth } from "@/auth";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
// import Features from "@/components/Features";
import Hero from "@/components/front-page/Hero";
import Navbar from "@/components/navigation/navbar";
import ROUTES from "@/constants/routes";

// const features = [
//   {
//     idx: 1,
//     title: "Effortless Event Creation",
//     description:
//       "Organize workshops, hackathons, and community meetups in seconds.",
//     bg: "bg-gradient-to-r from-indigo-100 to-cyan-100",
//     numGradient: "bg-gradient-to-r from-indigo-500 to-cyan-500",
//   },
//   {
//     idx: 2,
//     title: "Real-time Collaboration",
//     description:
//       "Create groups, share events, and build meaningful connections that last.",
//     bg: "bg-gradient-to-r from-purple-100 to-pink-100",
//     numGradient: "bg-gradient-to-r from-purple-500 to-pink-500",
//   },
//   {
//     idx: 3,
//     title: "Seamless Notifications",
//     description: "Keep your community updated with instant notifications.",
//     bg: "bg-gradient-to-r from-green-100 to-teal-100",
//     numGradient: "bg-gradient-to-r from-green-500 to-teal-500",
//   },
// ];

export const metadata: Metadata = {
  title: "App Page | To-Gather",
  description: "A platform to create and manage communities, events, profiles.",
  openGraph: {
    siteName: "To-Gather",
    type: "website",
    title: " App Page | To-Gather",
    description:
      "Your home page where you can view communities that you are a part of.",
    url: "https://tgcommunity.vercel.app",
    images: [
      {
        url: "https://tgcommunity.vercel.app/opengraph-image.png",
      },
    ],
  },
};
export default async function Home() {
  const session = await auth();
  const userId = session?.user?.id;
  if (userId) {
    return redirect("/home");
  }
  // if(session?.user) {
  //   redirect("/home");
  // }
  // console.log(session?.user);
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Navbar route={ROUTES.ROOT} />
      <main className="mx-auto max-w-[70%] px-10 py-24 text-center max-lg:max-w-full max-sm:mx-0 max-sm:px-5">
        <Hero />
      </main>

      {/* <section className="container mx-auto px-10 py-16 text-center">
        <h2 className="inline-block w-auto bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text font-robotoslab text-6xl font-extrabold leading-tight text-transparent max-sm:text-3xl">
          Why Choose Us?
        </h2>
        <p className="mt-6 text-lg text-gray-600">
          Build powerful communities with tools designed to scale. From event
          creation to real-time updates, we help you achieve your goals with
          ease.
        </p>
      </section>

      <section className="mx-auto px-10 py-16 text-center max-sm:px-1">
        <h2 className="mb-10 inline-block w-auto bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-center font-robotoslab text-6xl font-extrabold leading-tight text-transparent max-sm:text-3xl">
          Features That Matter
        </h2>

        <div className="max-container flex flex-wrap justify-center gap-9">
          {features.map((feature) => (
            <Features
              key={feature.idx}
              idx={feature.idx}
              title={feature.title}
              description={feature.description}
              gradient={feature.numGradient}
            />
          ))}
        </div>
      </section>

      <footer className="py-6 text-center text-gray-500">
        &copy; {new Date().getFullYear()} Community Connect. All rights
        reserved.
      </footer> */}
    </div>
  );
}
