import { google } from "@ai-sdk/google";
import { streamText, Message } from "ai";
// import build from "next/dist/build";

import { initialMessage } from "@/lib/data";
// import dbConnect from "@/lib/mongoose";

// const google = createGoogleGenerativeAI({
//   apiKey: process.env.GOOGLE_API_KEY || "",
// });

export const runtime = "edge";

const generateId = () => Math.random().toString(36).slice(2, 15);

const buildGoogleGenAiPrompt = (messages: Message[]): Message[] => [
  {
    id: generateId(),
    role: "user",
    content: initialMessage.content,
  },
  ...messages.map((message) => ({
    id: message.id || generateId(),
    role: message.role,
    content: message.content,
  })),
];

export async function POST(req: Request) {
  // await dbConnect();
  // const events = await Event.find();
  // const communities = await Community.find();

  // console.log("Events:", events);
  // console.log("Communities:", communities);

  const { messages } = await req.json();

  console.log(messages);

  // const stream = streamText({
  //   model: google("gemini-pro"),
  //   messages: buildGoogleGenAiPrompt(messages),
  //   temperature: 0.7,
  // });

  // console.log("Generated Stream:", stream);

  // return stream?.toDataStreamResponse();
  // console.log(buildGoogleGenAiPrompt(messages));
  try {
    const stream = streamText({
      model: google("gemini-1.5-pro-latest"),
      system: initialMessage.content,
      // messages,
      messages: buildGoogleGenAiPrompt(messages),
      // temperature: 0.7,
    });

    // console.log("Generated Stream:", stream);

    return stream.toDataStreamResponse();
  } catch (error) {
    console.error("Error generating response:", error); // Log the full error object!
    return new Response(
      JSON.stringify({
        error: "Failed to generate response",
        details: (error instanceof Error ? error.message : "Unknown error"),
      }), // Include details!
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
