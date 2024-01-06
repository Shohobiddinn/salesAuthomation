import {defineStore} from "pinia";
import {APIRoutes} from "~/variable/api-routes";
import {Ref} from "vue";
import {AppResponse} from "~/interfaces/api/app-response";
import {ListParams} from "~/interfaces/api/list-parameters";
import {UnwrapNestedRefs} from "@vue/reactivity";
import {Template} from "~/interfaces/ui/template";
import {KpiGroupTemplates} from "~/interfaces/api/kpi-group-templates";
import {AgentModel} from "~/interfaces/api/agent-model";

export const useKpiAgentsStore = (tableId: string) => defineStore(`kpi_agents_${tableId}`, () => {
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
    const dataAgentsDetail = ref(null)
    const getDataAgentsDetails = async (date:any,supervisorId:any) => {
        console.log('date',date)
        const response = await $axios.get<AppResponse<KpiGroupTemplates>>(APIRoutes.KpiAgentsDetailList(date, supervisorId),
            conf,
        );
        if (response.data) {
            // @ts-ignore
            dataAgentsDetail.value = response.data;
        }
    }
    const dataSupervisorDetail = ref(null)

    const getDataSupervisorDetails = async () => {
        const response = await $axios.get<AppResponse<KpiGroupTemplates>>(APIRoutes.KpiSupervisorDetailList,
            conf,
        );
        if (response.data) {
            // @ts-ignore
            dataSupervisorDetail.value = response.data;
        }
    }
    const add = async (value: KpiGroupTemplates): Promise<KpiGroupTemplates> => {
        const response = await $axios.post<KpiGroupTemplates>(APIRoutes.KpiAgentsUpsertCreate,
            value,
            conf,
        );
        return response.data;
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
        dataAgentsDetail,
        dataSupervisorDetail,
        getData,
        setPage,
        setPageSize,
        sortData,
        search,
        add,
        refresh,
        getGroupKpiId,
        deleteF,
        getDataAgentsDetails,
        getDataSupervisorDetails

    };
})();
