import { Message, MessageContent, MessageAvatar } from "@/components/ui/ai/message"

export function ChatExample() {
  return (
    <div className="flex flex-col gap-4 p-8 max-w-2xl mx-auto">
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
          I think I need global state. The app is getting complex with multiple components needing the same data.
        </MessageContent>
      </Message>
    </div>
  )
}
