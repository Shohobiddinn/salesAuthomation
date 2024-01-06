import {defineStore} from "pinia";
import {APIRoutes} from "~/variable/api-routes";
import {Ref} from "vue";
import {AppResponse} from "~/interfaces/api/app-response";
import {ListParams} from "~/interfaces/api/list-parameters";
import {UnwrapNestedRefs} from "@vue/reactivity";
import {Template} from "~/interfaces/ui/template";
import {KpiTemplate} from "~/interfaces/api/kpi-templete";
import {AgentModel} from "~/interfaces/api/agent-model";

export const useKpiTemplateStore = (tableId: string) => defineStore(`kpi-template_${tableId}`, () => {
    const {$axios} = useNuxtApp();

    // region States

    const data: Ref<AppResponse<KpiTemplate> | undefined> = ref();

    const params: UnwrapNestedRefs<ListParams> = reactive({
        page: 1,
        pageSize: 10,
        // search: null,
        // order_by: {
        //     field: "id",
        //     is_asc: true,
        // },
        // filter: [
        //     {
        //         field: "is_active",
        //         value: [],
        //     }
        // ],
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

    const getData = async (type: boolean) => {
        if (params.filter![0].value.includes(type.toString())) {
            params.filter![0].value = []
            params.filter![0].value.push(type.toString()) ;
            await _loadData();
        } else {
            params.filter![0].value = []
            params.filter![0].value.push(type.toString());
        }
    }
    let kpiParams = reactive({
        page:1,
        pageSize:10
    })
    const kpiActiveData: Ref<AppResponse<KpiTemplate> | undefined> = ref();
    const kpiInActiveData: Ref<AppResponse<KpiTemplate> | undefined> = ref();
    const getTemplateActive = async () => {
        const response = await $axios.get<AppResponse<KpiTemplate>>(APIRoutes.KpiGetActive,{
            params,
            headers: {
                "Authorization": "Bearer " + useCookie("token").value,
                "Content-Type": "application/json",
                "Accept-Language": "ru-RU"
            }
            }
        );
        if (response.data) {
            kpiActiveData.value = response.data;
        }
    }
    const getTemplateInActive = async () => {
        const response = await $axios.get<AppResponse<KpiTemplate>>(APIRoutes.KpiGetInActive,{
                params,
                headers: {
                    "Authorization": "Bearer " + useCookie("token").value,
                    "Content-Type": "application/json",
                    "Accept-Language": "ru-RU"
                }
            }
        );
        if (response.data) {
            kpiInActiveData.value = response.data;
        }
    }
    const getKpiId = async (kpiId: string) => {
        const response = await $axios.get<AgentModel>(APIRoutes.KpiWithId(kpiId),
            conf,
        );
        return response.data;
    }
    const kpiActivite = async (kpiId: string) => {
        const response = await $axios.patch<AgentModel>(APIRoutes.KpiActivate(kpiId),
            '',
            conf,
        );
        return response.data;
    }
    const kpiDeActivite = async (kpiId: string) => {
        const response = await $axios.patch<AgentModel>(APIRoutes.KpiDeActivate(kpiId),
            '',
            conf,
        );
        return response.data;
    }
    const refresh = async () => {
        await _loadData();
    }

    const _loadData = async () => {
        const response = await $axios.post<AppResponse<KpiTemplate>>(APIRoutes.BoxTypesList,
            params,
            conf,
        );

        if (response.data) {
            data.value = response.data;
        }
    }

    const add = async (value: KpiTemplate): Promise<KpiTemplate> => {
        if (value.id !== undefined) {
            const response = await $axios.put<KpiTemplate>(APIRoutes.KpiWithIdUpdate(value.id!.toString()),
                value,
                conf,
            );
            return response.data;
        }
        const response = await $axios.post<KpiTemplate>(APIRoutes.KpiAdd,
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
        kpiInActiveData,
        kpiActiveData,
        getData,
        setPage,
        setPageSize,
        sortData,
        search,
        add,
        refresh,
        getTemplateActive,
        getTemplateInActive,
        getKpiId,
        kpiDeActivite,
        kpiActivite
    };
})();
