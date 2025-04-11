/* eslint-disable tailwindcss/no-custom-classname */
"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";

const Hero = () => {
  useGSAP(() => {
    gsap.fromTo(
        "#hero-button",
        {
            opacity: 0,
            scale: 1.2,
            ease: "cric.out",
            // filter: "blur(10px)",
        },
        {
            opacity: 1,
            duration: 0.5,
            scale: 1,
            ease: "cric.in",
            delay: 0.3,
            // filter: "blur(0px)",
        }
    );
    const tl = gsap.timeline();
    tl.fromTo(
      "header>h2",
      {
        opacity: 0,
        y: 30,
        filter: "blur(10px)",
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
      }
    ).fromTo(
      "div>p",
      {
        opacity: 0,
        y: 30,
        filter: "blur(10px)",
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.8,
      },
      "-=0.8"
    );
    
  }, []);

  return (
    <div>
      <header
        id="heading"
        className="relative flex flex-col gap-2 font-robotoslab text-6xl font-medium leading-tight text-gray-800 dark:text-gray-200 max-lg:text-5xl max-sm:text-3xl"
      >
        <h2>Create & Manage</h2>
        <h2 className=".myText">Community</h2>
        <h2>All in one place.</h2>
      </header>
      <p className="mt-6 text-center text-lg text-gray-500 dark:text-gray-400 max-sm:text-sm">
        Empower your community with cutting-edge tools to grow, manage, and
        succeed.
      </p>
      <Link
        id="hero-button"
        href="/sign-up"
        className="relative mt-8 inline-block overflow-hidden rounded-[7px] border-none bg-gray-800 px-6 py-3 text-sm font-semibold text-gray-200 transition-all duration-500 hover:bg-gray-300 hover:text-gray-800 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-gray-800  dark:hover:text-gray-200 max-sm:px-4 max-sm:py-3 max-sm:text-xs"
      >
        <span>Get Started for Free</span>
      </Link>
    </div>
  );
};

export default Hero;
