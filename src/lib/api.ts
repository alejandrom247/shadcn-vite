import { useAuthStore } from '@/hooks/useAuthStore'
import ky, { HTTPError } from 'ky'
import { CookieJar } from "tough-cookie"

type RefreshTokenResponse = {
    error: string,
    message: string,
    accessToken: string
}

type ErrorResponse = {
    message: string,
    data: null;
}

const cookieJar = new CookieJar()
export const api = ky.create({
    prefixUrl: `http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/v1/`
}).extend({
    retry: {
        limit: 4,
        delay: (attempt) => Math.min(attempt * 500, 3000),
        statusCodes: [401, 403, 500]
    },
    hooks: {
        beforeRequest: [
            async (request) => {
               const token = localStorage.getItem("accessToken");
               if(token){
                request.headers.set('Autorizathion', `Bearer ${token}`)
               }
                /*const accessToken = localStorage.getItem('accessToken')
                if(!accessToken){
                    return request;
                }else{

                const modified = new Request(request, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })*/
                 const url = request.url;
                const cookies = await cookieJar.getCookies(url);
                const cookieString = cookies.join("; ");
                request.headers.set("cookie", cookieString);
                return request;}
                /*const accessToken = useAuthStore().token
                 //if(accessToken && accessToken !== ""){
                    request.headers.set('Authorization', `Bearer ${accessToken}`)
                }
            }*/
        ],
        afterResponse: [
            async (request, options, response) => {
                const url = request.url;
                const cookies = response.headers.getSetCookie();
                if(cookies) {
                    for(const cookie of cookies) {
                        await cookieJar.setCookie(cookie, url);
                    }
                }
                if(response.ok){
                    return;
                }
               /* switch (response.status){
                    case 401 | 403:
                        await handleAuthenticationRefresh();
                        return ky(request)
                    case 500:
                        throw new Error('Servidor caido intente mas tarde')
                    default:
                        const error = (await response.json()) as ErrorResponse
                        throw new Error(error.message)
                }*/
            }],
          /*  beforeRetry: [
                async ({request, error, retryCount}) => {
                    if (error instanceof HTTPError && (error.response.status === 403 || error.response.status === 401) && retryCount === 1){
                        try {
                            const newAccessTokenUrl = `http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/v1/auth/refresh-token`;
                            const response = await ky.post<RefreshTokenResponse>(newAccessTokenUrl).json()
                           /* if(response.status === 200){
                                const cookies = response.headers.getSetCookie();
                                if(cookies){
                                    for(const cookie of cookies){
                                        await cookieJar.setCookie(cookie, request.url)
                                    }
                                }
                            }
                           if(response.accessToken){
                            useAuthStore().setToken(response.accessToken)
                            request.headers.set('Authorization',`Bearer ${response.accessToken}`)
                              const url = request.url;
                            const cookies = await cookieJar.getCookies(url);
                            const cookieString = cookies.join("; ");
                            request.headers.set("cookie", cookieString);
                           }
                           else {
                            if(response.error){
                            throw new Error(response.error)
                           }
                        }
                        } catch (error) {
                            throw new Error('Fallo al refrescar token de acceso')
                        }
                    }
                }
            ]*/
        
    }
})

async function handleAuthenticationRefresh(){
    try {
    const newAccessTokenUrl = `http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/v1/auth/refresh-token`;
    const response = await ky.post<RefreshTokenResponse>(newAccessTokenUrl, {credentials:  'include'}).json();
    if(response.accessToken){
    localStorage.setItem('accessToken', response.accessToken)
    } else {
        throw new Error(response.error)
    }
} catch (error) {
    if(error instanceof HTTPError){
    throw new Error(error.message)
} else {
    throw new Error('No se puede refrescar el acceso')
}
}
}