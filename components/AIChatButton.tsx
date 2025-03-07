// "use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import AIChatBot from "./AIChatBot";

export default function AIChatButton() {
  // const [chatBoxOpen, setChatBoxOpen] = useState(false);

  return (
    <main className="mx-auto flex max-w-3xl flex-col items-center justify-center p-12">
      <Card>
        <CardHeader>
          <CardTitle>To-Gather Chatbot</CardTitle>
          <CardDescription>
            This is a chatbot working on the localhost.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AIChatBot />
        </CardContent>
      </Card>
    </main>
  );
}
