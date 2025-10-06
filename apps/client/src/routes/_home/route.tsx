import { useAuth } from "@/providers/auth"
import { SessionProvider } from "@/providers/session"
import { Link, Outlet, createFileRoute, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/_home")({
  component: HomeLayoutComponent,
  beforeLoad: ({ context }) => {
    const { auth } = context
    if (!auth.session) {
      console.log("no session")
      throw redirect({ to: "/sign-in" })
    }
  },
})

function HomeLayoutComponent() {
  const auth = useAuth()

  if (auth?.session) {
    return (
      <SessionProvider session={auth.session}>
        <div className="w-screen h-screen">
          <div className="p-2 flex gap-2">
            <Link to="/" className="[&.active]:font-bold">
              Home
            </Link>
            <Link to="/about" className="[&.active]:font-bold">
              About
            </Link>
          </div>
          <hr />
          <Outlet />
        </div>
      </SessionProvider>
    )
  }

  return null
}
