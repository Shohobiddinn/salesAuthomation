import {defineStore} from "pinia";
import {APIRoutes} from "~/variable/api-routes";
import {Ref} from "vue";
import {AppResponse} from "~/interfaces/api/app-response";
import {ListParams} from "~/interfaces/api/list-parameters";
import {UnwrapNestedRefs} from "@vue/reactivity";
import {Template} from "~/interfaces/ui/template";
import {OrderReturnTaraModel} from "~/interfaces/api/order-return-tara-model";

export const useSharedClientsStore = (tableId: string) => defineStore(`shared-clients_${tableId}`, () => {
    const {$axios} = useNuxtApp();

    // region States

    const data: Ref<AppResponse<OrderReturnTaraModel> | undefined> = ref();

    let params: UnwrapNestedRefs<ListParams> = reactive({
        page: 1,
        pageSize: 10
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
            name: "Названия",
            checked:true,
            key: "name",
            type:"name",
            thWidth:'100px',
            bRadius:'8px'
        },
        {
            name: "Название фирмы",
            checked:true,
            key: "company_name",
            type:"company_name",
            thWidth:'140px'
        },
        {
            name: "Тел номер",
            checked:true,
            key: "phone",
            type:"phone",
            thWidth:'120px'
        },
        {
            name: "Категория",
            checked:true,
            key: "category",
            type:"category",
            thWidth:'70px'
        },
        {
            name: "Агент",
            checked:true,
            key: "agent",
            type:"agent",
            thWidth:'100px'
        },
        {
            name: "Код агента",
            checked:true,
            key: "agentCode",
            type:"agentCode",
            thWidth:'100px'
        },
        {
            name: "День",
            checked:true,
            key: "day",
            type:"day",
            thWidth:'70px'
        },
        {
            name: "Территория",
            checked:true,
            key: "territory",
            type:"territory",
            thWidth:'120px'
        },
        {
            name: "Ориентир",
            checked:true,
            key: "location",
            type:"location",
            thWidth:'100px'
        },
        {
            name: "Адрес",
            checked:true,
            key: "adress",
            type:"adress",
            thWidth:'140px'
        },
        {
            name: "Баланс клиента",
            checked:true,
            key: "customerBalance",
            type:"customerBalance",
            thWidth:'140px'
        },

    ]);

    // endregion

    watch(params, async (value, oldValue, onCleanup) => {
        await _loadData();
    });

    // region Actions

    const getData = async (param: boolean) => {
        params = param
        await _loadData();
    }

    const refresh = async () => {
        await _loadData();
    }

    const _loadData = async () => {
        const queryString = Object.entries(params)
            .map(([key, values]) => {
                if (typeof values !== 'object') {
                    console.log(values);
                    return `${key}=${values}`;
                } else {
                    if (values && values.length > 0) {
                        console.log(`${values.join(`&${key}=`)}`, 'values');
                        return `${key}=${values.join(`&${key}=`)}`;
                    } else return
                }
            }).filter(query => query).join('&')

        const url = `${APIRoutes.ClientsSharedList}?${queryString}`;

        try {
            const response = await $axios.get(url, conf);

            if (response.data) {
                data.value = response.data;
            }
        } catch (error) {
            console.log(error);
        }
        // const response = await $axios.get<AppResponse<OrderReturnTaraModel>>(APIRoutes.ClientsSharedList,{params,headers: {"Authorization": "Bearer " + useCookie("token").value}});
        //
        // if (response.data) {
        //     data.value = response.data;
        // }
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
        getData,
        setPage,
        setPageSize,
        sortData,
        search,
        refresh,
    };
})();
