import { Message, MessageContent, MessageAvatar } from "@/components/ui/ai/message"
import { ChatPromptInput, PromptStatus } from "./chat-prompt-input"
import { useChatStream } from "@/hooks/use-chat-stream"
import { useEffect, useState } from "react"
import { Response } from "./ui/ai/response"

export function ChatExample() {
  const { output, refetch, isFetching } = useChatStream()
  const [status, setStatus] = useState<PromptStatus>("ready")

  useEffect(() => {
    if (isFetching) {
      setStatus("streaming")
    }
  }, [isFetching])

  return (
    <div className="flex flex-col gap-4 max-w-3xl mx-auto pb-[180px]">
      <Message from="user">
        <MessageAvatar src="https://github.com/dovazencot.png" name="User" />
        <MessageContent>
          Hey there! I'm working on a React project and could use some help with state management.
        </MessageContent>
      </Message>
      <Message from="assistant">
        <MessageAvatar src="https://github.com/openai.png" name="AI" />
        <MessageContent>
          I'd be happy to help with React state management! Are you working with component state, or do you need
          something more complex like global state management?
        </MessageContent>
      </Message>
      <Message from="user">
        <MessageAvatar src="https://github.com/dovazencot.png" name="User" />
        <MessageContent>
          I think I need global state. The app is getting complex with multiple components needing the same data.I think
          I need global state.
        </MessageContent>
      </Message>
      {output && (
        <Message from="assistant">
          <MessageAvatar src="https://github.com/openai.png" name="AI" />
          <MessageContent>
            <Response>{output}</Response>
          </MessageContent>
        </Message>
      )}
      <div className="absolute bottom-0 left-0 right-0 z-10 max-w-3xl mx-auto">
        <ChatPromptInput
          status={status}
          onSubmit={(text) => {
            setStatus("submitted")
            refetch(text)
              .then(() => setStatus("ready"))
              .catch(() => setStatus("error"))
          }}
        />
      </div>
    </div>
  )
}
