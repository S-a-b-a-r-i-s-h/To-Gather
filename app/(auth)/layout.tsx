import type { Metadata } from "next";
import Image from "next/image";
import { ReactNode } from "react";

import SocialAuthForm from "@/components/forms/SocialAuthForm";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "(Auth) Page | To-Gather",
  description: "A platform to create and manage communities, events, profiles.",
  metadataBase: new URL("https://tgcommunity.vercel.app"),
  openGraph: {
    siteName: "To-Gather",
    type: "website",
    title: " (Auth) Page | To-Gather",
    description:
      "Your home page where you can view communities that you are a part of.",
    url: "https://tgcommunity.vercel.app",
    images: [
      {
        url: "https://tgcommunity.vercel.app/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "To-Gather",
      },
    ],
  },
};

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <section className="light-border background-light800_dark200 shadow-light100_dark100 min-w-full rounded-[10px] border px-4 py-10 shadow-md sm:min-w-[520px] sm:px-8">
        <div className="flex items-center justify-between gap-2">
          <div className="space-y-2.5">
            <h1 className="h2-bold text-dark100_light900">Join To-Gather</h1>
            <p className="paragraph-regular text-dark500_light400">
              To get your questions answered
            </p>
          </div>
          <Image
            src="/images/logo.png"
            alt="To-Gather Logo"
            width={50}
            height={50}
            className="object-contain"
          />
        </div>

        {children}

        <SocialAuthForm />
        <Toaster />
      </section>
    </main>
  );
};

export default AuthLayout;
