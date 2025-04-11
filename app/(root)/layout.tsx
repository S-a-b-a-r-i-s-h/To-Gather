import { ReactNode } from "react";

// import AIChatButton from "@/components/AIChatButton";
import ChatBot from "@/components/ChatBot";
import LeftSidebar from "@/components/navigation/LeftSidebar";
import Navbar from "@/components/navigation/navbar";
const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative">
      <Navbar />

      <div className="flex">
        <LeftSidebar />

        <section className="flex h-auto min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>
      </div>
      {/* <AIChatButton /> */}
      <ChatBot />
    </main>
  );
};

export default RootLayout;
