import { defineStore } from "pinia";
import { APIRoutes } from "~/variable/api-routes";
import { Ref } from "vue";
import { AppResponse } from "~/interfaces/api/app-response";
import { BoxTypeModel } from "~/interfaces/api/box-type-model";
import { AgentModel } from "~/interfaces/api/agent-model";
import { TerritoryModel } from "~~/interfaces/api/territory-model";
import { ClientCategoryModel } from "~~/interfaces/api/client-category-model";
import { Template } from "~/interfaces/ui/template";
import { ListParams } from "~/interfaces/api/list-parameters";
import { useNotification } from "@kyvg/vue3-notification";
import { UnwrapNestedRefs } from "@vue/reactivity";
import { ClientDeviceModel } from "~~/interfaces/api/client-device-model";
import { InventoryTypeModel } from "~~/interfaces/api/inventory-type-model";
import { ClientsModel } from "~~/interfaces/api/clients-model";
import { CancelDeviceModel } from "~~/interfaces/api/cancel-device-model";




export const useClientsEquipmentStore = (tableId: string) => defineStore(`clients_equipment_${tableId}`, () => {
  const { $axios } = useNuxtApp();

  // region States

  const data: Ref<AppResponse<ClientDeviceModel> | undefined> = ref();
  const historyListData: Ref<AppResponse<ClientDeviceModel> | undefined> = ref();

  const params: UnwrapNestedRefs<ListParams> = reactive({
    page: 1,
    pageSize: 10,
    territory: [],
    type: []
  });

  const historyListParams: UnwrapNestedRefs<ListParams> = reactive({
    page: 1,
    pageSize: 10,
    territory: [],
    type: []
  });


  const headers: Ref<Template[]> = ref([
    {
      name: "Тип инвентаря",
      checked: true,
      key: "inventory_name",
      type: "inventoryType",
      thWidth: "120px",
    },
    {
      name: "Название",
      checked: true,
      key: "name",
      type: "name",
      thWidth: "140px",
      bRadius: "8px",
    },
    {
      name: "ID Клиента",
      checked: true,
      key: "visual_id",
      type: "clientId",
      thWidth: "140px",
    },
    {
      name: "Клиента",
      checked: true,
      key: "client_name",
      type: "client",
      thWidth: "100px",
    },
    {
      name: "Тел. клиента",
      checked: true,
      key: "client_phone",
      type: "clientPhone",
      thWidth: "140px",
    },
    {
      name: "Локация",
      checked: true,
      key: "lat_lng",
      type: "location",
      thWidth: "100px",
    },
    {
      name: "Территория",
      checked: true,
      key: "territory",
      type: "territory",
      thWidth: "140px",
    },
    {
      name: "Дата прикрепления",
      checked: true,
      key: "manufacture_date",
      type: "dataAttachment",
      thWidth: "180px",
    },
    {
      name: "Серийный номер",
      checked: true,
      key: "serial_number",
      type: "serialNumber",
      thWidth: "140px",
    },
  ]);

  const inventoryId = ref('')
  const deleteDialog = ref('')
  let acceptDeleting = ref(false)
  let isAlreadyDeleting = false

  const conf = {
    headers: {
      "Authorization": "Bearer " + useCookie("token").value,
      "Content-Type": "application/json",
      "Accept-Language": "ru-RU"
    }
  };

  const getData = async () => {
    await _loadData();
  }

  const getHistoryListData = async () => {
    await _loadHistoryListData();
  }

  const refresh = async () => {
    await _loadData();
  }

  watch(params, async (value, oldValue, onCleanup) => {
    await _loadData();
  });

  watch(historyListParams, async (value, oldValue, onCleanup) => {
    await _loadHistoryListData();
  });;

  const _loadData = async () => {
    try {
      const queryString = Object.entries(params)
        .map(([key, values]) => {
          if (typeof values !== 'object') {
            return `${key}=${values}`;
          } else {
            if (values.length > 0) {
              return `${key}=${values.join(`&${key}=`)}`;
            } else return
          }
        }).filter(query => query).join('&')

      const url = `${APIRoutes.ClientDeviceList}?${queryString}`;

      const response = await $axios.post(url, null, conf);

      if (response.data) {
        data.value = response.data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  const _loadHistoryListData = async () => {
    try {
      const queryString = Object.entries(historyListParams)
        .map(([key, values]) => {
          if (typeof values !== 'object') {
            return `${key}=${values}`;
          } else {
            if (values.length > 0) {
              return `${key}=${values.join(`&${key}=`)}`;
            } else return
          }
        }).filter(query => query).join('&')

      const url = `${APIRoutes.ClientDeviceHistoryList}?${queryString}`;
      const response = await $axios.post(url, null, conf);

      if (response.data) {
        historyListData.value = response.data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  const add = async (value: ClientDeviceModel): Promise<ClientDeviceModel> => {
    const { notify } = useNotification();
    try {
      if (value.id !== undefined) {
        const response = await $axios.put<ClientDeviceModel>(APIRoutes.ClientDeviceUpdate,
          value,
          conf,
        );
        notify({ title: "Инвентарь успешно изменено!", type: "success", });
        return
      }
      const response = await $axios.post<ClientDeviceModel>(APIRoutes.ClientDeviceCreate,
        value,
        conf,
      );
      notify({ title: "Инвентарь успешно добавлено!", type: "success", });
      return response.data
    } catch (error) {
      console.log(error);
      notify({ title: "Ошибка при добавлении инвентаря!", type: "error", });
    }
  }

  const onCancelDevice = async (data: CancelDeviceModel) => {
    const { notify } = useNotification();
    try {
      await $axios.post(APIRoutes.ClientDeviceCancel,
        data,
        conf
      )
      notify({ title: "Инвентарь успешно передано!", type: "success", });
    } catch (error) {
      console.log(error);
      notify({ title: "Ошибка при передачи инвентаря!", type: "error", });
    }
  }

  const getClientDeviceById = async (id: string) => {
    try {
      const { data } = await $axios.get<AppResponse<ClientDeviceModel>>(APIRoutes.ClientDeviceGetById(id),
        conf,
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  const getTerritories = async (params: any) => {
    try {
      const { data } = await $axios.post<AppResponse<TerritoryModel>>(APIRoutes.TerritoriesList,
        params,
        conf
      );
      return data
    } catch (error) {
      console.log(error);
    }
  }

  const getClientCategories = async (params: any) => {
    try {
      const { data } = await $axios.post<AppResponse<ClientCategoryModel>>(APIRoutes.ClientCategoriesList,
        params,
        conf
      );
      return data
    } catch (error) {
      console.log(error);
    }
  }

  const getAgents = async (params: any) => {
    try {
      const { data } = await $axios.post<AppResponse<AgentModel>>(APIRoutes.CommandAgentsList,
        params,
        conf
      );
      return data
    } catch (error) {
      console.log(error);
    }
  }

  const getInventoryTypes = async (params: any) => {
    try {
      const { data } = await $axios.post<AppResponse<InventoryTypeModel>>(APIRoutes.InventoryTypesList,
        params,
        conf
      );
      return data
    } catch (error) {
      console.log(error);
    }
  }

  const getClients = async (params: any) => {
    try {
      const { data } = await $axios.post<AppResponse<ClientsModel>>(APIRoutes.ClientsList,
        params,
        conf
      );
      return data
    } catch (error) {
      console.log(error);
    }
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

  const sortHistoryListData = (data: any) => {
    historyListParams.order_by = data;
  }

  const search = (value: string) => {
    params.page = 1;
    params.search = value;
  }

  const searchFromHistoryList = (value: string) => {
    historyListParams.page = 1;
    historyListParams.search = value;
  }

  const closeDeleteDialog = async () => {
    deleteDialog.value = ''
    await refresh()
  }

  const onDeleteDevice = async () => {

    if (!acceptDeleting.value) return;

    if (isAlreadyDeleting) {
      closeDeleteDialog();
      return;
    }
    isAlreadyDeleting = true

    if (deleteDialog.value) {
      const { notify } = useNotification();
      try {
        const url = `${APIRoutes.ClientDeviceDelete}?id=${deleteDialog.value}`
        await $axios.delete(url, conf)
        notify({ title: "Оборудования успешно удален.", type: "success", });
      }
      catch (e) {
        notify({ title: "Ошибка при удалении оборудования.", type: "error", });
      }
    }

    deleteDialog.value = ''

    isAlreadyDeleting = false

    await _loadData()
  }
  // endregion

  return {
    data,
    historyListData,
    headers,
    params,
    historyListParams,
    inventoryId,
    deleteDialog,
    acceptDeleting,
    getTerritories,
    getClientCategories,
    getAgents,
    getInventoryTypes,
    getClients,
    getData,
    getHistoryListData,
    getClientDeviceById,
    refresh,
    add,
    setPage,
    setPageSize,
    sortData,
    sortHistoryListData,
    search,
    searchFromHistoryList,
    onCancelDevice,
    onDeleteDevice,
    closeDeleteDialog
  };
})();
