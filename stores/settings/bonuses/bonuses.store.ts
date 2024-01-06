import { defineStore } from "pinia";
import { APIRoutes } from "~/variable/api-routes";
import { ref, Ref } from "vue";
import { AppResponse } from "~/interfaces/api/app-response";
import { ListParams } from "~/interfaces/api/list-parameters";
import { UnwrapNestedRefs } from "@vue/reactivity";
import { Template } from "~/interfaces/ui/template";
import { BonusesModel } from "~/interfaces/api/bonuses-discounts-models";

export const useBonusesStore = (tableId: string) => defineStore(`bonuses_${tableId}`, () => {
    const { $axios } = useNuxtApp();

    const data: Ref<AppResponse<BonusesModel> | undefined> = ref();
    const dataManual: Ref<AppResponse<BonusesModel> | undefined> = ref();
    const clientId = ref([]) as any
    const bonusesType = ref([]) as any
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
                value: ["true"],
            }
        ],
    });
    const paramsManual: UnwrapNestedRefs<ListParams> = reactive({
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
    let autoTemplate = ref([
        {
            name: "Название",
            checked: true,
            key: "name",
            thWidth: '140px'
        },
        {
            name: "Тип бонуса",
            checked: true,
            key: "bonus_type",
            thWidth: '140px'
        },
        {
            name: "Сумма/кол/объем",
            checked: true,
            key: "terms",
            thWidth: '200px'
        },
        {
            name: "Дейст. с",
            checked: true,
            key: "valid_from",
            thWidth: '200px'
        },
        {
            name: "Дейст. до",
            checked: true,
            key: "valid_to",
            thWidth: '200px'
        },
        {
            name: "Aктивный ",
            checked: true,
            key: "active",
            thWidth: '140px'
        },
    ]);
    const templates: Ref<Template[]> = ref([
        {
            name: "Название",
            key: "name",
            thWidth: '140px',
            background: '1px solid red',
            checked: true,
        },
        {
            name: "Короткое имя",
            key: "short_name",
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


    watch(params, async (value, oldValue, onCleanup) => {
        await _loadDataAuto();

    });
    watch(paramsManual, async (value, oldValue, onCleanup) => {
        await _loadDataManual();
    });

    const getDataAuto = async (type: boolean) => {
        if (type.toString()) {
            params.filter![0].value = []
            params.filter![0].value.push(type.toString());
        } else {
            params.filter![0].value = []
            params.filter![0].value.push(type.toString());
        }
    }

    const getDataManual = async (type: boolean) => {
        if (type.toString()) {
            paramsManual.filter![0].value = []
            paramsManual.filter![0].value.push(type.toString());
        } else {
            paramsManual.filter![0].value = []
            paramsManual.filter![0].value.push(type.toString());
        }
    }

    const refresh = async () => {
        await _loadDataAuto();
        await _loadDataManual();
    }

    const _loadDataAuto = async () => {
        try {
            const response = await $axios.post<AppResponse<BonusesModel>>(APIRoutes.BonusesAutoList,
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
    const _loadDataManual = async () => {
        try {
            const response = await $axios.post<AppResponse<BonusesModel>>(APIRoutes.BonusesManualList,
                paramsManual,
                conf,
            );
            if (response.data) {
                dataManual.value = response.data;
            }
        } catch (error) {
            console.error(error);
        }

    }

    const getBonusesTypes = async () => {
        try {
            const res = await $axios.get(APIRoutes.BonusesType,
                conf,
            );
            bonusesType.value = res.data
        } catch (error) {
            console.error(error);
        }

    }
    const add = async (value: BonusesModel): Promise<BonusesModel> => {
        try {
            if (value.id !== undefined) {
                const response = await $axios.put<BonusesModel>(APIRoutes.BonusesWithId(value.id!.toString()),
                    value,
                    conf,
                );
                return response.data;
            }
            const response = await $axios.post<BonusesModel>(APIRoutes.BonusesAuto,
                value,
                conf,
            );
            return response.data;
        } catch (error) {
            console.error(error);
        }

    }
    const addManual = async (value: BonusesModel): Promise<BonusesModel> => {
        try {
            if (value.id !== undefined) {
                const response = await $axios.put<BonusesModel>(APIRoutes.BonusesWithId(value.id!.toString()),
                    value,
                    conf,
                );
                return response.data;
            }
            const response = await $axios.post<BonusesModel>(APIRoutes.BonusesManual,
                value,
                conf,
            );
            return response.data;
        } catch (error) {
            console.error(error);
        }

    }
    const getWithId = async (id: any) => {
        try {
            const response = await $axios.get<BonusesModel>(APIRoutes.BonusesWithId(id!.toString()),
                conf,
            );
            clientId.value = response.data
        } catch (error) {
            console.error(error);
        }

    }
    const setPage = (page: number, type?: String) => {
        if (type === "manual") {
            paramsManual.page = page
        } else {
            params.page = page;
        }
    }
    const setPageSize = (pageSize: number, type?: String) => {
        if (type === "manual") {
            paramsManual.page_size = pageSize
        } else {
            params.page_size = pageSize;
        }
    }
    const sortData = (data: any, type?: String) => {
        if (type === "manual") {
            paramsManual.order_by = data
        } else {
            params.order_by = data;
        }
    }
    const search = (value: string, type?: String) => {
        if (type === "manual") {
            paramsManual.page = 1;
            paramsManual.search = value;
        } else {
            params.page = 1;
            params.search = value;
        }
    }
    const editData = ref({})
    // endregion

    return {
        data,
        dataManual,
        params,
        paramsManual,
        templates,
        bonusesType,
        autoTemplate,
        editData,
        clientId,
        getDataAuto,
        setPage,
        setPageSize,
        sortData,
        search,
        add,
        refresh,
        getBonusesTypes,
        getWithId,
        addManual,
        getDataManual
    };
})();
