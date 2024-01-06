import {defineStore} from "pinia";
import {APIRoutes} from "~/variable/api-routes";
import {Ref} from "vue";
import {AppResponse} from "~/interfaces/api/app-response";
import {ListParams} from "~/interfaces/api/list-parameters";
import {UnwrapNestedRefs} from "@vue/reactivity";
import {Template} from "~/interfaces/ui/template";
import {UnitModel} from "~/interfaces/api/unit-model";


export const useOtherIncome = (tableId: string) => defineStore(`other_${tableId}`, () => {
    const {$axios} = useNuxtApp();

    // region States
    const data: Ref<AppResponse<UnitModel> | undefined> = ref();


    const params: UnwrapNestedRefs<ListParams> = reactive({
        page: 1,
        pageSize: 10,
        currency:null,
        from:null,
        to:null
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
            name: "",
            checked:true,
            key: "checkbox",
            type:"checkbox",
            thWidth:'120px'
        },
        {
            name: "Сумма",
            checked:true,
            key: "payment_amount",
            type:"payment_amount",
            thWidth:'120px'
        },
        {
            name: "Валюта",
            checked:true,
            key: "currency_name",
            type:"currency_name",
            thWidth:'160px',
            bRadius:'8px'
        },
        {
            name: "Дата",
            checked:true,
            key: "payment_received_date",
            type:"payment_received_date",
            thWidth:'200px'
        },
        {
            name: "Комментарии",
            checked:true,
            key: "description",
            type:"description",
            thWidth:'120px'
        }
    ]);

    // endregion

    watch(params, async (value, oldValue, onCleanup) => {
        await _loadData();
    });

    // region Actions

    const getData = async (param:any) => {
        if (param.currency){
            console.log('param',param)
            params.currency = param.currency
            params.from = param.from
            params.to = param.to
            console.log('lllllllllllllllllll')
            await _loadData()
        }
        await _loadData()
    }
    const refresh = async () => {
        await _loadData();
    }

    const _loadData = async () => {
        const response = await $axios.get<AppResponse<UnitModel>>(APIRoutes.OtherIncome,{params,headers: {"Authorization": "Bearer " + useCookie("token").value}});
        if (response.data) {
            data.value = response.data;
        }
    }

    const add = async (value: UnitModel): Promise<UnitModel> => {
        const response = await $axios.post<UnitModel>(APIRoutes.OtherIncome,
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
        add,
        refresh,
    };
})();
