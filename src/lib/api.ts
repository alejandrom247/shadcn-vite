import ky, { type KyResponse } from 'ky'
import type { KyHeadersInit } from 'node_modules/ky/distribution/types/options';
import { CookieJar } from "tough-cookie"



const cookieJar = new CookieJar()
export const api = ky.create({
    prefixUrl: `http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/v1/`
}).extend({
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
    }
})