// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { Message, useChat } from "@ai-sdk/react";
// import { Bot, SendHorizontal, Trash, XCircle } from "lucide-react";
// import Link from "next/link";
// import { useEffect, useRef } from "react";
// import ReactMarkdown from "react-markdown";

// import { cn } from "@/lib/utils";

// interface AIChatBoxProps {
//   open: boolean;
//   onClose: () => void;
// }
// const AIChatBot = ({ open, onClose }: AIChatBoxProps) => {
//   const {
//     messages,
//     input,
//     handleInputChange,
//     handleSubmit,
//     setMessages,
//     error,
//     status,
//   } = useChat();

//   const inputRef = useRef<HTMLInputElement>(null);
//   const scrollRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
//     }
//   }, [messages]);

//   useEffect(() => {
//     if (open) {
//       inputRef.current?.focus();
//     }
//   }, [open]);

//   const lastMessageIsUser = messages[messages.length - 1]?.role === "user";

//   return (
//     <div
//       className={cn(
//         "bottom-0 right-0 z-50 bg-black w-full max-w-[500px] p-1 xl:right-36",
//         open ? "fixed" : "hidden"
//       )}
//     >
//       <button onClick={onClose} className="mb-1 ms-auto block">
//         <XCircle size={30} className="rounded-full" />
//       </button>
//       <div className="flex h-[600px] flex-col rounded shadow-xl">
//         <div className="mt-3 h-full overflow-y-auto px-3" ref={scrollRef}>
//           {messages.map((message) => (
//             <ChatMessage message={message} key={message.id} />
//           ))}
//           {status && lastMessageIsUser && (
//             <ChatMessage
//               message={{
//                 id: "loading",
//                 role: "assistant",
//                 content: "Thinking...",
//               }}
//             />
//           )}
//           {error && (
//             <ChatMessage
//               message={{
//                 id: "error",
//                 role: "assistant",
//                 content: "Something went wrong. Please try again!",
//               }}
//             />
//           )}
//           {!error && messages.length === 0 && (
//             <div className="mx-8 flex h-full flex-col items-center justify-center gap-3 text-center">
//               <Bot size={28} />
//               <p className="text-lg font-medium">
//                 Send a message to start the AI chat!
//               </p>
//               <p>
//                 You can ask the chatbot any question about the application and it will find
//                 the relevant information.
//               </p>
//               <p className="text-sm">
//                 PS: Ask anything about communities, events and so on...
//               </p>
//             </div>
//           )}
//         </div>
//         <form onSubmit={handleSubmit} className="m-3 flex gap-1">
//           <button
//             type="button"
//             className="flex w-10 flex-none items-center justify-center"
//             title="Clear chat"
//             onClick={() => setMessages([])}
//           >
//             <Trash size={24} />
//           </button>
//           <input
//             value={input}
//             onChange={handleInputChange}
//             placeholder="Say something..."
//             className="grow rounded border px-3 py-2"
//             ref={inputRef}
//           />
//           <button
//             type="submit"
//             className="flex w-10 flex-none items-center justify-center disabled:opacity-50"
//             disabled={ input.length === 0}
//             title="Submit message"
//           >
//             <SendHorizontal size={24} />
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// interface ChatMessageProps {
//   message: Message;
// }

// function ChatMessage({ message: { role, content } }: ChatMessageProps) {
//   const isAiMessage = role === "assistant";

//   return (
//     <div
//       className={cn(
//         "mb-3 flex items-center text-sm",
//         isAiMessage ? "me-5 justify-start" : "ms-16 justify-end"
//       )}
//     >
//       {isAiMessage && <Bot className="mr-2 flex-none" />}
//       <div
//         className={cn(
//           "rounded-md border px-3 py-2",
//           isAiMessage ? "bg-black" : "bg-gray-900"
//         )}
//       >
//         <ReactMarkdown
//           components={{
//             a: ({ node, ref, ...props }) => (
//               <Link
//                 {...props}
//                 href={props.href ?? ""}
//                 className="hover:underline"
//               />
//             ),
//             p: ({ node, ...props }) => (
//               <p {...props} className="mt-3 first:mt-0" />
//             ),
//             ul: ({ node, ...props }) => (
//               <ul
//                 {...props}
//                 className="mt-3 list-inside list-disc first:mt-0"
//               />
//             ),
//             li: ({ node, ...props }) => <li {...props} className="mt-1" />,
//           }}
//         >
//           {content}
//         </ReactMarkdown>
//       </div>
//     </div>
//   );
// }

// export default AIChatBot;

// 'use client';

// import { useChat } from '@ai-sdk/react';

// export default function Chat() {
//   const { messages, input, handleInputChange, handleSubmit } = useChat();
//   return (
//     <div className=" mx-auto flex w-full max-w-md flex-col py-24">
//       <div className="space-y-4">
//         {messages.map(m => (
//           <div key={m.id} className="whitespace-pre-wrap">
//             <div>
//               <div className="font-bold">{m.role}</div>
//               <p>{m.content}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       <form onSubmit={handleSubmit}>
//         <input
//           className="fixed bottom-0 mb-8 w-full max-w-md rounded border border-gray-300 p-2 shadow-xl"
//           value={input}
//           placeholder="Say something..."
//           onChange={handleInputChange}
//         />
//       </form>
//     </div>
//   );
// }

"use client";

import { useChat } from "@ai-sdk/react";

import { Chat } from "@/components/ui/chat";


export default function AIChatBot() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    append,
    stop,
    status,
  } = useChat();

  console.log(input);

  return (
    <div className="flex h-[500px] w-full">
      <Chat
        className="grow"
        messages={messages}
        handleSubmit={handleSubmit}
        input={input}
        handleInputChange={handleInputChange}
        stop={stop}
        append={append}
        isGenerating={status !== "ready"}
        suggestions={[
          "Generate a tasty vegan lasagna recipe for 3 people.",
          "Generate a list of 5 questions for a job interview for a software engineer.",
          "Who won the 2022 FIFA World Cup?",
        ]}
      />
    </div>
  );
}
