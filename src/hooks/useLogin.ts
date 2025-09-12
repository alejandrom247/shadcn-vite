import { useForm } from "react-hook-form"
import type { Login } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schema/loginSchema";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/pages/login/actions/authActions";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
//import { useAuthStore } from "./useAuthStore";

export const useLogin = () => {

    const navigate = useNavigate()

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
            if(response) {
            localStorage.setItem('accessToken', response?.accessToken ? response.accessToken : "")
            navigate("/dashboard")}
            return response; 
        },
        onSuccess: (data) => {
            
            toast.success(data?.message)

        },
        onError: (error) => {
            toast.error(error.message)
        },
    });

    const onSubmit = (data: Login) => loginMutation.mutate(data)

    const onError = (error:unknown) => { loginMutation.error?.message
    }


    return { form, loginMutation, onSubmit, onError}
}