import { ChatExample } from "@/components/chat-example"
import { useSession } from "@/providers/session"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_home/")({
  component: Index,
})

function Index() {
  const { username } = useSession()

  return (
    <div className="flex-1">
      <h1 className="text-2xl font-bold text-center">Welcome Home! {username}</h1>
      <ChatExample />
    </div>
  )
}
