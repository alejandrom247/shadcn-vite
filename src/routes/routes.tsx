import { createBrowserRouter } from "react-router-dom";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import LoginPage from "@/pages/login/loginpage";

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
        <div>Dashboard</div>
    </PrivateRoute>
}
])