import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form" 
import { Input } from "@/components/ui/input"

const FormSchema = z.object({
  username: z.email("No es una dirección de correo válida"),
})

function onSubmit(data: z.infer<typeof FormSchema>) {
  toast("Has subido el siguiente valor", {
    description: (<pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
      <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    </pre>)
  })
}

function EmailForm(){
const form = useForm<z.infer<typeof FormSchema>>({
  resolver: zodResolver(FormSchema),
  defaultValues: {
    username: ""
  },
});

return (
  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
        control={form.control}
        name="username"
        render={({field})=> (
          <FormItem>
            <FormLabel>Email:</FormLabel>
            <FormControl>
              <Input placeholder="usuario@example.com" {...field} />
            </FormControl>
            <FormDescription>
              Correo electrónico del usuario al que se le enviará el código.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}/>
        <Button type="submit">Enviar</Button>
    </form>
  </Form>
)

}


export default EmailForm
