import { Button } from "@/components/ui/button"
import { useAuth } from "@/providers/auth"
import { SessionProvider } from "@/providers/session"
import { Link, Outlet, createFileRoute, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/_home")({
  component: HomeLayoutComponent,
  beforeLoad: ({ context }) => {
    const { auth } = context
    if (!auth.session) {
      throw redirect({ to: "/sign-in" })
    }
  },
})

function HomeLayoutComponent() {
  const auth = useAuth()

  if (auth.session) {
    return (
      <SessionProvider session={auth.session}>
        <div className="p-4 w-screen h-screen">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <Link to="/" className="[&.active]:font-bold">
                Home
              </Link>
              <Link to="/about" className="[&.active]:font-bold">
                About
              </Link>
            </div>
            <Button onClick={auth.logout}>Logout</Button>
          </div>
          <hr />
          <Outlet />
        </div>
      </SessionProvider>
    )
  }

  return null
}
