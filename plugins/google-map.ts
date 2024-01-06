import VueGoogleMaps from '@fawmi/vue-google-maps';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(VueGoogleMaps, {
        load: {
            key: "AIzaSyBso_S_14KbRTazlX_m7GFdqr9SRONX0-U"
        }
    });
});