import { defineStore } from "pinia";
import { Ref } from "vue";
import { AppResponse } from "~/interfaces/api/app-response";
import { AgentModel } from "~/interfaces/api/agent-model";
import { UnwrapNestedRefs } from "@vue/reactivity";
import { FilterParams, ListParams } from "~/interfaces/api/list-parameters";
import { Template } from "~/interfaces/ui/template";
import { APIRoutes } from "~/variable/api-routes";
import { useNotification } from "@kyvg/vue3-notification";

export const useReportCustomerStore = (tableId: string) => defineStore(`report_customer_${tableId}`, () => {
  const {$axios} = useNuxtApp();

  // region States

  const data: Ref<AppResponse<AgentModel> | undefined> = ref();

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

  const templates: Ref<Template[]> = ref([
    {
      name: "Выбрать все",
      key: "selected",
      checked: true,
      type: "checkbox",
      value: false
    },
    {
      name: "ID оплаты",
      key: "id",
      thWidth: '140px',
      checked: true,
    },
    {
      name: "Название",
      key: "name",
      thWidth: '140px',
      checked: true,
    },
    {
      name: "Название",
      key: "name",
      thWidth: '140px',
      checked: true,
    },
    {
      name: "Дата добавления",
      key: "name",
      thWidth: '140px',
      checked: true,
    },
    {
      name: "Категория",
      key: "name",
      thWidth: '140px',
      checked: true,
    },
    {
      name: "Сумма",
      key: "name",
      thWidth: '140px',
      checked: true,
    },
    {
      name: "Количество",
      key: "name",
      thWidth: '140px',
      checked: true,
    },
    {
      name: "Объем",
      key: "name",
      thWidth: '140px',
      checked: true,
    },
    {
      name: "Агент",
      key: "name",
      thWidth: '140px',
      checked: true,
    },
    {
      name: "Агент",
      key: "name",
      thWidth: '140px',
      checked: true,
    },
    {
      name: "Территория",
      key: "name",
      thWidth: '140px',
      checked: true,
    },
  ]);
  const fakeData = ref([
    {selected: false, id: "ID 223", name: "Names"},
    {selected: false, id: "ID 223", name: "Names"},
    {selected: false, id: "ID 223", name: "Names"},
    {selected: false, id: "ID 223", name: "Names"},
    {selected: false, id: "ID 223", name: "Names"},
    {selected: false, id: "ID 223", name: "Names"},
    {selected: false, id: "ID 223", name: "Names"},
    {selected: false, id: "ID 223", name: "Names"},
    {selected: false, id: "ID 223", name: "Names"},
    {selected: false, id: "ID 223", name: "Names"},
    {selected: false, id: "ID 223", name: "Names"},
    {selected: false, id: "ID 223", name: "Names"},
  ])
  // region Filter States
  const cargos = ref([
    {
      name: "Состояния груза 1",
      id: "id1",
      selected: true
    },
    {
      name: "Состояния груза 2",
      id: "id2",
      selected: false
    },
    {
      name: "Состояния груза 3",
      id: "id3",
      selected: false
    },
    {
      name: "Состояния груза 4",
      id: "id4",
      selected: false
    },
  ])
  const productTypes = ref([
    {
      name: "Категория продуктов 1",
      id: "id1",
      selected: true
    },
    {
      name: "Категория продуктов 2",
      id: "id2",
      selected: false
    },
    {
      name: "Категория продуктов 3",
      id: "id3",
      selected: false
    },
    {
      name: "Категория продуктов 4",
      id: "id4",
      selected: false
    },
  ])
  const products = ref([
    {
      name: "Продукт 1",
      id: "id1",
      selected: true
    },
    {
      name: "Продукт 2",
      id: "id2",
      selected: false
    },
    {
      name: "Продукт 3",
      id: "id3",
      selected: false
    },
    {
      name: "Продукт 4",
      id: "id4",
      selected: false
    },
  ])
  const priceRange = ref([300, 600])
  const priceStep = ref(10)
  const productGroups = ref([
    {
      name: "Категория продуктов 1",
      id: "id1",
      selected: true
    },
    {
      name: "Категория продуктов 2",
      id: "id2",
      selected: false
    },
    {
      name: "Категория продуктов 3",
      id: "id3",
      selected: false
    },
    {
      name: "Категория продуктов 4",
      id: "id4",
      selected: false
    },
  ])
  const agents = ref([
    {
      name: "Агент 1",
      id: "id1",
      selected: true
    },
    {
      name: "Агент 2",
      id: "id2",
      selected: true
    },
    {
      name: "Агент 3",
      id: "id3",
      selected: true
    },
    {
      name: "Агент 4",
      id: "id4",
      selected: true
    },
  ])
  const weekDays = ref([
    {
      name: "Понедельник",
      id: "id1",
      selected: true
    },
    {
      name: "Вторник",
      id: "id2",
      selected: false
    },
    {
      name: "Среда",
      id: "id2",
      selected: false
    },
    {
      name: "Четверг",
      id: "id3",
      selected: true
    },
    {
      name: "Пятница",
      id: "id4",
      selected: true
    },
    {
      name: "Суббота",
      id: "id4",
      selected: true
    },
    {
      name: "Воскресенье",
      id: "id4",
      selected: true
    },
  ])
  const customerTypes = ref([
    {
      name: "Type 1",
      selected: false
    },
    {
      name: "Type 2",
      selected: false
    },
    {
      name: "Type 3",
      selected: false
    },
    {
      name: "Type 4",
      selected: false
    },
  ])
  const regions = ref([
    {
      name: "region 1",
      key: false
    },
    {
      name: "region 2",
      key: false
    },
    {
      name: "region 3",
      key: false
    },
    {
      name: "region 4",
      key: false
    },
  ])
  const paymentMethod = ref([
    {
      name: "Method 1",
      selected: false
    },
    {
      name: "Method 2",
      selected: false
    },
    {
      name: "Method 3",
      selected: false
    },
    {
      name: "Method 4",
      selected: false
    },
  ])
  // endregion

  const tableTabs = ref([
    {
      name: "tab 1",
      key: 1
    },
    {
      name: "tab 2",
      key: 2
    },
    {
      name: "tab 3",
      key: 3
    },
    {
      name: "tab 4",
      key: 4
    },
    {
      name: "tab 5",
      key: 5
    },
  ])
  let tableActiveTab: Ref<number> = ref(1)

  const price = ref({min: 10, max: 1000})
  const editDialog = ref('')
  const deleteDialog = ref('')
  let agentDeleting = false
  let acceptDeleting = ref(false)

  const newAgentDialog = ref(false)

  // endregion

  watch(params, async (value, oldValue, onCleanup) => {
    await _loadData();
  });

  // region Actions

  const getData = async (type: boolean) => {
    if (params.filter){
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

  const closeEditDialog = async () => {
    editDialog.value = ''
    await refresh()
  }

  const closeDeleteDialog = async () => {
    deleteDialog.value = ''
    await refresh()
  }

  const deleteAgent = async () => {

    if (!acceptDeleting.value) return;

    if (agentDeleting) {
      closeDeleteDialog();
      return;
    }
    agentDeleting = true

    if (deleteDialog.value) {
      try {
        await $axios.delete(APIRoutes.CommandAgentDelete(deleteDialog.value), conf)
        const {notify} = useNotification();
        notify({title: "Агент успешно удален.", type: "success",});
      }
      catch (e) {
        const {notify} = useNotification();
        notify({title: "Ошибка при удалении агента.", type: "error",});
      }
    }

    deleteDialog.value = ''

    agentDeleting = false

    await _loadData()
  }

  const closeNewAgentDialog = async () => {
    newAgentDialog.value = false
    await refresh()
  }

  const getAgentDetail = async (id: string) => {
    const response = await $axios.get<AgentModel>(APIRoutes.CommandAgentDelete(id),
      conf,
    );
    return response.data;
  }


  // endregion


  return {
    // States
    // region Filter States
    cargos,
    productTypes,
    products,
    priceRange,
    priceStep,
    price,
    productGroups,
    agents,
    weekDays,
    customerTypes,
    regions,
    paymentMethod,
    // endregion

    tableTabs,
    tableActiveTab,

    fakeData,

    data,
    params,
    templates,
    editDialog,
    deleteDialog,
    acceptDeleting,
    newAgentDialog,

    // Actions
    getAgentDetail,
    closeNewAgentDialog,
    deleteAgent,
    closeEditDialog,
    closeDeleteDialog,
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
