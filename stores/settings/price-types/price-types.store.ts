import { defineStore } from "pinia";
import { APIRoutes } from "~/variable/api-routes";
import { Ref } from "vue";
import { AppResponse } from "~/interfaces/api/app-response";
import { ListParams } from "~/interfaces/api/list-parameters";
import { UnwrapNestedRefs } from "@vue/reactivity";
import { Template } from "~/interfaces/ui/template";
import { PriceTypesModels } from "~/interfaces/api/price-types-models";


export const usePriceTypesStore = (tableId: string) => defineStore(`price_type_${tableId}`, () => {
    const { $axios } = useNuxtApp();

    // region States

    const data: Ref<AppResponse<PriceTypesModels> | undefined> = ref();

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
                value: [],
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
            name: "Описание",
            key: "description",
            thWidth: '140px',
            checked: true,
        },
        {
            name: "Тип",
            key: "type",
            thWidth: '140px',
            checked: true,
        }
    ]);

    const loading = ref(false)
    watch(params, async (value, oldValue, onCleanup) => {
        try {
            loading.value = true
            await _loadData();
        } catch (error) {

        } finally {
            loading.value = false
        }
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
    const types = ref([])
    const getType = async () => {
        try {
            const response = await $axios.get(APIRoutes.PriceTypesType, conf)
            types.value = response.data
        } catch (error) {
            console.error(error);
        }

    }
    const refresh = async () => {
        await _loadData();
    }

    const _loadData = async () => {
        try {
            const response = await $axios.post<AppResponse<PriceTypesModels>>(APIRoutes.PriceTypesList,
                params,
                conf,
            );
            if (response.data) {
                data.value = response.data;
            }
        } catch (error) {
            console.error(error);
        }

    }

    const add = async (value: PriceTypesModels): Promise<PriceTypesModels> => {
        try {
            if (value.id !== undefined) {
                const response = await $axios.put<PriceTypesModels>(APIRoutes.PriceTypesWithId(value.id!.toString()),
                    value,
                    conf,
                );
                return response.data;
            }
            const response = await $axios.post<PriceTypesModels>(APIRoutes.PriceTypes,
                value,
                conf,
            );
            return response.data;
        } catch (error) {
            console.error(error);
        }

    }

    const getCurrency = async (param: any) => {
        try {
            const response = await $axios.post<AppResponse<CurrencyModel>>(APIRoutes.CurrencyList,
                param,
                conf,
            );

            return response?.data;
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
    // endregion
    return {
        data,
        params,
        templates,
        types,
        loading,
        getData,
        setPage,
        setPageSize,
        sortData,
        search,
        add,
        refresh,
        getType,
        getCurrency
    };
})();
