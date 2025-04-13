"use client";

import type { Metadata } from "next";
import React from "react";

import AuthForm from "@/components/forms/AuthForm";
import { signInWithCredentials } from "@/lib/actions/auth.action";
import { SignInSchema } from "@/lib/validations";


export const metadata: Metadata = {
  title: "Sign-In | To-Gather",
  description: "A platform to create and manage communities, events, profiles.",
  metadataBase: new URL("https://tgcommunity.vercel.app"),
  openGraph: {
    siteName: "To-Gather",
    type: "website",
    title: " Sign-In | To-Gather",
    description:
      "Your home page where you can view communities that you are a part of.",
    url: "https://tgcommunity.vercel.app/sign-in",
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

const SignIn = () => {
  return (
    <AuthForm
      formType="SIGN_IN"
      schema={SignInSchema}
      defaultValues={{ email: "", password: "" }}
      onSubmit={signInWithCredentials}
    />
  );
};

export default SignIn;
