import { defineStore } from "pinia";
import { Ref } from "vue";
import { AppResponse } from "~/interfaces/api/app-response";
import { Template } from "~/interfaces/ui/template";
import { APIRoutes } from "~/variable/api-routes";
import { useNotification } from "@kyvg/vue3-notification";
import { AgentPacketModel } from "~/interfaces/api/agent-packet-model";
import { LimitTypeModel } from "~/interfaces/api/limit-type-model";
import { LimitProductModel } from "~~/interfaces/api/limit-product-model";
import { AgentLimitModel } from "~~/interfaces/api/agent-limit-model";



export const useAssignmentProductsStore = (tableId: string) => defineStore(`command_assignment_products_${tableId}`, () => {
  const { $axios } = useNuxtApp();

  // region States

  const data: Ref<AppResponse<AgentLimitModel> | undefined> = ref();

  const params = reactive({
    page: 1,
    page_size: 10
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
      name: "Агенты",
      checked: true,
      key: "agent",
      thWidth: '180px',
      isComputable: true
    },
    {
      name: "Ограничении",
      checked: true,
      key: "limit",
      thWidth: '120px'
    },
    {
      name: "Количество",
      checked: true,
      key: "quantity",
      thWidth: '120px'
    },
    {
      name: "Тип",
      checked: true,
      key: "type",
      thWidth: '120px'
    },
  ]);

  const editLimit = ref('')
  const createLimit = ref('')
  const editMultipleDialog = ref([])
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
    try {
      const response = await $axios.get<AppResponse<AgentLimitModel>>(`${APIRoutes.CommandAgentsLimit}?page=${params.page}&pageSize=${params.page_size}`,
        conf,
      );
      data.value = response.data

    } catch (error) {
      console.log(error);
    }
  }

  const onSave = async (data: any) => {
    const { notify } = useNotification();
    try {
      await $axios.post(APIRoutes.CommandAgentsPostLimit, data, conf)
      notify({ title: "Успешно сохранено.", type: "success", });
    } catch (error) {
      notify({ title: "Ошибка при сохранении.", type: "error", });
      console.log(error);
    }
  }

  const setNullMultipleDialog = async () => {
    editMultipleDialog.value = []
  }

  const setPage = (page: number) => {
    params.page = page;
  }

  const setPageSize = (pageSize: number) => {
    params.page_size = pageSize;
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
        const url = `${APIRoutes.CommandAgentsLimitsDelete}?limitId=${deleteDialog.value}`
        await $axios.delete(url, conf)
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

  const getAssignmentDetail = async (id: string) => {
    try {
      const { data } = await $axios.get<AgentPacketModel>(APIRoutes.CommandAgentsPaketDelete(id),
        conf,
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  const getProductCategories = async (params: any) => {
    try {
      const { data } = await $axios.post(APIRoutes.ProductsCategoryList, params, conf)
      return data
    } catch (error) {
      console.log(error);
    }
  }


  const getWarehouses = async (params: any) => {
    try {
      const { data } = await $axios.post(APIRoutes.WarehousesList, params, conf)
      return data
    } catch (error) {
      console.log(error);
    }
  }

  const getLimitTypes = async () => {
    try {
      const { data } = await $axios.get<LimitTypeModel>(APIRoutes.CommandAgentLimitTypes, conf)
      return data
    } catch (error) {
      console.log(error);
    }
  }

  const getLimitsProducts = async (warehouseId: string, categoryId: string) => {
    try {
      const { data } = await $axios.get<LimitProductModel>(`${APIRoutes.CommandAgentsLimitProducts}?warehouseId=${warehouseId}&categoryId=${categoryId}`, conf)
      return data
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
    editLimit,
    createLimit,
    deleteDialog,
    acceptDeleting,
    newAgentLimitDialog,
    editMultipleDialog,

    // Actions
    getAssignmentDetail,
    deleteAgentLimit,
    closeDeleteDialog,
    getData,
    setPage,
    setPageSize,
    onSave,
    refresh,
    getProductCategories,
    getWarehouses,
    getLimitTypes,
    getLimitsProducts,
    setNullMultipleDialog
  };
})();
