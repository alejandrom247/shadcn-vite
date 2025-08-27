import ky, { HTTPError } from 'ky'
import { CookieJar } from "tough-cookie"



const cookieJar = new CookieJar()
export const api = ky.create({
    prefixUrl: `http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/v1/`
}).extend({
    retry: {
        limit: 4,
        delay: (attempt) => Math.min(attempt * 500, 3000),
        statusCodes: [403]
    },
    hooks: {
        beforeRequest: [
            async (request) => {
                const url = request.url;
                const cookies = await cookieJar.getCookies(url);
                const cookieString = cookies.join("; ");
                request.headers.set("cookie", cookieString);
            }
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
            }],
            beforeRetry: [
                async ({request, error, retryCount}) => {
                    if (error instanceof HTTPError && error.response.status === 403 && retryCount === 1){
                        try {
                            const newAccessTokenUrl = `http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/v1/auth/refresh-token`;
                            const response = await ky.post(newAccessTokenUrl)
                            if(response.status === 200){
                                const cookies = response.headers.getSetCookie();
                                if(cookies){
                                    for(const cookie of cookies){
                                        await cookieJar.setCookie(cookie, request.url)
                                    }
                                }
                            }
                        } catch (error) {
                            throw new Error('Fallo al refrescar token de acceso')
                        }
                    }
                }
            ]
        
    }
})