import {defineStore} from "pinia";
import {APIRoutes} from "~/variable/api-routes";
import {Ref} from "vue";
import {AppResponse} from "~/interfaces/api/app-response";
import {FilterParams, ListParams} from "~/interfaces/api/list-parameters";
import {UnwrapNestedRefs} from "@vue/reactivity";
import {AgentModel} from "~/interfaces/api/agent-model";
import {AgentType} from "~/interfaces/api/agent-type";


export const useReportExpeditorStore = (tableId: string) => defineStore(`report_expeditor_${tableId}`, () => {
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
        {
            name: "Muhammad Baraka Savdo", auditor: "one", days: [
                {name: "Пн", selected: false},
                {name: "Вт", selected: false},
                {name: "Ср", selected: true},
                {name: "Чт", selected: false},
                {name: "Пт", selected: false},
                {name: "Сб", selected: true},
                {name: "Вс", selected: false},
            ]
        },
        {
            name: "Muhammad Baraka Savdo", auditor: "one", days: [
                {name: "Пн", selected: false},
                {name: "Вт", selected: false},
                {name: "Ср", selected: true},
                {name: "Чт", selected: false},
                {name: "Пт", selected: false},
                {name: "Сб", selected: true},
                {name: "Вс", selected: false},
            ]
        },
        {
            name: "Muhammad Baraka Savdo", auditor: "one", days: [
                {name: "Пн", selected: false},
                {name: "Вт", selected: false},
                {name: "Ср", selected: true},
                {name: "Чт", selected: false},
                {name: "Пт", selected: false},
                {name: "Сб", selected: true},
                {name: "Вс", selected: false},
            ]
        },
        {
            name: "Muhammad Baraka Savdo", auditor: "one", days: [
                {name: "Пн", selected: false},
                {name: "Вт", selected: false},
                {name: "Ср", selected: true},
                {name: "Чт", selected: false},
                {name: "Пт", selected: false},
                {name: "Сб", selected: true},
                {name: "Вс", selected: false},
            ]
        },
        {
            name: "Muhammad Baraka Savdo", auditor: "one", days: [
                {name: "Пн", selected: false},
                {name: "Вт", selected: false},
                {name: "Ср", selected: true},
                {name: "Чт", selected: false},
                {name: "Пт", selected: false},
                {name: "Сб", selected: true},
                {name: "Вс", selected: false},
            ]
        },
    ])
    const filterStates = ref({
        firstRow: [
            {name: "Экспедитор", key: "expeditorList"},
            {name: "Категория", key: "categories"},
            {name: "Статус", key: "statuses"},
            {name: "Статус", key: "btn"},
        ]
    })
    const expeditorList = ref([
        {
            name: "name 1", selected: false, shipments: [
                {
                    category: '1',
                    totalBlocks: 400,
                    totalVolume: 600,
                    products: [
                        {product: "12", block: 100, volume: 200},
                        {product: "13", block: 100, volume: 200},
                        {product: "14", block: 100, volume: 200},
                        {product: "15", block: 100, volume: 200},
                    ]
                },
                {
                    category: '2',
                    totalBlocks: 400,
                    totalVolume: 600,
                    products: [
                        {product: "1", block: 100, volume: 200},
                        {product: "2", block: 100, volume: 200},
                        {product: "3", block: 100, volume: 200},
                        {product: "4", block: 100, volume: 200},
                    ]
                }
            ],
        },
        {
            name: "name 3", selected: true, shipments: [
                {
                    category: '1',
                    totalBlocks: 400,
                    totalVolume: 600,
                    products: [
                        {product: "12", block: 100, volume: 200},
                        {product: "13", block: 100, volume: 200},
                        {product: "14", block: 100, volume: 200},
                        {product: "15", block: 100, volume: 200},
                    ]
                },
                {
                    category: '2',
                    totalBlocks: 400,
                    totalVolume: 600,
                    products: [
                        {product: "1", block: 100, volume: 200},
                        {product: "2", block: 100, volume: 200},
                        {product: "3", block: 100, volume: 200},
                        {product: "4", block: 100, volume: 200},
                    ]
                }
            ]
        },
        {
            name: "name 4", selected: false, shipments: [
                {
                    category: '1',
                    totalBlocks: 400,
                    totalVolume: 600,
                    products: [
                        {product: "12", block: 100, volume: 200},
                        {product: "13", block: 100, volume: 200},
                        {product: "14", block: 100, volume: 200},
                        {product: "15", block: 100, volume: 200},
                    ]
                },
                {
                    category: '2',
                    totalBlocks: 400,
                    totalVolume: 600,
                    products: [
                        {product: "1", block: 100, volume: 200},
                        {product: "2", block: 100, volume: 200},
                        {product: "3", block: 100, volume: 200},
                        {product: "4", block: 100, volume: 200},
                    ]
                }
            ]
        },
        {
            name: "name 5", selected: false, shipments: [
                {
                    category: '1',
                    totalBlocks: 400,
                    totalVolume: 600,
                    products: [
                        {product: "12", block: 100, volume: 200},
                        {product: "13", block: 100, volume: 200},
                        {product: "14", block: 100, volume: 200},
                        {product: "15", block: 100, volume: 200},
                    ]
                },
                {
                    category: '2',
                    totalBlocks: 400,
                    totalVolume: 600,
                    products: [
                        {product: "1", block: 100, volume: 200},
                        {product: "2", block: 100, volume: 200},
                        {product: "3", block: 100, volume: 200},
                        {product: "4", block: 100, volume: 200},
                    ]
                }
            ]
        },
        {
            name: "name 6", selected: false, shipments: [
                {
                    category: '1',
                    totalBlocks: 400,
                    totalVolume: 600,
                    products: [
                        {product: "12", block: 100, volume: 200},
                        {product: "13", block: 100, volume: 200},
                        {product: "14", block: 100, volume: 200},
                        {product: "15", block: 100, volume: 200},
                    ]
                },
                {
                    category: '2',
                    totalBlocks: 400,
                    totalVolume: 600,
                    products: [
                        {product: "1", block: 100, volume: 200},
                        {product: "2", block: 100, volume: 200},
                        {product: "3", block: 100, volume: 200},
                        {product: "4", block: 100, volume: 200},
                    ]
                }
            ]
        },
    ])
    const categories = ref([
        {name: "Category 1", selected: false},
        {name: "Category 2", selected: false},
        {name: "Category 3", selected: true},
        {name: "Category 4", selected: false},
    ])
    const statuses = ref([
        {name: "Stat 1", selected: false},
        {name: "Stat 2", selected: false},
        {name: "Stat 4", selected: false},
        {name: "Stat 3", selected: true},
    ])
    const productsByCategory = ref([
        {
            id: "1",
            name: "Coca cola",
            explained: false,
            products: [
                {name: "Coca cola", id: "12"},
                {name: "Fanta", id: "13"},
                {name: "Sprite", id: "14"},
                {name: "Ays", id: "15"},
            ]
        },
        {
            id: "2",
            name: "Pesi",
            explained: false,
            products: [
                {name: "Pepsi 1L", id: "1"},
                {name: "Pepsi 0.5L", id: "2"},
                {name: "Pepsi 0.25L", id: "3"},
                {name: "Pepsi 1.5L", id: "4"},
            ]
        },
    ])
    // endregion

    watch(params, async (valuea, oldValue, onCleanup) => {
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
        expeditorList,
        filterStates,
        categories,
        statuses,
        productsByCategory,
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
