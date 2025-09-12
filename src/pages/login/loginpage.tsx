import { LoginForm } from "@/components/login/login-form"
import { useEffect } from "react"
import { Toaster } from 'sonner'
import { getMe } from "./actions/authActions"
import { useAuthStore } from "@/hooks/useAuthStore"


export default function LoginPage() {
      useEffect(() => {
    const token = localStorage.getItem("accessToken")
    if(token){
      getMe().then(user =>{
        useAuthStore.getState().setUser(user);
      }).catch(_error=> {
        useAuthStore.getState().setUser(null)
        localStorage.removeItem('accessToken')
        console.error(_error)
      })
    }
  }, [])

  return (
    
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
    <div className="flex font-semibold text-center justify-center items-center gap-2 self-center">
    SISTEMA DE GESTIÓN DEL DEPARTAMENTO DE INFORMÁTICA
    </div>
    <LoginForm />
    <Toaster richColors={true} />
      </div>
    </div>
  )
}