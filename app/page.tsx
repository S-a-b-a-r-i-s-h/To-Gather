import Link from "next/link";

import Features from "@/components/Features";
import Navbar from "@/components/navigation/navbar";
import { auth } from "@/auth";

const features = [
  {
    idx: 1,
    title: "Effortless Event Creation",
    description:
      "Organize workshops, hackathons, and community meetups in seconds.",
    bg: "bg-gradient-to-r from-indigo-100 to-cyan-100",
    numGradient: "bg-gradient-to-r from-indigo-500 to-cyan-500",
  },
  {
    idx: 2,
    title: "Real-time Collaboration",
    description:
      "Create groups, share events, and build meaningful connections that last.",
    bg: "bg-gradient-to-r from-purple-100 to-pink-100",
    numGradient: "bg-gradient-to-r from-purple-500 to-pink-500",
  },
  {
    idx: 3,
    title: "Seamless Notifications",
    description: "Keep your community updated with instant notifications.",
    bg: "bg-gradient-to-r from-green-100 to-teal-100",
    numGradient: "bg-gradient-to-r from-green-500 to-teal-500",
  },
  // {
  //   title: "Built for Scale",
  //   description:
  //     "Expand effortlessly with a platform that grows with your community.",
  //   bg: "bg-gradient-to-r from-orange-100 to-yellow-100",
  //   numGradient: "bg-gradient-to-r from-orange-500 to-yellow-500",
  // },
];

export default async function Home() {
  const session = await auth();
  console.log(session)
  return (
    // bg-gradient-to-tr from-blue-100 via-white to-indigo-100
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 via-white to-indigo-100 dark:from-gray-900 dark:via-black dark:to-gray-800">
      <Navbar />

      {/* Hero Section */}
      <main className="container mx-auto px-10 py-16 text-center">
        <h2 className="primary-text-gradient font-robotoslab text-6xl font-extrabold leading-tight max-sm:text-3xl">
          Build. Manage. Grow Your Community.
        </h2>
        <p className="mt-6 text-lg text-gray-600 max-sm:text-sm">
          Empower your community with cutting-edge tools to grow, manage, and
          succeed.
        </p>
        <Link href="/auth/signup" className="btn-primary mt-8 inline-block">
          Get Started for Free
        </Link>
      </main>

      {/* About Section */}
      <section className="container mx-auto px-10 py-16 text-center">
        <h2 className="inline-block w-auto bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text font-robotoslab text-6xl font-extrabold leading-tight text-transparent max-sm:text-3xl">
          Why Choose Us?
        </h2>
        <p className="mt-6 text-lg text-gray-600">
          Build powerful communities with tools designed to scale. From event
          creation to real-time updates, we help you achieve your goals with
          ease.
        </p>
      </section>

      {/* Features Section */}
      <section className="mx-auto px-10 py-16 text-center max-sm:px-1">
        <h2 className="mb-10 inline-block w-auto bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-center font-robotoslab text-6xl font-extrabold leading-tight text-transparent max-sm:text-3xl">
          Features That Matter
        </h2>

        <div className="max-container flex flex-wrap justify-center gap-9">
          {features.map((feature) => (
            // <div
            //   key={idx}
            //   className={`${feature.bg} flex-col rounded-lg p-8 shadow-md transition-transform hover:scale-105`}
            // >
            //   <div className="mb-5 flex items-center max-md:flex-col max-md:items-start">
            //     <h3
            //       className={`${feature.numGradient} mr-5 bg-clip-text text-5xl font-bold text-transparent`}
            //     >
            //       {`0${idx + 1}`}
            //     </h3>

            //     <h3 className="mb-2 text-2xl font-semibold text-gray-800 max-md:text-xl">
            //       {feature.title}
            //     </h3>
            //   </div>
            //   <p className="text-gray-700">{feature.description}</p>
            // </div>
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
      </footer>
    </div>
  );
}
