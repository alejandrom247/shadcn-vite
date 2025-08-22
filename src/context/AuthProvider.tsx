import { createContext, useState } from "react";

interface AuthProviderProps {
    children: React.ReactNode
}

export const AuthContext = createContext({
    isAuthenticated: false
});

export function AuthProvider({children}: AuthProviderProps){
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <AuthContext.Provider value={{isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
}