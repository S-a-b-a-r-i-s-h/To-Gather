/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useChat } from "@ai-sdk/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  MessageCircle,
  Send,
  Loader2,
  ArrowDownCircleIcon,
} from "lucide-react";
import { useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";

const ChatBot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  // const [showChatIcon, setShowChatIcon] = useState(true);
  const showChatIcon = true;
  const chatIconRef = useRef<HTMLButtonElement>(null);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    status,
    stop,
    reload,
    error,
  } = useChat();

  //   useEffect(() => {
  //     const handleScroll = () => {
  //       if (window.scrollY > 200) {
  //         setShowChatIcon(true);
  //       } else {
  //         setShowChatIcon(false);
  //         setIsChatOpen(false);
  //       }
  //     };
  //     handleScroll();

  //     window.addEventListener("scroll", handleScroll);
  //     return () => window.removeEventListener("scroll", handleScroll);
  //   }, []);

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };
  return (
    <div>
      <AnimatePresence>
        {showChatIcon && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 1000 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-5 right-5 z-50"
          >
            <Button
              ref={chatIconRef}
              onClick={toggleChat}
              size="icon"
              className="size-14 rounded-full p-2 shadow-lg"
            >
              {!isChatOpen ? (
                <MessageCircle className="size-12" />
              ) : (
                <ArrowDownCircleIcon />
              )}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-5 right-5 z-50 w-[95%] md:w-[500px]"
          >
            <Card className="border-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-lg font-bold">
                  To-Gather Chatbot
                </CardTitle>
                <Button
                  size="sm"
                  variant="ghost"
                  className="px-2 py-0"
                  onClick={toggleChat}
                >
                  <X className="size-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px] pr-4">
                  {messages.length === 0 && (
                    <div className="mt-32 flex w-full items-center justify-center gap-3 text-gray-500">
                      No messages yet.
                    </div>
                  )}
                  {messages?.map((message, index) => (
                    <div
                      key={index}
                      className={`mb-4 ${message.role === "user" ? "text-right" : "text-left"}`}
                    >
                      <div
                        className={`inline-block rounded-lg ${message.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"} p-2`}
                      >
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            code({
                              node,
                              inline,
                              className,
                              children,
                              ...props
                            }) {
                              return inline ? (
                                <code
                                  {...props}
                                  className="rounded bg-gray-200 px-1"
                                >
                                  {children}
                                </code>
                              ) : (
                                <pre
                                  {...(props as React.HTMLAttributes<HTMLPreElement>)}
                                  className="rounded bg-gray-200 px-2"
                                >
                                  <code>{children}</code>
                                </pre>
                              );
                            },
                            ul: ({ children }) => (
                              <ul className="ml-4 list-disc">{children}</ul>
                            ),
                            ol: ({ children }) => (
                              <li className="ml-4 list-decimal">{children}</li>
                            ),
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    </div>
                  ))}
                  {status === "submitted"  && (
                      <div className="flex w-full items-center justify-center gap-3">
                        <Loader2 className="size-5 animate-spin" />
                        <button
                          className="underline"
                          type="button"
                          onClick={() => stop()}
                        >
                          abort
                        </button>
                      </div>
                    )}
                  {error && (
                    <div className="flex w-full items-center justify-center gap-3">
                      <div>An error occured.</div>
                      <button
                        className="underline"
                        type="button"
                        onClick={() => reload()}
                      >
                        Retry
                      </button>
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <form
                  onSubmit={handleSubmit}
                  className="flex w-full items-center space-x-2"
                >
                  <Input
                    value={input}
                    onChange={handleInputChange}
                    className="flex-1"
                    placeholder="Ask AI..."
                  />
                  <Button
                    type="submit"
                    className="size-9"
                    disabled={status === "streaming" || status === "submitted"}
                  >
                    <Send className="size-4" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBot;
