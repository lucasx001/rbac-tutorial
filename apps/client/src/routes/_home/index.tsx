import { ChatExample } from "@/components/chat-example"
import { useSession } from "@/providers/session"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_home/")({
  component: Index,
})

function Index() {
  const { username } = useSession()

  return (
    <div className="p-2">
      <h3>Welcome Home! {username}</h3>
      <ChatExample />
    </div>
  )
}
