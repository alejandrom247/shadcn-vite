import AppSideBar from "@/components/rootlayout/AppSideBar"
import NavBar from "@/components/rootlayout/NavBar"
import type { ReactNode } from "react"

type LayoutProps = {
    children: ReactNode
}

export default function RootLayout({children}: Readonly<LayoutProps>){
    return (
        <html lang="es">
            <body className="flex">
                <AppSideBar />
                <main className="w-full">
                    <NavBar/>
                    <div className="px-4">{children}</div>
                </main>
            </body>
        </html>
    );
}