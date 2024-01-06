import { defineStore } from "pinia";
import { APIRoutes } from "~/variable/api-routes";
import { Ref } from "vue";
import { AppResponse } from "~/interfaces/api/app-response";
import { ListParams } from "~/interfaces/api/list-parameters";
import { UnwrapNestedRefs } from "@vue/reactivity";
import { Template } from "~/interfaces/ui/template";
import { RejectModel } from "~/interfaces/api/reject-model";


export const useInventoryTypesStore = (tableId: string) => defineStore(`inventory_types_${tableId}`, () => {
    const { $axios } = useNuxtApp();

    // region States

    const data: Ref<AppResponse<RejectModel> | undefined> = ref();

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
            name: "Code",
            key: "code",
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

    // endregion

    const loading = ref(false)
    watch(params, async (value, oldValue, onCleanup) => {
        try {
            loading.value = true
            await _loadData();
        } catch (error) {

        } finally {
            loading.value = false
        }
        // await _loadData();
    });

    // region Actions

    const getData = async (type: boolean) => {
        if (type.toString()) {
            params.filter![0].value = []
            params.filter![0].value.push(type.toString());
        } else {
            params.filter![0].value = []
            params.filter![0].value.push(type.toString());
        }
    }

    const refresh = async () => {
        await _loadData();
    }

    const _loadData = async () => {
        try {
            const response = await $axios.post<AppResponse<RejectModel>>(APIRoutes.InventoryTypesList,
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

    const add = async (value: RejectModel): Promise<RejectModel> => {
        try {
            if (value.id !== undefined) {
                const response = await $axios.put<RejectModel>(APIRoutes.InventoryTypesWithId(value.id!.toString()),
                    value,
                    conf,
                );
                return response.data;
            }
            const response = await $axios.post<RejectModel>(APIRoutes.InventoryTypes,
                value,
                conf,
            );
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
