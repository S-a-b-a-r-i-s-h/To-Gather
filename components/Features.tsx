import React from "react";

interface FeaturesProps {
  idx: number;
  title: string;
  description: string;
  gradient: string;
}

const Features = ({ idx, title, description, gradient }: FeaturesProps) => {
  return (
    <div>
      <div className="relative">
        <div
          className={`absolute -inset-1 m-1 rounded-lg ${gradient} opacity-100 blur`}
        ></div>
        <div
          className={`relative w-full flex-1 rounded-[10px]
             bg-gradient-to-tr from-cyan-50 to-indigo-50 p-10 text-start dark:from-gray-950 dark:via-black dark:to-gray-900 max-sm:p-6 sm:w-[350px] sm:min-w-[350px]`}
        >
          <div
            className={` text-2xl font-bold ${gradient} inline-block w-auto bg-clip-text text-transparent`}
          >
            0{idx}
          </div>
          <h3
            className={`mt-5 font-robotoslab text-xl leading-normal ${gradient} bg-clip-text text-transparent`}
          >
            {title}
          </h3>
          <p className="mt-3 break-words font-montserrat text-lg leading-normal text-gray-500 max-sm:text-sm">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
