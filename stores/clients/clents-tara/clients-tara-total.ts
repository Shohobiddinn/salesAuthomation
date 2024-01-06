import {defineStore} from "pinia";
import {APIRoutes} from "~/variable/api-routes";
import {Ref} from "vue";
import {AppResponse} from "~/interfaces/api/app-response";
import {ListParams} from "~/interfaces/api/list-parameters";
import {UnwrapNestedRefs} from "@vue/reactivity";
import {Template} from "~/interfaces/ui/template";
import {BoxTypeModel} from "~/interfaces/api/box-type-model";
import {AgentModel} from "~/interfaces/api/agent-model";
import {UserModel} from "~/interfaces/api/user-model";


export const useClientsTaraTotalStore = (tableId: string) => defineStore(`clients_taras_total_${tableId}`, () => {
    const {$axios} = useNuxtApp();

    // region States

    const data: Ref<AppResponse<BoxTypeModel> | undefined> = ref();
    const data1: Ref<AppResponse<BoxTypeModel> | undefined> = ref();

    const params: UnwrapNestedRefs<ListParams> = reactive({
        page: 1,
        pageSize: 10,
    });

    const conf = {
        headers: {
            "Authorization": "Bearer " + useCookie("token").value,
            "Content-Type": "application/json",
            "Accept-Language": "ru-RU"
        }
    };


    const templates: Ref<Template[]> = ref([
        {
            name: "Тара",
            checked:true,
            key: "tara",
            type:"tara",
            thWidth:'280px'
        },
        {
            name: "Итого",
            checked:true,
            key: "total",
            type:"total",
            thWidth:'180px'
        },
    ]);


    const getDataTara = async () => {
        const response = await $axios.get(APIRoutes.ClientsTaraTotal,{params, headers: {"Authorization": "Bearer " + useCookie("token").value}});

        if (response.data) {
            data1.value = response.data;
        }
    }

    const setPage = (page: number) => {
        params.page = page;
    }

    const setPageSize = (pageSize: number) => {
        params.page_size = pageSize;
    }

    const sortData = (data: any) => {
        params.order_by = data;
    }

    const search = (value: string) => {
        params.page = 1;
        params.search = value;
    }

    // endregion

    return {
        data,
        data1,
        params,
        templates,
        getDataTara,
        setPage,
        setPageSize,
        sortData,
        search,
    };
})();
