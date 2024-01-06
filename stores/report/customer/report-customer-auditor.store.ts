import {defineStore} from "pinia";
import {APIRoutes} from "~/variable/api-routes";
import {Ref} from "vue";
import {AppResponse} from "~/interfaces/api/app-response";
import {FilterParams, ListParams} from "~/interfaces/api/list-parameters";
import {UnwrapNestedRefs} from "@vue/reactivity";
import {AgentModel} from "~/interfaces/api/agent-model";
import {AgentType} from "~/interfaces/api/agent-type";


export const useReportCustomerAuditors = (tableId: string) => defineStore(`report_customer_auditor_${tableId}`, () => {
    const {$axios} = useNuxtApp();

    // region States

    const data: Ref<AppResponse<AgentModel> | undefined> = ref();

    const agentTypes: Ref<AgentType[] | undefined> = ref()

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
                value: [
                    "true"
                ],
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

    const fakeData = ref([
        {name: "Muhammad Baraka Savdo", auditor: "one", days:[
                {name: "Пн", selected: false},
                {name: "Вт", selected: false},
                {name: "Ср", selected: true},
                {name: "Чт", selected: false},
                {name: "Пт", selected: false},
                {name: "Сб", selected: true},
                {name: "Вс", selected: false},
            ]},
        {name: "Muhammad Baraka Savdo", auditor: "one", days:[
                {name: "Пн", selected: false},
                {name: "Вт", selected: false},
                {name: "Ср", selected: true},
                {name: "Чт", selected: false},
                {name: "Пт", selected: false},
                {name: "Сб", selected: true},
                {name: "Вс", selected: false},
            ]},
        {name: "Muhammad Baraka Savdo", auditor: "one", days:[
                {name: "Пн", selected: false},
                {name: "Вт", selected: false},
                {name: "Ср", selected: true},
                {name: "Чт", selected: false},
                {name: "Пт", selected: false},
                {name: "Сб", selected: true},
                {name: "Вс", selected: false},
            ]},
        {name: "Muhammad Baraka Savdo", auditor: "one", days:[
                {name: "Пн", selected: false},
                {name: "Вт", selected: false},
                {name: "Ср", selected: true},
                {name: "Чт", selected: false},
                {name: "Пт", selected: false},
                {name: "Сб", selected: true},
                {name: "Вс", selected: false},
            ]},
        {name: "Muhammad Baraka Savdo", auditor: "one", days:[
                {name: "Пн", selected: false},
                {name: "Вт", selected: false},
                {name: "Ср", selected: true},
                {name: "Чт", selected: false},
                {name: "Пт", selected: false},
                {name: "Сб", selected: true},
                {name: "Вс", selected: false},
            ]},
    ])

    // endregion

    watch(params, async (value, oldValue, onCleanup) => {
        await _loadData();
    });

    // region Actions

    const getData = async (type: boolean) => {
        if (params.filter) {
            const i = params.filter.findIndex(f => f.field === "is_active")
            params.filter[i].value = [type.toString()]
        }
        await _loadData();
    }

    const refresh = async () => {
        await _loadData();
    }

    const _loadData = async () => {
        const response = await $axios.post<AppResponse<AgentModel>>(APIRoutes.CommandAgentsList,
            params,
            conf,
        );

        if (response.data) {
            data.value = response.data;
        }
    }

    const add = async (value: AgentModel): Promise<AgentModel> => {
        if (value.id !== undefined) {
            const response = await $axios.put<AgentModel>(APIRoutes.CommandAgentDelete(value.id!.toString()),
                value,
                conf,
            );
            return response.data;
        }
        const response = await $axios.post<AgentModel>(APIRoutes.CommandAgent,
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

    const setFilters = (filters: FilterParams[]) => {
        params.filter!.length = 1;
        params.filter! = params.filter!.concat(filters);
    }

    const getAgentDetail = async (id: string) => {
        const response = await $axios.get<AgentModel>(APIRoutes.CommandAgentDelete(id),
            conf,
        );
        return response.data;
    }

    const getAgentTypes = async () => {
        const res = await $axios.get<AgentType[]>(APIRoutes.SystemConstants('agent_types'),
            conf
        );

        agentTypes.value = res.data
    }

    // endregion


    return {
        // States
        data,
        params,
        agentTypes,

        // Fake
        fakeData,

        // Actions
        getAgentTypes,
        getAgentDetail,
        getData,
        setPage,
        setPageSize,
        sortData,
        search,
        add,
        refresh,
        setFilters,
    };
})();
