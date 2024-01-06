import { defineStore } from "pinia";
import { APIRoutes } from "~/variable/api-routes";
import { Ref } from "vue";
import { AppResponse } from "~/interfaces/api/app-response";
import { ListParams } from "~/interfaces/api/list-parameters";
import { UnwrapNestedRefs } from "@vue/reactivity";
import { Template } from "~/interfaces/ui/template";
import { Manufacturer } from "~/interfaces/api/manufacturer";


export const useManufacturersStore = (tableId: string) => defineStore(`manufactures_${tableId}`, () => {
    const { $axios } = useNuxtApp();

    const data: Ref<AppResponse<Manufacturer> | undefined> = ref();

    const params: UnwrapNestedRefs<ListParams> = reactive({
        page: 1,
        page_size: 10,
        search: null,
        order_by: {
            field: "id",
            is_asc: true,
        },
        filter: [
            {
                field: "is_active",
                value: ["true"],
            }
        ],
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
            name: "Название",
            key: "name",
            thWidth: '140px',
            background: '1px solid red',
            checked: true,
        },
        {
            name: "Код",
            key: "code",
            thWidth: '140px',
            checked: true,
        },
    ]);

    watch(params, async (value, oldValue, onCleanup) => {
        await _loadData();
    });

    const getData = async (type: boolean) => {
        if (type.toString()) {
            params.filter![0].value = []
            params.filter![0].value.push(type.toString());
        } else {
            params.filter![0].value = []
            params.filter![0].value.push(type.toString());
        }
    }

    const refresh = async () => {
        await _loadData();
    }

    const _loadData = async () => {
        try {
            const response = await $axios.post<AppResponse<Manufacturer>>(APIRoutes.ManufacturersList,
                params,
                conf,
            );
            if (response.data) {
                data.value = response.data;
            }
        } catch (error) {
            console.error(error)
        }

    }

    const add = async (value: Manufacturer): Promise<Manufacturer> => {
        try {
            if (value.id !== undefined) {
                const response = await $axios.put<Manufacturer>(APIRoutes.ManufacturersWithId(value.id!.toString()),
                    value,
                    conf,
                );
                return response.data;
            }
            const response = await $axios.post<Manufacturer>(APIRoutes.Manufacturers,
                value,
                conf,
            );
            return response.data;
        } catch (error) {
            console.error(error)
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
    return {
        data,
        params,
        templates,
        getData,
        setPage,
        setPageSize,
        sortData,
        search,
        add,
        refresh,
    };
})();
