import { LoginForm } from "@/components/login/login-form"

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
    <div className="flex font-semibold text-center justify-center items-center gap-2 self-center">
    SISTEMA DE GESTIÓN DEL DEPARTAMENTO DE INFORMÁTICA
    </div>
    <LoginForm />
      </div>
    </div>
  )
}