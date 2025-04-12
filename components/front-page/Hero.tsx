/* eslint-disable tailwindcss/no-custom-classname */
"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
// import { TextPlugin } from "gsap/TextPlugin";
import Image from "next/image";
import Link from "next/link";

// gsap.registerPlugin(TextPlugin);

const Hero = () => {
  //   useGSAP(() => {
  //     gsap.fromTo(
  //       "#hero-button",
  //       {
  //         opacity: 0,
  //         scale: 1.2,
  //         ease: "cric.out",
  //         // filter: "blur(10px)",
  //       },
  //       {
  //         opacity: 1,
  //         duration: 0.5,
  //         scale: 1,
  //         ease: "cric.in",
  //         delay: 0.3,
  //         // filter: "blur(0px)",
  //       }
  //     );
  //     const tl = gsap.timeline();
  //     tl.fromTo(
  //       "header>h2",
  //       {
  //         opacity: 0,
  //         y: 30,
  //         filter: "blur(10px)",
  //       },
  //       {
  //         opacity: 1,
  //         y: 0,
  //         filter: "blur(0px)",
  //         duration: 1,
  //         stagger: 0.2,
  //         ease: "power2.out",
  //       }
  //     ).fromTo(
  //       "div>p",
  //       {
  //         opacity: 0,
  //         y: 30,
  //         filter: "blur(10px)",
  //       },
  //       {
  //         opacity: 1,
  //         y: 0,
  //         filter: "blur(0px)",
  //         duration: 0.8,
  //       },
  //       "-=0.8"
  //     );
  //     tl.fromTo(
  //       ".hero__image",
  //       { y: 100 },
  //       { y: 0, opacity: 1, duration: 0.8 },
  //       "+=0.3"
  //     );
  //     tl.fromTo(
  //       ".hero__glow",
  //       { scale: 0.5 },
  //       { scale: 1, opacity: 1, duration: 1.3 }
  //     );
  //     const words = ["Events", "Profile", "Community"];
  //     let wordIndex = 0;

  //     const cycleWords = () => {
  //       gsap.to(".myText", {
  //         text: words[wordIndex],
  //         duration: 1,
  //         ease: "none",
  //         onComplete: () => {
  //           wordIndex = (wordIndex + 1) % words.length;
  //           gsap.delayedCall(1, cycleWords); // Wait 1s before showing next word
  //         },
  //       });
  //     };

  //     // Start this after everything else:
  //     tl.call(cycleWords, [], "+=0.5");

  //   }, []);

  useGSAP(() => {
    gsap.fromTo(
      "#hero-button",
      {
        opacity: 0,
        scale: 1.2,
        ease: "cric.out",
      },
      {
        opacity: 1,
        duration: 0.5,
        scale: 1,
        ease: "cric.in",
        delay: 0.3,
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
    tl.fromTo(
      ".hero__image",
      { y: 30 },
      { y: 0, opacity: 1, duration: 0.8 },
      "+=0.3"
    );
    tl.fromTo(
      ".hero__glow",
      { scale: 0.5 },
      { scale: 1, opacity: 1, duration: 1.3 }
    );

    const words = ["Events", "Profile", "Community"];
    let wordIndex = 0;
    const myText = document.querySelector(".myText");

    const cycleWords = () => {
      if (!myText) return;

      gsap.to(myText, {
        y: -20,
        opacity: 0,
        duration: 0.4,
        ease: "power1.in",
        onComplete: () => {
          wordIndex = wordIndex % words.length;
          myText.textContent = words[wordIndex++];
          gsap.fromTo(
            myText,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.4,
              ease: "power1.out",
            }
          );
        },
      });

      gsap.delayedCall(2, cycleWords); // Delay between word switches
    };

    tl.call(
      () => {
        cycleWords();
      },
      [],
      "+=0.5"
    );
  }, []);

  return (
    <div>
      <header
        id="heading"
        className="max-[530px]:leading-1 flex flex-col items-center gap-2 whitespace-nowrap font-robotoslab text-6xl font-medium leading-tight text-gray-800 dark:text-gray-200 max-md:text-5xl max-sm:text-5xl max-[530px]:text-[2.7rem] max-[450px]:text-[2.25rem] max-[360px]:text-[1.6rem]"
      >
        <h2 className="opacity-0">Create & Manage</h2>
        <h2 className="myText primary-text-gradient w-fit opacity-0">
          Community
        </h2>
        <h2 className="opacity-0">All in one place.</h2>
      </header>
      <p className="mt-6 text-center text-lg text-gray-500 opacity-0 dark:text-gray-400 max-sm:text-sm">
        Empower your community with cutting-edge tools to grow, manage, and
        succeed.
      </p>
      <Link
        id="hero-button"
        href="/sign-up"
        className="relative mt-8 inline-block overflow-hidden rounded-md border-none bg-gray-800 px-6 py-3 text-sm font-semibold text-gray-200 opacity-0 transition-all duration-500 hover:bg-indigo-100 hover:text-gray-800 hover:ring-gray-800 dark:bg-blue-200/10 dark:text-blue-200 dark:hover:bg-blue-200 dark:hover:text-gray-800 max-sm:px-4 max-sm:py-3 max-sm:text-xs"
      >
        <span>Get Started for Free</span>
      </Link>

      <div className="hero__image glass-container mt-16 w-fit opacity-0">
        <div className="hero__glow absolute inset-0 -z-10 bg-blue-800/40 opacity-0 blur-2xl dark:bg-blue-500/30" />
        <Image
          src={`/images/hero-image-light.png`}
          alt="Hero Image"
          width={500}
          height={700}
          className=" w-screen rounded-lg dark:hidden"
        />
        <Image
          src={`/images/hero-image-dark.png`}
          alt="Hero Image"
          width={500}
          height={700}
          className="hidden w-screen rounded-lg dark:block"
        />
      </div>
    </div>
  );
};

export default Hero;
