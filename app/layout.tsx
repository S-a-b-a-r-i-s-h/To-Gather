import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import React from "react";

import { auth } from "@/auth";
// import Navbar from "@/components/navigation/navbar";
import { Toaster } from "@/components/ui/toaster";
import ThemeProvider from "@/context/Theme";



// import ROUTES from "@/constants/routes";

const montserrat = localFont({
  src: "./fonts/Montserrat-VF.ttf",
  variable: "--font-montserrat",
  weight: "100 900",
});
const robotoslab = localFont({
  src: "./fonts/RobotoSlab-VF.ttf",
  variable: "--font-robotoslab",
  weight: "100 200 300 400 500 600 700 800 900",
});

export const metadata: Metadata = {
  title: "Layout Page | To-Gather",
  description: "A platform to create and manage communities, events, profiles.",
  metadataBase: new URL("https://tgcommunity.vercel.app"),
  openGraph: {
    siteName: "To-Gather",
    type: "website",
    title: " Layout Page | To-Gather",
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <SessionProvider session={session}>
        <body
          className={`${montserrat.className} ${robotoslab.variable} h-auto bg-gradient-to-tr from-blue-100 via-white to-indigo-100 antialiased dark:from-gray-900 dark:via-black  dark:to-gray-800 `}
        >
          <Toaster />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </SessionProvider>
    </html>
  );
}
