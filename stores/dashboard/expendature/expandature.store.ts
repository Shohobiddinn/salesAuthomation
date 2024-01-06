import { defineStore } from "pinia";
import { APIRoutes } from "~/variable/api-routes";
import { Ref } from "vue";
import { AppResponse } from "~/interfaces/api/app-response";
import { ListParams } from "~/interfaces/api/list-parameters";
import { UnwrapNestedRefs } from "@vue/reactivity";
import { Template } from "~/interfaces/ui/template";
import { UnitModel } from "~/interfaces/api/unit-model";


export const useExpandature = (tableId: string) => defineStore(`expand_${tableId}`, () => {
    const { $axios } = useNuxtApp();

    const dataExpense: Ref<AppResponse<UnitModel> | undefined> = ref();
    const data: Ref<AppResponse<UnitModel> | undefined> = ref();
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

    const templatesExpense: Ref<Template[]> = ref([
        {
            name: "Фонд",
            checked: true,
            key: "category_name",
            type: "fond",
            thWidth: '120px',
            bRadius: '8px'
        },
        {
            name: "Название",
            checked: true,
            key: "name",
            type: "name",
            thWidth: '120px'
        },
        {
            name: "Действия",
            checked: true,
            key: "actions",
            type: "actions",
            thWidth: '70px'
        }
    ]);
    const templatesCategory: Ref<Template[]> = ref([
        {
            name: "Название",
            checked: true,
            key: "name",
            type: "name",
            thWidth: '120px'
        },
        {
            name: "Действия",
            checked: true,
            key: "actions",
            type: "actions",
            thWidth: '70px'
        }
    ]);
    const newExpandatureDialog = ref(false);
    const newExpandatureCategoryDialog = ref(false);



    watch(params, async (value, oldValue, onCleanup) => {
        await _loadData();
    });

    const getData = async () => {
        try {
            const response = await $axios.get<AppResponse<UnitModel>>(APIRoutes.ExpenseTypeCategory,
                conf,
            );
            if (response.data) {
                dataExpense.value = response.data;
            }
        } catch (error) {
            console.error(error);
        }

    }
    const getDataExpense = async () => {
        try {
            const response = await $axios.get<AppResponse<UnitModel>>(APIRoutes.ExpenseType,
                conf,
            );
            if (response.data) {
                data.value = response.data;
            }
        } catch (error) {
            console.error(error);
        }

    }

    const _loadData = async () => {
        try {
            const response = await $axios.post<AppResponse<UnitModel>>(APIRoutes.UnitsList,
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

    const add = async (value: UnitModel): Promise<UnitModel> => {
        try {
            if (value.id !== undefined) {
                const response = await $axios.put<UnitModel>(APIRoutes.ExpenseCategoryWithId(value.id!.toString()),
                    value,
                    conf,
                );
                await getData()
                console.log("edit add")
                return response.data;
            }
            const response = await $axios.post<UnitModel>(APIRoutes.ExpenseTypeCategory,
                value,
                conf,
            );
            console.log("create add")

            await getData()
            return response.data;
        } catch (error) {
            console.error(error);
        }

    }
    const addCategory = async (value: UnitModel): Promise<UnitModel> => {
        try {
            if (value.id !== undefined) {
                const response = await $axios.put<UnitModel>(APIRoutes.ExpenseWithId(value.id!.toString()),
                    value,
                    conf,
                );
                console.log("edit add")

                await getDataExpense()
                return response.data;
            }
            const response = await $axios.post<UnitModel>(APIRoutes.ExpenseType,
                value,
                conf,
            );
            console.log("create add")

            await getDataExpense()
            return response.data;
        } catch (error) {
            console.error(error);
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
        templatesExpense,
        templatesCategory,
        dataExpense,
        newExpandatureCategoryDialog,
        newExpandatureDialog,

        getData,
        getDataExpense,
        setPage,
        setPageSize,
        sortData,
        search,
        add,
        addCategory,
    };
})();
