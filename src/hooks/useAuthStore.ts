import type { User } from "@/lib/types"
import { create } from "zustand"

type AuthState = {
    user: User | null;
    token: string | null;
}

type Actions = {
    setUser: (user: User | null) => void;
    setToken: (token: string | null) => void
}

export const useAuthStore = create<AuthState & Actions>(set => ({
    user: null,
    token: null,
    setUser: user => set({user}),
    setToken: token => set({token})
}),)