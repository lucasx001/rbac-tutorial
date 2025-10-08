import { AuthState } from "@/providers/auth"
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router"

interface RootRouteContext {
  auth: AuthState
}

export const Route = createRootRouteWithContext<RootRouteContext>()({
  component: RootComponent,
})

function RootComponent() {
  return (
    <div className="w-screen h-screen bg-accent">
      <Outlet />
    </div>
  )
}
