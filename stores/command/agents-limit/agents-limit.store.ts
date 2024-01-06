import { defineStore } from "pinia";
import { Ref } from "vue";
import { AppResponse } from "~/interfaces/api/app-response";
import { AgentPacketModel } from "~/interfaces/api/agent-packet-model";
import { CurrencyModel } from "~/interfaces/api/currency-model";
import { ProductsModel } from "~/interfaces/api/products-model";
import { UnwrapNestedRefs } from "@vue/reactivity";
import { FilterParams, ListParams } from "~/interfaces/api/list-parameters";
import { Template } from "~/interfaces/ui/template";
import { APIRoutes } from "~/variable/api-routes";
import { useNotification } from "@kyvg/vue3-notification";
import { ProductGroupsModel } from "~/interfaces/api/product-groups-model";


export const useAgentsLimitStore = (tableId: string) => defineStore(`command_agents_limit_${tableId}`, () => {
  const { $axios } = useNuxtApp();

  // region States

  const data: Ref<AppResponse<AgentPacketModel> | undefined> = ref();

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

  const headers: Ref<Template[]> = ref([
    {
      name: "",
      checked: false,
      key: "checkbox",
      type: "checkbox",
      thWidth: "20px",
    },
    {
      name: "Ф.И.О",
      checked: true,
      key: "fio",
      thWidth: '180px',
      isComputable: true
    },
    {
      name: "Продукты",
      checked: true,
      key: "products",
      thWidth: '120px'
    },
    {
      name: "Тип цены",
      checked: true,
      key: "price_types",
      thWidth: '120px'
    },
    {
      name: "Конфигурации",
      checked: true,
      key: "configuration",
      thWidth: '120px'
    },
    {
      name: "Aктивный ",
      checked: true,
      key: "is_active",
      thWidth: '120px'
    },
    {
      name: "",
      checked: true,
      key: "createAgentLimit",
      type: "come",
      thWidth: '120px'
    },
  ]);
  const editDialog = ref('')
  const editMultipleDialog = ref([])
  const configByIdDialog = ref('')
  const deleteDialog = ref('')
  let acceptDeleting = ref(false)
  let agentLimitDeleting = false

  const newAgentLimitDialog = ref(false)

  // endregion

  watch(params, async (value, oldValue, onCleanup) => {
    await _loadData();
  });

  // region Actions

  const getData = async () => {
    await _loadData();
  }

  const refresh = async () => {
    await _loadData();
  }

  const _loadData = async () => {
    const response = await $axios.post<AppResponse<AgentPacketModel>>(APIRoutes.CommandAgentsPaketList,
      params,
      conf,
    );

    if (response.data) {
      data.value = response.data;
    }
  }

  const add = async (value: AgentPacketModel): Promise<AgentPacketModel> => {
    const { notify } = useNotification();
    if (value.id !== undefined) {
      try {
        const { data } = await $axios.put<AgentPacketModel>(APIRoutes.CommandAgentsPaket,
          value,
          conf,
        );
        notify({ title: "Ограничения успешно изменено.", type: "success", });
        return data;
      } catch (error) {
        console.log(error);
        notify({ title: "Ошибка при изменении ограничения.", type: "error", });
      }
    }
    try {
      const response = await $axios.post<AgentPacketModel>(APIRoutes.CommandAgentsPaket,
        value,
        conf,
      );
      notify({ title: "Ограничения успешно сохранено.", type: "success", });
      return response.data
    } catch (error) {
      console.log(error);
      notify({ title: "Ошибка при сохранении ограничения.", type: "error", });
    }
  }

  const getAgentsConfigsAll = async () => {
    const { data } = await $axios.get(APIRoutes.CommandGetAgentsConfigsAll, conf)
    return data
  }

  const postAgentsConfigsAll = async (postData: any) => {
    const { notify } = useNotification();
    try {
      const { data } = await $axios.post(
        APIRoutes.CommandPostAgentsConfigsAll,
        postData,
        conf
      );
      notify({ title: "Конфиги успешно обновлены", type: "success" });
      return data;
    } catch (e) {
      notify({ title: "Ошибка с конфигами", type: "error", });
    }
  };

  const postConfigById = async (agentId: string, postData: any) => {
    const config = {
      headers: {
        "Authorization": "Bearer " + useCookie("token").value,
        "Content-Type": "application/json",
        "Accept-Language": "ru-RU"
      },
      params: {
        agentId
      }
    };
    try {
      const { data } = await $axios.post(
        APIRoutes.CommandAgentsConfigs,
        postData,
        config
      );
      return data;
    } catch (e) {
      const { notify } = useNotification();
      notify({ title: "Ошибка с конфигами", type: "error", });
    }
  };

  const getConfigById = async (agentId: string) => {
    const config = {
      headers: {
        "Authorization": "Bearer " + useCookie("token").value,
        "Content-Type": "application/json",
        "Accept-Language": "ru-RU"
      },
      params: {
        agentId
      }
    };
    const { data } = await $axios.get(APIRoutes.CommandAgentsConfigs,
      config,
    );
    return data
  }

  const getCurrencies = async (params: any) => {
    try {
      const { data } = await $axios.post<AppResponse<CurrencyModel>>(APIRoutes.CurrencyList,
        params,
        conf,
      );
      return data
    } catch (error) {
      console.log(error);
    }
  }

  const getPriceTypes = async (params: any) => {
    try {
      const { data } = await $axios.post<AppResponse<CurrencyModel>>(APIRoutes.PriceTypesList,
        params,
        conf,
      );
      return data
    } catch (error) {
      console.log(error);
    }
  }

  const getProductsByGroupId = async (id: string) => {
    try {
      let url = APIRoutes.CommandGetProductsByGroupId
      if (id) {
        url = `${APIRoutes.CommandGetProductsByGroupId}?gropuId=${id}`
      }
      const { data } = await $axios.get<AppResponse<ProductsModel>>(url, conf);
      return data
    } catch (error) {
      console.log(error);
    }
  }

  const getProductGroups = async (params: any) => {
    try {
      const { data } = await $axios.post<AppResponse<ProductGroupsModel>>(APIRoutes.ProductGroupsList,
        params,
        conf
      )
      return data
    } catch (error) {
      console.log(error);
    }
  }

  const setPage = (page: number) => {
    params.page = page;
  }

  const setPageSize = (pageSize: number) => {
    params.page_size = pageSize;
  }

  const sortData = (data: any) => {
    if (data.field === 'checkbox') return
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

  const setNullMultipleDialog = async () => {
    editMultipleDialog.value = []
  }

  const closeConfigByIdDialog = async () => {
    configByIdDialog.value = ''
    await refresh()
  }

  const closeDeleteDialog = async () => {
    deleteDialog.value = ''
    await refresh()
  }

  const deleteAgentLimit = async () => {

    if (!acceptDeleting.value) return;

    if (agentLimitDeleting) {
      closeDeleteDialog();
      return;
    }
    agentLimitDeleting = true

    if (deleteDialog.value) {
      const { notify } = useNotification();
      try {
        await $axios.delete(APIRoutes.CommandAgentDelete(deleteDialog.value), conf)
        notify({ title: "Агент успешно удален.", type: "success", });
      }
      catch (e) {
        notify({ title: "Ошибка при удалении агента.", type: "error", });
      }
    }

    deleteDialog.value = ''

    agentLimitDeleting = false

    await _loadData()
  }

  const closeNewAgentLimitDialog = async () => {
    newAgentLimitDialog.value = false
    await refresh()
  }

  const getAgentLimitDetail = async (id: string) => {
    try {
      const { data } = await $axios.get<AgentPacketModel>(APIRoutes.CommandAgentsPaketDelete(id),
        conf,
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }


  // endregion


  return {
    // States
    data,
    params,
    headers,
    editDialog,
    editMultipleDialog,
    configByIdDialog,
    deleteDialog,
    acceptDeleting,
    newAgentLimitDialog,

    // Actions
    getAgentLimitDetail,
    closeNewAgentLimitDialog,
    deleteAgentLimit,
    closeEditDialog,
    closeConfigByIdDialog,
    closeDeleteDialog,
    getData,
    setPage,
    setPageSize,
    sortData,
    search,
    add,
    refresh,
    setFilters,
    getAgentsConfigsAll,
    getConfigById,
    postConfigById,
    getPriceTypes,
    getProductsByGroupId,
    setNullMultipleDialog,
    postAgentsConfigsAll,
    getProductGroups,
    getCurrencies
  };
})();
