import {defineStore} from "pinia";
import {APIRoutes} from "~/variable/api-routes";
import {Ref} from "vue";
import {AppResponse} from "~/interfaces/api/app-response";
import {ListParams} from "~/interfaces/api/list-parameters";
import {UnwrapNestedRefs} from "@vue/reactivity";
import {Template} from "~/interfaces/ui/template";
import {KpiGroupTemplates} from "~/interfaces/api/kpi-group-templates";
import {AgentModel} from "~/interfaces/api/agent-model";
import {SystemConstantModel} from "~/interfaces/api/system-constant-model";

export const useKpiSettingsStore = (tableId: string) => defineStore(`kpi_settings_${tableId}`, () => {
    const {$axios} = useNuxtApp();

    // region States

    const data: Ref<AppResponse<KpiGroupTemplates> | undefined> = ref();

    const params: UnwrapNestedRefs<ListParams> = reactive({
        page: 1,
        pageSize: 10,
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
    const datas = ref(null) as any
    const getSettings = async (params: any) => {
        const response = await $axios.get<AppResponse<KpiGroupTemplates>>(APIRoutes.KpiGroupSettingsGet,
            {
            params,
            headers: {
                "Authorization": "Bearer " + useCookie("token").value,
                "Content-Type": "application/json",
                "Accept-Language": "ru-RU"
            }
        }
        );
        datas.value = response.data;
    }
    const dataList = ref(null) as any
    const getSettingsList = async () => {
        const response = await $axios.get<AppResponse<KpiGroupTemplates>>(APIRoutes.KpiGroupSettingsGetList,
            {
                params,
                headers: {
                    "Authorization": "Bearer " + useCookie("token").value,
                    "Content-Type": "application/json",
                    "Accept-Language": "ru-RU"
                }
            }
        );
        dataList.value = response.data;
    }
    const refresh = async () => {
        await _loadData();
    }
    const role = ref(null) as any
    const getDataRole = async () => {
        const response = await $axios.get<Array<SystemConstantModel>>(
            APIRoutes.SystemConstantsRoles,
            conf,
        );
        role.value = response.data
    }

    const _loadData = async () => {
        const response = await $axios.get<AppResponse<KpiGroupTemplates>>(APIRoutes.KpiGroupList,
            conf,
        );
        if (response.data) {
            data.value = response.data;
        }
    }

    const add = async (value: any): Promise<KpiGroupTemplates> => {
        const response = await $axios.post<KpiGroupTemplates>(APIRoutes.KpiUpsertCreate,
            value,
            conf,
        );
        return response.data;
    }
    const getGroupSettings = async () => {
        const response = await $axios.get<AgentModel>(APIRoutes.KpiGroupSettingsList,
            conf,
        );
        return response.data;
    }

    const setPage = (page: number) => {
        params.page = page;
    }

    const setPageSize = (pageSize: number) => {
        params.pageSize = pageSize;
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
        datas,
        dataList,
        getData,
        setPage,
        setPageSize,
        sortData,
        search,
        add,
        refresh,
        getGroupSettings,
        deleteF,
        getSettings,
        getDataRole,
        getSettingsList,
        role
    };
})();
