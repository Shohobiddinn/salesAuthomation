import { defineStore } from "pinia";
import { APIRoutes } from "~/variable/api-routes";
import { ref, Ref } from "vue";
import { AppResponse } from "~/interfaces/api/app-response";
import { ListParams } from "~/interfaces/api/list-parameters";
import { UnwrapNestedRefs } from "@vue/reactivity";
import { Template } from "~/interfaces/ui/template";
import { IncomeModel } from "~/interfaces/api/income-model";
import { ClientsModel } from "~/interfaces/api/clients-model";

export const useIncomesStore = (tableId: string) => defineStore(`income_${tableId}`, () => {
    const { $axios } = useNuxtApp();

    // region States

    const data: Ref<AppResponse<IncomeModel> | undefined> = ref();

    let params: UnwrapNestedRefs<ListParams> = reactive({
        page: 1,
        pageSize: 10,
        search: null,
        order_by: {
            field: "id",
            is_asc: true,
        },
        filter: []
    });

    const conf = {
        headers: {
            "Authorization": "Bearer " + useCookie("token").value,
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
    ]);
    const productsTemplates: Ref<Template[]> = ref([
        {
            name: "Ассортимент",
            key: "product_name",
            thWidth: '140px',
            background: '1px solid red',
            checked: true,
        },
        {
            name: "Цена",
            key: "price",
            thWidth: '140px',
            checked: true,
        },
        {
            name: "Блок",
            key: "quantity_in_package",
            thWidth: '140px',
            checked: true,
        },
        {
            name: "Количество",
            key: "quantity_in_package",
            thWidth: '140px',
            checked: true,
        },
        {
            name: "Объем",
            key: "volume",
            thWidth: '140px',
            checked: true,
        },
        {
            name: "На складе",
            key: "amount",
            thWidth: '140px',
            checked: true,
        },
    ]);
    let incomeTemplete: Ref<Template[]> = ref([
        {
            name: "Дата Заявки",
            checked: true,
            key: "created_date",
            type: "created_date",
            thWidth: '110px',
            bRadius: '8px'
        },
        {
            name: "Дата Отгрузки",
            checked: true,
            key: "shipped_date",
            type: "shipped_date",
            thWidth: '160px'
        },
        {
            name: "Кол-во",
            checked: true,
            key: "amount",
            type: "amount",
            thWidth: '70px'
        },
        {
            name: "Сумма",
            checked: true,
            key: "price",
            type: "price",
            thWidth: '100px'
        },
        {
            name: "Объем",
            checked: true,
            key: "volume",
            type: "volume",
            thWidth: '70px'
        },
        {
            name: "Статус",
            checked: true,
            key: "status",
            type: "status",
            thWidth: '120px'
        },
        {
            name: "Склад",
            checked: true,
            key: "warehouse",
            type: "warehouse",
            thWidth: '180px'
        },
        {
            name: "Комментарий к заказу",
            checked: true,
            key: "comment",
            type: "comment",
            thWidth: '180px'
        },
        {
            name: "Номер прихода 1C",
            checked: true,
            key: "number1c",
            type: "number1c",
            thWidth: '160px'
        },

    ]);
    // endregion

    const loading = ref(false)
    watch(params, async (value, oldValue, onCleanup) => {
        await _loadData();
    });

    // region Actions

    const getData = async (param:any) => {
        params = param
        await _loadData();
    }
    const products = ref([]) as any
    // const getProduct = async (params: any) => {
    //     const response = await $axios.get<AppResponse<IncomeModel>>(APIRoutes.IncomesProducts, { params, headers: { "Authorization": "Bearer " + useCookie("token").value, } });
    //     if (response.data) {
    //         products.value = response.data;
    //     }
    // }
    const getProducts = async (params: any) => {
        const config = {
            headers: {
                "Authorization": "Bearer " + useCookie("token").value,
                "Content-Type": "application/json",
                "Accept-Language": "ru-RU"
            },
            params: {
                warehouseId: params?.warehouseId,
                priceTypeId: params?.priceTypeId,
                categoryId: params?.categoryId
            }
        }
        try {
            const { data } = await $axios.get<AppResponse<ClientsModel>>(APIRoutes.SharedApiProducts, config);
            
            products.value = data
        } catch (error) {
            console.log(error);
        }
    }
    const income = ref() as any
    const getWithId = async (id: any) => {
        const response = await $axios.get<IncomeModel>(APIRoutes.IncomesWithId(id!.toString()),
            conf,
        );
        income.value = response.data;
    }
    const refresh = async () => {
        await _loadData();
    }

    const _loadData = async () => {
        try {
            const response = await $axios.get<AppResponse<IncomeModel>>(APIRoutes.IncomesList,
                {
                    params,
                    headers: {
                        "Authorization": "Bearer " + useCookie("token").value,
                        "Content-Type": "application/json",
                        "Accept-Language": "ru-RU"
                    },
                }
            );
            if (response.data) {
                data.value = response.data;
            }
        } catch (error) {
            console.log(error)
        }
    }

    const add = async (value: IncomeModel): Promise<IncomeModel> => {
        try {
            if (value.id !== undefined) {
                const response = await $axios.put<IncomeModel>(APIRoutes.IncomesWithId(value.id!.toString()),
                    value,
                    conf,
                );
                return response.data;
            }
            const response = await $axios.post<IncomeModel>(APIRoutes.Incomes,
                value,
                conf,
            );
            return response.data;
        } catch (error) {
            console.log('error', error)
            // alert(error.response.status)
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
        products,
        productsTemplates,
        incomeTemplete,
        income,
        loading,
        getData,
        setPage,
        setPageSize,
        sortData,
        search,
        add,
        refresh,
        getProducts,
        getWithId
    };
})();
