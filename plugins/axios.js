import axios from "axios";
import {AppRoutes} from "~/variable/routes";
import {navigate} from "jsdom/lib/jsdom/living/window/navigation";

export default defineNuxtPlugin((nuxtApp) => {
    const _axios = axios.create({
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
            "Access-Control-Allow-Headers": "Content-Type",
        },
    });

    _axios.interceptors.response.use(
        function (response) {
            return response;
        },
        async function (error) {
            console.log(error);
            if (error.request.status === 401) {
                const token = useCookie("token");
                token.value = undefined;
 
                await navigateTo(AppRoutes.login);
            }

            return Promise.reject(error);
        },
    );

    return {
        provide: {
            axios: _axios,
        },
    };
});
