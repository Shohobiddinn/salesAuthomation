import { defineStore } from "pinia";
import { APIRoutes } from "~/variable/api-routes";
import { Ref } from "vue";
import { AppResponse } from "~/interfaces/api/app-response";
import { ListParams } from "~/interfaces/api/list-parameters";
import { UnwrapNestedRefs } from "@vue/reactivity";
import { Template } from "~/interfaces/ui/template";
import { InitialBalanceModel } from "~~/interfaces/api/initial-balance-model";
import { ClientsModel } from "~~/interfaces/api/clients-model";
import { AgentModel } from "~~/interfaces/api/agent-model";
import { LibraryConstantsModel } from "~~/interfaces/api/library-constants-model";
import { CashboxesModel } from "~~/interfaces/api/cashboxes-model";
import { ExpeditorModel } from "~~/interfaces/api/expeditor-model";
import { CurrencyModel } from "~~/interfaces/api/currency-model";
import { useNotification } from "@kyvg/vue3-notification";
import { TradeDirectionsModel } from "~~/interfaces/api/trade-directions-model";


export const useClientsInitialBalanceStore = (tableId: string) => defineStore(`initialBalance_${tableId}`, () => {
  const { $axios } = useNuxtApp();

  const data: Ref<AppResponse<InitialBalanceModel> | undefined> = ref()
  const detail: object = ref({})
  const params: UnwrapNestedRefs<ListParams> = reactive({
    page: 1,
    page_size: 10,
    search: null,
    order_by: {
      field: "created_date",
      is_asc: true,
    },
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
      name: "",
      checked: true,
      key: "checkbox",
      type: "checkbox",
      thWidth: "120px",
    },
    {
      name: "Дата создания",
      checked: true,
      key: "created_date",
      type: "dateCreation",
      thWidth: "140px",
    },
    {
      name: "Клиент",
      checked: true,
      key: "client_name",
      type: "clients",
      thWidth: "120px",
      bRadius: "8px",
    },
    {
      name: "Агент",
      checked: true,
      key: "agent_name",
      type: "agents",
      thWidth: "120px",
    },
    {
      name: "Направление торговли",
      checked: true,
      key: "trade_direction_name",
      type: "directionTrade",
      thWidth: "220px",
    },
    {
      name: "Касса",
      checked: true,
      key: "cash_box_name",
      type: "cashRegister",
      thWidth: "120px",
    },
    {
      name: "Тип остатки",
      checked: true,
      key: "type_name",
      type: "typeResidues",
      thWidth: "120px",
    },
    {
      name: "Тип оплаты",
      checked: true,
      key: "currency_name",
      type: "paymentType",
      thWidth: "120px",
    },
    {
      name: "Сумма",
      checked: true,
      key: "payment_amount",
      type: "amount",
      thWidth: "120px",
    },
  ]);
  const loading = ref(false)
  const sale = ref([])
  const purchase = ref([])
  const priceList = ref([])
  const products = ref([]) as any
  const isLoading = ref(false);

  watch(params, async (value, oldValue, onCleanup) => {
    try {
      loading.value = true;
      await _loadData();
    } catch (error) {

    } finally {
      loading.value = false
    }
  });

  const getData = async (type: boolean) => {
    params.search === "" ? await _loadData() : params.search = ""
  }

  const _loadData = async () => {
    isLoading.value = true
    try {
      const response = await $axios.post<AppResponse<InitialBalanceModel>>(APIRoutes.DashboardInitialBalanceList,
        params,
        conf,
      );
      if (response.data) {
        data.value = response.data;
      }
    } catch (error) {
      console.error(error);
    }
    isLoading.value = false

  }

  const add = async (value: InitialBalanceModel) => {
    try {
      if (value.id !== undefined) {
        const response = await $axios.put<InitialBalanceModel>(APIRoutes.DashboardInitialBalance,
          value,
          conf,
        );
        return response.data;
      }
      const response = await $axios.post<InitialBalanceModel>(APIRoutes.DashboardInitialBalance,
        value,
        conf,
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }

  }

  const getDetail = async (id: any) => {
    try {
      const { data } = await $axios.get<InitialBalanceModel>(APIRoutes.DashboardInitialBalanceId(id),
        conf,
      );
      if (data) {
        detail.value = data
      }
      return data
    } catch (error) {
      console.error(error);
    }
  }

  const deleteItem = async (id: any) => {
    const { notify } = useNotification();
    try {
      const url = `${APIRoutes.DashboardInitialBalance}?id=${id}`
      const { data } = await $axios.delete(url, conf)
      notify({ title: "Оплаты клиентов успешно удален.", type: "success", });
      await _loadData();
      return data
    } catch (error) {
      console.error(error);
    }
  }

  const refresh = async () => {
    await _loadData();
  }

  const getAgents = async (param: any) => {
    try {
      const { data } = await $axios.post<AppResponse<AgentModel>>(
        APIRoutes.CommandAgentsList,
        param,
        conf
      );
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const getClients = async (param: any) => {
    try {
      const { data } = await $axios.post<AppResponse<ClientsModel>>(APIRoutes.ClientsList,
        param,
        conf
      );
      return data
    } catch (error) {
      console.error(error);
    }
  }

  const getPriceTypes = async (param: any) => {
    try {
      const { data } = await $axios.post<AppResponse<CurrencyModel>>(APIRoutes.CurrencyList,
        param,
        conf,
      );
      return data
    } catch (error) {
      console.error(error);
    }
  }

  const getExpeditors = async (param: any) => {
    try {
      const { data } = await $axios.post<AppResponse<ExpeditorModel>>(
        APIRoutes.ExpeditorList,
        param,
        conf
      );
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const getCashboxes = async () => {
    try {
      const { data } = await $axios.get<CashboxesModel>(
        APIRoutes.Cashboxes,
        conf
      );
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const getRemainders = async () => {
    try {
      const { data } = await $axios.get<LibraryConstantsModel>(
        APIRoutes.LibraryConstants,
        conf
      );
      if (data.InitialBalancePaymentType) {
        return data.InitialBalancePaymentType;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getTradeDirections = async (param: any) => {
    try {
      const { data } = await $axios.post<AppResponse<TradeDirectionsModel>>(
        APIRoutes.TradeDirectionsList,
        param,
        conf
      );
      return data;
    } catch (error) {
      console.error(error);
    }
  };

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
  return {
    data,
    params,
    templates,
    purchase,
    sale,
    priceList,
    products,
    loading,
    isLoading,
    detail,

    getData,
    setPage,
    setPageSize,
    sortData,
    search,
    add,
    refresh,
    getAgents,
    getClients,
    getPriceTypes,
    getExpeditors,
    getCashboxes,
    getRemainders,
    getDetail,
    deleteItem,
    getTradeDirections
  };
})();
