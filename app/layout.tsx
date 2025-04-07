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
