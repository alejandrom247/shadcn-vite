import { api } from "@/lib/api";
import type { Login, User } from "@/lib/types";
import z from 'zod'

type LoginResponse = {
error?: string,
message?:string,
data: User,
}

function validateEmail(email:string){
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email)
}

export async function login(loginData:Login){
    if (!validateEmail(loginData.username)){
        let loginDataWEmail = {
            username: loginData.username,
            password: loginData.password
            
        }
    const response = await api.post<LoginResponse>("auth/login", {json: loginDataWEmail}).json()
    return response;
    }
    else {
        let loginDataWUsername = {
            email: loginData.username,
            password: loginData.password
        }
        const response = await api.post<LoginResponse>("auth/login", {json: loginDataWUsername}).json()
        return response;
    }

}