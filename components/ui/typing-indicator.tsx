import { Dot } from "lucide-react"

export function TypingIndicator() {
  return (
    <div className="justify-left flex space-x-1">
      <div className="rounded-lg bg-slate-100 p-3 dark:bg-slate-800">
        <div className="flex -space-x-2.5">
          <Dot className="h-5 w-5 animate-typing-dot-bounce" />
          <Dot className="h-5 w-5 animate-typing-dot-bounce [animation-delay:90ms]" />
          <Dot className="h-5 w-5 animate-typing-dot-bounce [animation-delay:180ms]" />
        </div>
      </div>
    </div>
  )
}
