import { defineStore } from "pinia";
import {ref, Ref} from "vue";
import { AppResponse } from "~/interfaces/api/app-response";
import { UnwrapNestedRefs } from "@vue/reactivity";
import { FilterParams, ListParams } from "~/interfaces/api/list-parameters";
import { Template } from "~/interfaces/ui/template";
import { APIRoutes } from "~/variable/api-routes";
import { ClientsModel } from "~~/interfaces/api/clients-model";
import { AgentModel } from '~/interfaces/api/agent-model'
import { TerritoryModel } from "~/interfaces/api/territory-model";
import { ClientCategoryModel } from '~/interfaces/api/client-category-model'
import { PriceModel } from "~/interfaces/api/price-model";
import { WarehousesModel } from "~/interfaces/api/warehouses-model";
import qs from 'querystring'
import {OrdersModel} from "~/interfaces/api/orders-model";

export const usePaymentOrdersStore = (tableId: string) => defineStore(`payment_orders_create_${tableId}`, () => {
    const { $axios } = useNuxtApp();

    // region States

    const data: Ref<AppResponse<ClientsModel> | undefined> = ref();

    const params: UnwrapNestedRefs<ListParams> = reactive({
        page: 1,
        pageSize: 10,
        agent: [],
        category: [],
        territory: [],
        day: []
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
            name: "Т.Т наз",
            checked:true,
            key: "client_name",
            type:"client_name",
            thWidth:'120px',
            bRadius:'8px'
        },
        {
            name: "Заказ ID",
            checked:true,
            key: "order_id",
            type:"amount_in_warehouse",
            thWidth:'275px',
            bRadius:'8px'
        },
        {
            name: "Статус заказа",
            checked:true,
            key: "order_status",
            type:"order_status",
            thWidth:'120px'
        },
        {
            name: "Сумма заказа",
            checked:true,
            key: "amount",
            type:"amount",
            thWidth:'120px'
        },
        {
            name: "Остаток долга",
            checked:true,
            key: "debt",
            type:"debt",
            thWidth:'120px'
        },
        {
            name: "Консигнация",
            checked:true,
            key: "consignation_term",
            type:"consignation_term",
            thWidth:'220px'
        },
        {
            name: "Наличный",
            checked:true,
            key: "naqt",
            type:"Наличный Cум",
            id:"7dfe227b-5c0c-4fe6-8bef-218c752e8b12",
            thWidth:'120px'
        },
        {
            name: "Безнал",
            checked:true,
            key: "transfer",
            type:"Безналичный Cум",
            id:"7dfe227b-5c0c-4fe6-8bef-218c752e8b13",
            thWidth:'120px'
        },
        {
            name: "Доллар США",
            checked:true,
            key: "dollar",
            type:"Доллар США",
            id:"7dfe227b-5c0c-4fe6-8bef-218c752e8b14",
            thWidth:'120px'
        },
        {
            name: "Не оплачено",
            checked:true,
            key: "noPayment",
            type:"noPayment",
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
    const add = async (value: OrdersModel): Promise<OrdersModel> => {
        console.log('value.id',value.id)

        const response = await $axios.post<OrdersModel>(APIRoutes.OrderPayment,
            value,
            conf,
        );
        return response.data;
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

    const setFilters = (filters: FilterParams[]) => {
        params.filter!.length = 1;
        params.filter! = params.filter!.concat(filters);
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
        add
    };
})();
