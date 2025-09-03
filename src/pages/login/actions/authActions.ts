import { api } from "@/lib/api";
import type { Login, User } from "@/lib/types";
import ky, { HTTPError } from "ky";

type LoginResponse = {
message?:string,
accesToken: string,
data: User,
}
type LoginErrorResponse = {
    error:string,
    data: null
}

function validateEmail(email:string){
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email)
}

export async function login(loginData:Login) {
    try{
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
}catch(error){
    if (error instanceof HTTPError){
        const errorBody: LoginErrorResponse = await error.response.json();
        throw new Error(errorBody.error);
    }
    if(error instanceof SyntaxError){
        throw new Error('Respuesta del servidor invalida')
    }
}

}

/*export async function getAccessToken(){
    const accessToken = ky.get()
}*/

type GetMeResponse = {
    error: string;
    user: User;
}

export async function getMe() {
    const response = await api.get<GetMeResponse>("auth/getme").json();
    return response.user
}