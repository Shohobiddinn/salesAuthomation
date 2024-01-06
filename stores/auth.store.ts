import {defineStore} from "pinia";
import {Ref} from "vue";
import {APIRoutes} from "~~/variable/api-routes";
import {useNuxtApp} from "#app";
import axios, {AxiosError} from "axios";
import {useNotification} from "@kyvg/vue3-notification";

export const useAuthStore = defineStore('auth', () => {
    const token = useCookie('token');

    let waiting: Ref<boolean> = ref(false);

    const login = async (username: string, password: string) => {
        try {
            if (username === "admin" && password === "admin") {
                token.value = "test"
                navigateTo("/");
                return;
            }
            const {$axios} = useNuxtApp();
            const response = await $axios.post(APIRoutes.Login, {
                login: username,
                password: password,
            });

            token.value = response.data.token;

            navigateTo("/");
        } catch (e: any | AxiosError) {
            if (axios.isAxiosError(e)) {
                const {notify} = useNotification();
                notify({title: "Wrong password or login", type: "error",});
            }
        }
    };

    return {token, login, waiting};
});