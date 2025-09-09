import { useAuthStore } from "@/hooks/useAuthStore";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type Props ={
    children: ReactNode
}

export function PrivateRoute({ children }: Props){
    const {user} = useAuthStore()
    
    if(!user){
        return <Navigate to={"/"} />
    }
    return children;
}