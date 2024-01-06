import {defineStore} from "pinia";
import {APIRoutes} from "~/variable/api-routes";
import {Ref} from "vue";
import {AppResponse} from "~/interfaces/api/app-response";
import {ListParams} from "~/interfaces/api/list-parameters";
import {UnwrapNestedRefs} from "@vue/reactivity";
import {Template} from "~/interfaces/ui/template";
import {KpiGroupTemplates} from "~/interfaces/api/kpi-group-templates";
import {AgentModel} from "~/interfaces/api/agent-model";

export const useKpiGroupStore = (tableId: string) => defineStore(`kpi_group_${tableId}`, () => {
    const {$axios} = useNuxtApp();

    // region States

    const data: Ref<AppResponse<KpiGroupTemplates> | undefined> = ref();

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

    // endregion

    watch(params, async (value, oldValue, onCleanup) => {
        await _loadData();
    });

    // region Actions

    const getData = async () => {
        const response = await $axios.get<AppResponse<KpiGroupTemplates>>(APIRoutes.KpiGroupList,
            conf,
        );
        if (response.data) {
            data.value = response.data;
        }
    }

    const deleteF = async (kpiId: string) => {
        const response = await $axios.delete<AgentModel>(APIRoutes.KpiGroupDeleteWithId(kpiId),
            conf,
        );
        return response.data;
    }
    const refresh = async () => {
        await _loadData();
    }

    const _loadData = async () => {
        const response = await $axios.get<AppResponse<KpiGroupTemplates>>(APIRoutes.KpiGroupList,
            conf,
        );
        if (response.data) {
            data.value = response.data;
        }
    }

    const add = async (value: KpiGroupTemplates): Promise<KpiGroupTemplates> => {
        if (value.id !== undefined) {
            const response = await $axios.put<KpiGroupTemplates>(APIRoutes.KpiGroupWithId(value.id!.toString()),
                value,
                conf,
            );
            return response.data;
        }
        const response = await $axios.post<KpiGroupTemplates>(APIRoutes.KpiGroupCreate,
            value,
            conf,
        );
        return response.data;
    }
    const getGroupKpiId = async (kpiId: string) => {
        const response = await $axios.get<AgentModel>(APIRoutes.KpiGroupGetWithId(kpiId),
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
        getGroupKpiId,
        deleteF
    };
})();
