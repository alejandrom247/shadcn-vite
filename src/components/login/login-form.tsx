import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useLogin } from "@/hooks/useLogin"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import LoadingButton from "../LoadingButton"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const {form, loginMutation, onSubmit, onError} = useLogin()
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">
            Iniciar sesión
          </CardTitle>
          <CardDescription>
            Introduzca su nombre de usuario y contraseña
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, onError)}>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <FormField control={form.control} name="username" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre de usuario:</FormLabel>
                    <FormControl>
                      <Input
                      type="text"
                      placeholder="usuario o usuario@example.com"
                      {...field}
                />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                />
              </div>
                  <div className="grid gap-3">
                  <FormField control={form.control} name="password" render={({ field }) => (
                    <FormItem>
                      <div className="grid gap-3">
                      <FormLabel>Contraseña:</FormLabel>
                      </div>
                    <FormControl>
                      <Input id="password" type="password" placeholder="*****" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                  )} 
                  />
                  <a href="#" className="ml-221Ste text-sm underline-offset-4 hover:underline">
                      ¿Olvidaste la contraseña?
                    </a>
                  
                </div>
              <LoadingButton loading={loginMutation.isPending} type="submit" className="w-full text-white font-semibold rounded-lg transition-all duration-200 hover:scale-[1.02] disabled:scale-100 disabled:opacity-70">
                Acceder
              </LoadingButton>
            </div>
          </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}