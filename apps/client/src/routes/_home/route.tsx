import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { useAuth } from "@/providers/auth"
import { SessionProvider } from "@/providers/session"
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router"

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
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
            </header>
            <main className="flex flex-1 flex-col gap-4 p-4">
              <Outlet />
            </main>
          </SidebarInset>
        </SidebarProvider>
      </SessionProvider>
    )
  }

  return null
}
