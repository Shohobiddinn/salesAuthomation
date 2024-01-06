import {AppRoutes} from "~/variable/routes";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const token = useCookie('token');
    if ((token.value === undefined || token.value === null) && to.path !== AppRoutes.login) {
        const route = await navigateTo('/login');
        return route;
    }
    if (!!token.value && to.path === AppRoutes.login) {
        return navigateTo("/dashboard/supervayzer");
    }
})
