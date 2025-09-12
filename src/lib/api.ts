import { useAuthStore } from '@/hooks/useAuthStore'
import ky, { HTTPError} from 'ky'
import { CookieJar } from "tough-cookie"

type RefreshTokenResponse = {
    error: string,
    message: string,
    accessToken: string
}

type ErrorResponse = {
    error: string,
    data: null;
}
export const api = ky.create({
    prefixUrl: `http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/v1/`
}).extend({
    retry: {
        limit: 4,
        delay: (attempt) => Math.min(attempt * 500, 3000),
        statusCodes: [401, 500]
    },
    hooks: {
        beforeRequest: [
            async (request) => {
               const token = localStorage.getItem("accessToken");
               if(token){
                request.headers.set('Authorization', `Bearer ${token}`)
                
                return request;}
            else {
                return request;
            }
            }
        ],
        afterResponse: [
            async (input, options, response) => {
                if (response.ok){
                    return response;
                }
                if(response.status === 401){
                    await handleAuthenticationRefresh().then((token) => {
                        input.headers.set(`Authorization`,`Bearer ${token}`)
                        return api(input, options)
                    }).catch((error) => {
                        useAuthStore().setUser(null)
                        localStorage.removeItem('accessToken')
                        return Promise.reject(error)
                    });
                    
                }
            }
        ]
        
    }
})

async function handleAuthenticationRefresh(){
 
    const newAccessTokenUrl = `auth/refresh-token`;
    safeJsonParse(api.post<RefreshTokenResponse>(newAccessTokenUrl).json()).then((response) => {
        if(response.accessToken && (response.accessToken !== null || "")){
        localStorage.setItem('accessToken', response.accessToken); return response.accessToken;}}).catch((error) => {
        return Promise.reject(error)
    })
 
}

export async function safeJsonParse<T>(responsePromise: Promise<T>): Promise<T>{
    try {
        return await responsePromise;
    } catch (error) {
        if(error instanceof HTTPError){
            const errorBody: ErrorResponse = await error.response.json();
            console.error(`API Error ${error.response.status}: ${errorBody.error}`)
            throw new Error(errorBody.error)
        }
        if (error instanceof SyntaxError){
            console.error('Sintaxis de JSON de respuesta Incorrecta');
            throw new Error('Respuesta del servidor invalida')
        }
        throw error;
    }
}