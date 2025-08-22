import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <main className="flex min-h-svh flex-col items-center justify-center'">
            <Outlet />
        </main>
    )
}

export default Layout