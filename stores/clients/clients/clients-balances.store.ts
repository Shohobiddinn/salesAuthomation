import { defineStore } from "pinia";
import { APIRoutes } from "~/variable/api-routes";
import { Ref } from "vue";
import { AppResponse } from "~/interfaces/api/app-response";
import { UnwrapNestedRefs } from "@vue/reactivity";
import { Template } from "~/interfaces/ui/template";
import { ClientPaymentModel } from "~/interfaces/api/clients-model";
import { AgentModel } from "~/interfaces/api/agent-model";
import { ClientsParamsModel } from "~~/interfaces/api/clients-params-model";
import { ClientCategoryModel } from "~~/interfaces/api/client-category-model";
import { TerritoryModel } from "~~/interfaces/api/territory-model";
import { ExpeditorModel } from "~~/interfaces/api/expeditor-model";
import { BalancesModel } from "~~/interfaces/api/balances-model";
import { EmployeesModel } from "~~/interfaces/api/tasks-models";
import { CashboxesModel } from "~~/interfaces/api/cashboxes-model";
import { notify } from "@kyvg/vue3-notification";
import { ClientFinanceBalanceModel } from "~~/interfaces/api/client-finance-balance-model";
import { TermModel } from "~~/interfaces/api/term-model";

export const useClientsBalancesStore = (tableId: string) => {
  return defineStore(`clients_balances_${tableId}`, () => {
    const { $axios } = useNuxtApp();

    // region States

    const data: Ref<AppResponse<ClientFinanceBalanceModel> | undefined> = ref();
    const loading = ref(false);
    const clientsIds = ref([]);

    const params: UnwrapNestedRefs<ClientsParamsModel> = reactive({
      page: 1,
      page_size: 10,
      search: null,
      Agent: [],
      Expeditor: [],
      Territory: [],
      ClientCategory: [],
      IsActive: true,
      TradeDirection: [],
      Type: "",
    });

    const conf = {
      headers: {
        Authorization: "Bearer " + useCookie("token").value,
        "Content-Type": "application/json",
        "Accept-Language": "ru-RU",
      },
    };

    // client data-table header
    const headers: Ref<Template[]> = ref([
      {
        name: "",
        checked: true,
        key: "checkbox",
        type: "checkbox",
        thWidth: "100px",
      },
      {
        name: "ID Клиента",
        checked: true,
        key: "visual_id",
        type: "id",
        thWidth: "120px",
      },
      {
        name: "Клиент",
        checked: true,
        key: "client_name",
        type: "client",
        thWidth: "140px",
        bRadius: "8px",
      },
      {
        name: "Юр. название",
        checked: true,
        key: "comany_name",
        type: "company_name",
        thWidth: "140px",
        bRadius: "8px",
      },
      {
        name: "ИНН",
        checked: true,
        key: "inn",
        type: "inn",
        thWidth: "140px",
      },
      {
        name: "Территория",
        checked: true,
        key: "territory_name",
        type: "territory",
        thWidth: "140px",
      },
      {
        name: "Телефон",
        checked: true,
        key: "phone",
        type: "phone",
        thWidth: "120px",
      },
      {
        name: "Срок",
        checked: true,
        key: "term_date",
        type: "term",
        thWidth: "100px",
      },
      {
        name: "Дни просрочки",
        checked: true,
        key: "delayed_days",
        type: "dayOfDelay",
        thWidth: "160px",
      },
      {
        name: "Дата последней оплаты",
        checked: true,
        key: "last_payment_date",
        type: "last_payment_date",
        thWidth: "200px",
      },
      {
        name: "Дни с последней оплаты",
        checked: true,
        key: "days_since_last_payment",
        type: "days_since_last_payment",
        thWidth: "200px",
      },
      {
        name: "Общий",
        checked: true,
        key: "total_balance",
        type: "total_balance",
        thWidth: "120px",
        bgHeader: "#e1e1e1",
      },
    ]);
    // end client data-table header

    // client data-table header functions
    watch(params, async (value, oldValue, onCleanup) => {
      await _loadData();
    });

    const getData = async () => {
      await _loadData();
    };

    const refresh = async () => {
      await _loadData();
    };

    const _loadData = async () => {
      try {
        loading.value = true;
        const queryString = Object.entries(params)
          .map(([key, values]) => {
            if (typeof values !== "object") {
              return `${key}=${values}`;
            } else {
              if (values?.length > 0) {
                return `${key}=${values.join(`&${key}=`)}`;
              } else return;
            }
          })
          .filter((query) => query)
          .join("&");

        const url = `${APIRoutes.ClientBalance}?${queryString}`;

        const response = await $axios.get<
          AppResponse<ClientFinanceBalanceModel>
        >(url, conf);
        if (response.data) {
          data.value = response.data;
        }
        loading.value = false;
      } catch (error) {
        console.log(error);
      }
    };

    const setPage = (page: number) => {
      params.page = page;
    };

    const setPageSize = (pageSize: number) => {
      params.page_size = pageSize;
    };

    const sortData = (data: any) => {
      params.order_by = data;
    };

    const search = (value: string) => {
      params.page = 1;
      params.search = value;
    };
    // end client data-table header functions

    // actions
    const onCreatePaymentList = async (data: ClientPaymentModel) => {
      try {
        await $axios.post(APIRoutes.ClientsPaymentCreate, data, conf);
        await refresh();
        notify({ title: "Сохранено!", type: "success" });
      } catch (error) {
        notify({ title: "Ошибка при сохранении!", type: "error" });
        console.log(error);
      }
    };

    const onChangeTerm = async (data: TermModel) => {
      try {
        await $axios.patch(APIRoutes.ClientCahngeTerm, data, conf);
        await refresh()
        notify({ title: "Сохранено!", type: "success" });
      } catch (error) {
        notify({ title: "Ошибка при сохранении!", type: "error" });
        console.log(error);
      }
    };

    const setNullMultipleDialog = async () => {
      clientsIds.value = [];
    };

    const getClientsTotalBalances = async () => {
      try {
        const { data } = await $axios.get<BalancesModel[] | []>(
          APIRoutes.ClientsTotalBalances,
          conf
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    };

    const getTerritories = async (params: any) => {
      try {
        const { data } = await $axios.post<AppResponse<TerritoryModel>>(
          APIRoutes.TerritoriesList,
          params,
          conf
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    };

    const getAgents = async (params: any) => {
      try {
        const { data } = await $axios.post<AppResponse<AgentModel>>(
          APIRoutes.CommandAgentsList,
          params,
          conf
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    };

    const getClientCategories = async (params: any) => {
      try {
        const { data } = await $axios.post<AppResponse<ClientCategoryModel>>(
          APIRoutes.ClientCategoriesList,
          params,
          conf
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    };

    const getExpeditors = async (params: any) => {
      try {
        const { data } = await $axios.post<AppResponse<ExpeditorModel>>(
          APIRoutes.ExpeditorList,
          params,
          conf
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    };

    const getTradeDirections = async (params: any) => {
      try {
        const { data } = await $axios.post<AppResponse<TradeDirectionsModel>>(
          APIRoutes.TradeDirectionsList,
          params,
          conf
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    };

    const getEmployedAgents = async () => {
      if (!clientsIds.value.length) return;
      try {
        let queryString = clientsIds.value.join("&clientIds=");
        let url = `${APIRoutes.ClientsIdAgents}?clientIds=${queryString}`;
        const { data } = await $axios.get<EmployeesModel>(url, conf);
        return data;
      } catch (error) {
        console.log(error);
      }
    };

    const getEmployedExpeditors = async () => {
      if (!clientsIds.value.length) return;
      try {
        let queryString = clientsIds.value.join("&clientIds=");
        let url = `${APIRoutes.ClientsIdExpeditors}?clientIds=${queryString}`;
        const response = await $axios.get<EmployeesModel>(url, conf);
        return response.data;
      } catch (error) {
        console.log(error);
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
        console.log(error);
      }
    };

    const getCurrencies = async (params: any) => {
      try {
        const { data } = await $axios.post<AppResponse<CurrencyModel>>(
          APIRoutes.CurrencyList,
          params,
          conf
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    };

    // endregion

    return {
      data,
      loading,
      params,
      headers,
      clientsIds,
      getData,
      setPage,
      setPageSize,
      sortData,
      search,
      onCreatePaymentList,
      onChangeTerm,
      refresh,
      getExpeditors,
      getTerritories,
      getClientCategories,
      getAgents,
      getTradeDirections,
      getClientsTotalBalances,
      setNullMultipleDialog,
      getCashboxes,
      getEmployedAgents,
      getEmployedExpeditors,
      getCurrencies,
    };
  })();
};
