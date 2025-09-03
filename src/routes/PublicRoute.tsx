import { useAuthStore } from "@/hooks/useAuthStore";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type Props ={
    children: ReactNode
}

export function PublicRoute({ children }: Props){
    const { user } = useAuthStore();

    if(user){
        return <Navigate to={"/dashboard"} />
    }
    return children;
}