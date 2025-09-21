import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_session')({
    component: SessionLayoutComponent,
})

function SessionLayoutComponent() {
    return (
        <div className='w-screen h-screen'>
            <Outlet />
        </div>
    )
}