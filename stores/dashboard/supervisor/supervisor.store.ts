import { defineStore } from "pinia";
import {ref, Ref} from "vue";
import { AppResponse } from "~/interfaces/api/app-response";
import { UnwrapNestedRefs } from "@vue/reactivity";
import { FilterParams, ListParams } from "~/interfaces/api/list-parameters";
import { Template } from "~/interfaces/ui/template";
import { APIRoutes } from "~/variable/api-routes";
import { ClientsModel } from "~~/interfaces/api/clients-model";

import {OrdersModel} from "~/interfaces/api/orders-model";

export const useSupervisorStore = (tableId: string) => defineStore(`supervisor_${tableId}`, () => {
    const { $axios } = useNuxtApp();

    // region States

    const data: Ref<AppResponse<ClientsModel> | undefined> = ref();

    let params: UnwrapNestedRefs<ListParams> = reactive({
        page: 1,
        pageSize: 10,
        agent: [],
        category: [],
        territory: [],
        day: []
    });
    let param: UnwrapNestedRefs<ListParams> = reactive({
        date:null,
        supervisord:null
    });

    const conf = {
        headers: {
            "Authorization": "Bearer " + useCookie("token").value,
            "Content-Type": "application/json",
            "Accept-Language": "ru-RU"
        }
    };

    const headers: Ref<Template[]> = ref([
        {
            name: "ID",
            checked: true,
            key: "visual_id",
            type: 'come',
            thWidth: '60px'
        },
        {
            name: "Названия",
            checked: true,
            key: "name",
            type: 'come',
            thWidth: '100px'
        },
        {
            name: "Название фирмы",
            checked: true,
            key: "company_name",
            type: 'come',
            thWidth: '140px'
        },
        {
            name: "Тел номер",
            checked: true,
            key: "phone",
            type: 'come',
            thWidth: '120px'
        },
        {
            name: "Категория",
            checked: true,
            key: "category",
            type: 'come',
            thWidth: '70px'
        },
        {
            name: "Агент",
            checked: true,
            key: "agents",
            type: 'come',
            thWidth: '100px'
        },
        {
            name: "Код агента",
            checked: true,
            key: "agent_code",
            type: 'come',
            thWidth: '100px'
        },
        {
            name: "День",
            checked: true,
            key: "days",
            type: 'come',
            thWidth: '70px'
        },
        {
            name: "Территория",
            checked: true,
            key: "territory",
            type: 'come',
            thWidth: '120px'
        },
        {
            name: "Ориентир",
            checked: true,
            key: "navigate",
            type: 'come',
            thWidth: '100px'
        },
        {
            name: "Просрочка",
            checked: true,
            key: "delay",
            type: 'come',
            thWidth: '140px'
        },
    ]);

    const filterStates = ref({
        firstRow: [
            { name: "Агент", key: "agent" },
            { name: "Территория", key: "territory" },
            { name: "Категория", key: "category" },
            { name: "День", key: "day" },
        ],
        secondRow: [
            { name: "", key: "btn" },
        ]
    })
    const templates = ref([
        {
            name: "Категория",
            checked:true,
            key: "name",
            type:"name",
            thWidth:'120px',
            bRadius:'8px'
        },
        {
            name: "Доля",
            checked:true,
            key: "share",
            type:"share",
            thWidth:'125px',
            bRadius:'8px'
        },
        {
            name: "Сумма\n",
            checked:true,
            key: "amount",
            type:"amount",
            thWidth:'120px'
        },
        {
            name: "Объем",
            checked:true,
            key: "volume",
            type:"volume",
            thWidth:'120px'
        },
        {
            name: "АКБ",
            checked:true,
            key: "akb",
            type:"akb",
            thWidth:'120px'
        }
    ]);
    const editClient = ref('')
    const deleteDialog = ref('')
    let acceptDeleting = ref(false)

    // endregion

    const orderPayment = async (value:any) => {

        const url = `${APIRoutes.OrderPayment}?${value}`;

        try {
            const response = await $axios.get(url, conf);

            if (response.data) {
                data.value = response.data;
            }
        } catch (error) {
            console.log(error);
        }
    };

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

    const setFilters = (filters: FilterParams[]) => {
        params.filter!.length = 1;
        params.filter! = params.filter!.concat(filters);
    }
    let filters = reactive({})
    const getTotalOrders = async (value:any) => {
        console.log('value', value)
        params = value
        const response = await $axios.get(APIRoutes.DashboardTotalOrders,{params, headers: {"Authorization": "Bearer " + useCookie("token").value}});
        if (response.data) {
            return  response.data;
        }
    }
    const getSupervisorCategories = async (value:any) => {
        console.log('value', value)
        params = value
        const response = await $axios.get(APIRoutes.DashboardSupervisorCategories,{params, headers: {"Authorization": "Bearer " + useCookie("token").value}});
        if (response.data) {
            return  response.data;
        }
    }
    const getTotalVisitPhoto = async (value:any) => {
        console.log('value', value)
        params = value
        const response = await $axios.get(APIRoutes.DashboardSupervisorTotalVisitPhoto,{params, headers: {"Authorization": "Bearer " + useCookie("token").value}});
        if (response.data) {
            return  response.data;
        }
    }
    const getTotalVisitOrder = async (value:any) => {
        console.log('value', value)
        params = value
        const response = await $axios.get(APIRoutes.DashboardSupervisorTotalVisitOrder,{params, headers: {"Authorization": "Bearer " + useCookie("token").value}});
        if (response.data) {
            return  response.data;
        }
    }
    const getTotalVisit = async (value:any) => {
        console.log('value', value)
        params = value
        const response = await $axios.get(APIRoutes.DashboardSupervisorTotalVisitOrder,{params, headers: {"Authorization": "Bearer " + useCookie("token").value}});
        if (response.data) {
            return  response.data;
        }
    }
    const getCategoryDetail = async (value:any) => {
        console.log('value', value)
        params = value
        const response = await $axios.get(APIRoutes.DashboardSupervisorCategoryDetail,{params, headers: {"Authorization": "Bearer " + useCookie("token").value}});
        if (response.data) {
            return  response.data;
        }
    }
    const getDialyReport = async (value:any) => {
        console.log('value', value)
        params = value
        const response = await $axios.get(APIRoutes.DashboardSupervisorDialyReport,{params, headers: {"Authorization": "Bearer " + useCookie("token").value}});
        if (response.data) {
            return  response.data;
        }
    }
    const getSalesAgent = async (value:any) => {
        console.log('value', value)
        params = value
        const response = await $axios.get(APIRoutes.DashboardSupervisorSalesAgent,{params, headers: {"Authorization": "Bearer " + useCookie("token").value}});
        if (response.data) {
            return  response.data;
        }
    }
    const getAgentDetail = async (value:any) => {
        console.log('value', value)
        params = value
        const response = await $axios.get(APIRoutes.DashboardSupervisorAgentDetail,{params, headers: {"Authorization": "Bearer " + useCookie("token").value}});
        if (response.data) {
            return  response.data;
        }
    }
    const getAgentOrder = async (value:any) => {
        console.log('value', value)
        params = value
        const response = await $axios.get(APIRoutes.DashboardSupervisorAgentOrder,{params, headers: {"Authorization": "Bearer " + useCookie("token").value}});
        if (response.data) {
            return  response.data;
        }
    }
    const getAgentOrderCanceled = async (value:any) => {
        console.log('value', value)
        params = value
        const response = await $axios.get(APIRoutes.DashboardSupervisorAgentOrderCanceled,{params, headers: {"Authorization": "Bearer " + useCookie("token").value}});
        if (response.data) {
            return  response.data;
        }
    }
    const getAgentOrderReject = async (value:any) => {
        console.log('value', value)
        params = value
        const response = await $axios.get(APIRoutes.DashboardSupervisorAgentOrderReject,{params, headers: {"Authorization": "Bearer " + useCookie("token").value}});
        if (response.data) {
            return  response.data;
        }
    }
    const getSalesSupervisor = async (value:any) => {
        console.log('value', value)
        params = value
        const response = await $axios.get(APIRoutes.DashboardSupervisorS,{params, headers: {"Authorization": "Bearer " + useCookie("token").value}});
        if (response.data) {
            return  response.data;
        }
    }
    const getSalesSupervisorAgentCategoryReport = async (value:any) => {
        console.log('value', value)
        params = value
        const response = await $axios.get(APIRoutes.DashboardSupervisorAgentCategoryReport,{params, headers: {"Authorization": "Bearer " + useCookie("token").value}});
        if (response.data) {
            return  response.data;
        }
    }
    const getSalesSupervisorCategoryReport = async (value:any) => {
        console.log('value', value)
        params = value
        const response = await $axios.get(APIRoutes.DashboardSupervisorCategoryReport,{params, headers: {"Authorization": "Bearer " + useCookie("token").value}});
        if (response.data) {
            return  response.data;
        }
    }
    // endregion


    return {
        // States
        data,
        params,
        headers,
        editClient,
        deleteDialog,
        acceptDeleting,
        filterStates,
        templates,
        // Actions
        setPage,
        setPageSize,
        sortData,
        search,
        setFilters,
        orderPayment,
        getTotalOrders,
        getSupervisorCategories,
        getTotalVisitPhoto,
        getTotalVisitOrder,
        getTotalVisit,
        getCategoryDetail,
        getDialyReport,
        getSalesAgent,
        getSalesSupervisor,
        getSalesSupervisorAgentCategoryReport,
        getSalesSupervisorCategoryReport,
        getAgentDetail,
        getAgentOrder,
        getAgentOrderCanceled,
        getAgentOrderReject
    };
})();
