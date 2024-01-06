import { defineStore } from "pinia";
import { APIRoutes } from "~/variable/api-routes";
import { Ref } from "vue";
import { AppResponse } from "~/interfaces/api/app-response";
import { CurrencyModel } from "~/interfaces/api/currency-model";
import { ListParams } from "~/interfaces/api/list-parameters";
import { UnwrapNestedRefs } from "@vue/reactivity";
import { Template } from "~/interfaces/ui/template";


export const useCurrenciesStore = (tableId: string) => defineStore(`currencies_${tableId}`, () => {
    const { $axios } = useNuxtApp();

    const data: Ref<AppResponse<CurrencyModel> | undefined> = ref();

    const params: UnwrapNestedRefs<ListParams> = reactive({
        page: 1,
        page_size: 10,
        search: null,
        order_by: {
            field: "created_date",
            is_asc: true,
        },
        filter: [
            {
                field: "is_active",
                value: ['true'],
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
            name: "Заголовок",
            key: "title",
            thWidth: '140px',
            checked: true,
        },
        {
            name: "Код",
            key: "code",
            thWidth: '140px',
            checked: true,
        },
        {
            name: "Кодовое название",
            key: "code_name",
            thWidth: '140px',
            checked: true,
        },
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
            params.filter![0].value = [type.toString()]
        } else {
            await _loadData();

        }
    }

    const refresh = async () => {
        await _loadData();
    }

    const _loadData = async () => {
        try {
            const response = await $axios.post<AppResponse<CurrencyModel>>(APIRoutes.CurrencyList,
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

    const add = async (value: CurrencyModel): Promise<CurrencyModel> => {
        try {
            if (value.id !== undefined) {
                const response = await $axios.put<CurrencyModel>(APIRoutes.CurrencyWithId(value.id!.toString()),
                    value,
                    conf,
                );
                return response.data;
            }
            const response = await $axios.post<CurrencyModel>(APIRoutes.Currency,
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
        loading,
        getData,
        setPage,
        setPageSize,
        sortData,
        search,
        add,
        refresh,
    };
})();
