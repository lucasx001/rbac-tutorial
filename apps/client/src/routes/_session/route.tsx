import { Outlet, createFileRoute, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/_session")({
  component: SessionLayoutComponent,
  beforeLoad: ({ context }) => {
    const { auth } = context
    if (auth.session) {
      throw redirect({ to: "/" })
    }
  },
})

function SessionLayoutComponent() {
  return (
    <div className="w-screen h-screen">
      <Outlet />
    </div>
  )
}
