import { Link, Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/home')({
    component: HomeLayoutComponent,
})

function HomeLayoutComponent() {
    return (
        <div className='w-screen h-screen'>
            <div className="p-2 flex gap-2">
                <Link to="/home" className="[&.active]:font-bold">
                    Home
                </Link>
                <Link to="/home/about" className="[&.active]:font-bold">
                    About
                </Link>
            </div>
            <hr />
            <Outlet />
        </div>
    )
}