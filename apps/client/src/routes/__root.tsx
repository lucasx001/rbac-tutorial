import { Outlet, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <div className='w-screen min-h-screen bg-accent'>
      <Outlet />
    </div>
  )
}
