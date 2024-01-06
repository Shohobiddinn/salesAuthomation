import {defineStore} from "pinia";
import {APIRoutes} from "~/variable/api-routes";
import {Ref} from "vue";
import {AppResponse} from "~/interfaces/api/app-response";
import {ListParams} from "~/interfaces/api/list-parameters";
import {UnwrapNestedRefs} from "@vue/reactivity";
import {Template} from "~/interfaces/ui/template";
import {OrderReturnTaraModel} from "~/interfaces/api/order-return-tara-model";

export const useReportWarehousesStore = (tableId: string) => defineStore(`report_warehouse_${tableId}`, () => {
    const {$axios} = useNuxtApp();

    // region States

    const data: Ref<AppResponse<OrderReturnTaraModel> | undefined> = ref();

    let params: UnwrapNestedRefs<ListParams> = reactive({
        page: 1,
        pageSize: 10,
        periodPlace:100
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
            name: "Категория",
            checked: true,
            key: "category_name",
            type: "category_name",
            thWidth: "100px",
        },
        {
            name: "Продукт",
            checked: true,
            key: "product_name",
            type: "product_name",
            thWidth: "260px",
        },
        {
            name: "Товар на складе",
            checked: true,
            key: "quantity_in_warehouse",
            type: "quantity_in_warehouse",
            thWidth: "140px",
            bRadius: "8px",
        },
        {
            name: "Сред. Дневеые продажи",
            checked: true,
            key: "share_in_category",
            type: "share_in_category",
            thWidth: "180px",
        },
        {
            name: "Текущ.Запас Хватит на… дней",
            checked: true,
            key: "enough_for_day",
            type: "enough_for_day",
            thWidth: "240px",
        },
        {
            name: "Рек. Запас на 6 дней",
            checked: true,
            key: "enough_for6_day",
            type: "enough_for6_day",
            thWidth: "160px",
        },
        {
            name: "Рек. Запас на 10 дней",
            checked: true,
            key: "enough_for10_day",
            type: "enough_for10_day",
            thWidth: "170px",
        },
        {
            name: "Рек. Запас на 30 дней",
            checked: true,
            key: "enough_for30_day",
            type: "enough_for30_day",
            thWidth: "170px",
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

        const url = `${APIRoutes.ReportWarehouse}?${queryString}`;

        try {
            const response = await $axios.get(url, conf);

            if (response.data) {
                data.value = response.data;
            }
        } catch (error) {
            console.log(error);
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
        getData,
        setPage,
        setPageSize,
        sortData,
        search,
        refresh,
    };
})();
