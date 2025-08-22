import { useForm } from "react-hook-form"
import type { Login } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schema/loginSchema";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/pages/login/actions/authActions";

export const useLogin = () => {

    const form = useForm<Login>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: ""
        }
    })

    const loginMutation = useMutation({
        mutationFn: async (data: Login)=> {
            const response = await login(data);
            return response; 
        },
        onSuccess: (data) => {
            console.log(data)
        },
        onError: (error) => {
            console.log(error)
        }
    });

    const onSubmit = (data: Login) => loginMutation.mutate(data)

    const onError = (error: unknown) => console.error(error)

    return { form, loginMutation, onSubmit, onError}
}