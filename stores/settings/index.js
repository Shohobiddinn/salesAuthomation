// stores/CountStore.ts
// no need to import defineStore and acceptHMRUpdate
import {acceptHMRUpdate, defineStore} from "pinia";

export const useCountStore = defineStore('CountStore', {
    //...
    state: () => {
        return {
            filtersList: 2,
        }
    },
    actions:{
        filterListFn(param){
            this.filtersList = param
        }
    }
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCountStore, import.meta.hot));
}
