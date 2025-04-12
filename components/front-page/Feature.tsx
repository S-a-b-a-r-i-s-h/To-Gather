"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const features = [
  {
    title: "Seamless Sign-in",
    description:
      "Enable secure, passwordless access with OAuth or custom auth.",
    icon: "🔐",
  },
  {
    title: "Real-time Alerts",
    description: "Stay updated instantly with push and email notifications.",
    icon: "🔔",
  },
  {
    title: "Instant Event Creation",
    description: "Host events effortlessly with just a few clicks.",
    icon: "📅",
  },
  {
    title: "Role-based Access",
    description: "Control permissions at every level within communities.",
    icon: "🧑‍💼",
  },
  {
    title: "Smart AI Assistance",
    description: "Answer queries, automate workflows, and boost productivity.",
    icon: "🤖",
  },
];

const Features = () => {
  const container = useRef(null);

  useGSAP(() => {
    gsap.from(".feature-card", {
      opacity: 0,
      y: 30,
      scale: 0.95,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out",
    });
  }, []);

  return (
    <section ref={container} className="mx-auto max-w-6xl px-4 py-24">
      <h2 className="mb-4 text-center text-4xl font-semibold text-gray-800 dark:text-gray-200">
        What Makes Us Powerful
      </h2>
      <p className="mx-auto mb-12 max-w-xl text-center text-gray-500 dark:text-gray-400">
        Designed with performance, scalability, and flexibility in mind.
      </p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group relative rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-transform duration-300 hover:-translate-y-2 dark:border-gray-800 dark:bg-zinc-900"
          >
            <div className="mb-4 text-4xl">{feature.icon}</div>
            <h3 className="mb-2 text-xl font-medium text-gray-800 dark:text-gray-100">
              {feature.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {feature.description}
            </p>

            {/* Optional animated image or video spot */}
            <div className="absolute bottom-2 right-2 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              {/* Add animated image or lottie here if needed */}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
