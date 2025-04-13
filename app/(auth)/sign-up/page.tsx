"use client";
import type { Metadata } from "next";
import React from "react";

import AuthForm from "@/components/forms/AuthForm";
import { signUpWithCredentials } from "@/lib/actions/auth.action";
import { SignUpSchema } from "@/lib/validations";


export const metadata: Metadata = {
  title: "Sign-Up | To-Gather",
  description: "A platform to create and manage communities, events, profiles.",
  metadataBase: new URL("https://tgcommunity.vercel.app"),
  openGraph: {
    siteName: "To-Gather",
    type: "website",
    title: " Sign-Up | To-Gather",
    description:
      "Your home page where you can view communities that you are a part of.",
    url: "https://tgcommunity.vercel.app/sign-up",
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

const SignUp = () => {
  return (
    <AuthForm
      formType="SIGN_UP"
      schema={SignUpSchema}
      defaultValues={{ email: "", password: "", name: "", username: ""}}
      onSubmit={signUpWithCredentials}
    />
  );
};

export default SignUp;
