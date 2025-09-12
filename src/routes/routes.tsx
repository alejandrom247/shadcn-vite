import { createBrowserRouter } from "react-router-dom";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import App from "@/App";
import LoginPage from "@/pages/login/loginpage";
import RootLayout from "@/pages/layout";
import HomePage from "@/pages/dashboard/page";

export const router = createBrowserRouter([
{
    path: "/",
    element: <PublicRoute>
        <LoginPage />
    </PublicRoute>
},
{
    path: "/dashboard",
    element: <PrivateRoute>
        <RootLayout>
       <HomePage />
        </RootLayout>
    </PrivateRoute>
}
])