import { defineStore } from "pinia";
import { APIRoutes } from "~/variable/api-routes";
import { Ref } from "vue";
import { AppResponse } from "~/interfaces/api/app-response";
import { ListParams2 } from "~/interfaces/api/list-parameters";
import { UnwrapNestedRefs } from "@vue/reactivity";
import { Template } from "~/interfaces/ui/template";
import { CurrencyModel } from "~~/interfaces/api/currency-model";
import { DebtBalanceModel } from "~~/interfaces/api/debt-balance-model";
import { ClientsDebtsModel } from "~~/interfaces/api/clients-debts-model";
import { ClientReportFinanceModel } from "~~/interfaces/api/clients-report-finance-model";
import { useNotification } from "@kyvg/vue3-notification";
import { CashboxesModel } from "~~/interfaces/api/cashboxes-model";
import { AgentModel } from "~~/interfaces/api/agent-model";
import { EmployeesModel } from "~~/interfaces/api/tasks-models";
import { ClientPaymentModel } from "~~/interfaces/api/clients-model";

export const useClientsDebtsStore = (tableId: string) => {
  return defineStore(`clients_debts_${tableId}`, () => {
    const { $axios } = useNuxtApp();

    // region States

    const dataOfMainTable: Ref<AppResponse<ClientsDebtsModel> | undefined> = ref();
    const dataOfReportTable: Ref<AppResponse<ClientReportFinanceModel> | undefined> = ref();
    const loadingMainTable = ref(false);
    const loadingReportTable = ref(false)

    const paramsOfMainTable: UnwrapNestedRefs<ListParams2> = reactive({
      page: 1,
      pageSize: 10,
      clientId: ''
    });

    const paramsOfReportTable: UnwrapNestedRefs<ListParams2> = reactive({
      clientId: '',
      Page: 1,
      PageSize: 10,
      Search: '',
      OrderBy: {
        field: "price_type",
        is_asc: true,
      }
    });

    const conf = {
      headers: {
        Authorization: "Bearer " + useCookie("token").value,
        "Content-Type": "application/json",
        "Accept-Language": "ru-RU",
      },
    };

    const headersOfMainTable: Ref<Template[]> = ref([
      {
        name: "Дата",
        checked: true,
        key: "date",
        thWidth: "140px",
        type: 'come'
      },
      {
        name: "Тип",
        checked: true,
        key: "type",
        thWidth: "80px",
        type: 'come'
      },
      {
        name: "Долг",
        checked: true,
        key: "debt",
        thWidth: "100px",
        type: 'come'
      },
      {
        name: "Оплачено",
        checked: true,
        key: "income",
        thWidth: "140px",
        type: 'come'
      },
      {
        name: "Комментарии",
        checked: true,
        key: "comment",
        thWidth: "140px",
        type: 'come'
      },
    ]);

    const headersOfReportTable: Ref<Template[]> = ref([
      {
        name: "Тип",
        checked: true,
        key: "price_type",
        thWidth: "80px",
      },
      {
        name: "Продажа",
        checked: true,
        key: "sold",
        thWidth: "140px",
      },
      {
        name: "Оплата",
        checked: true,
        key: "paid",
        thWidth: "100px",
      },
      {
        name: "Сальдо",
        checked: true,
        key: "saldo",
        thWidth: "140px",
      },
    ])

    // endregion

    // main table functions

    watch(paramsOfMainTable, async (value, oldValue, onCleanup) => {
      loadingMainTable.value = true;
      await _loadDataMainTable();
      loadingMainTable.value = false;
    });

    const refreshMainTable = async () => {
      loadingMainTable.value = true;
      await _loadDataMainTable();
      loadingMainTable.value = false;
    };

    const _loadDataMainTable = async () => {
      try {
        const queryString = Object.entries(paramsOfMainTable)
          .map(([key, values]) => {
            if (typeof values !== 'object') {
              return `${key}=${values}`;
            } else {
              return Object.entries(values)
                .map(([subKey, subValue]) => `${key}.${subKey}=${subValue}`)
                .join('&');
            }
          })
          .filter(query => query !== null)
          .join('&');

        const url = `${APIRoutes.ClientDebtsById}?${queryString}`;

        const response = await $axios.get<AppResponse<ClientsDebtsModel>>(url, conf);
        dataOfMainTable.value = response.data;

      } catch (error) {
        console.log(error);
      }
    };

    const getDataMainTable = async () => {
      await _loadDataMainTable();
    };

    const setPageToMain = (page: number) => {
      paramsOfMainTable.page = page;
    };

    const setPageSizeToMain = (pageSize: number) => {
      paramsOfMainTable.pageSize = pageSize;
    };

    const searchFromMain = (value: string) => {
      paramsOfMainTable.page = 1;
      paramsOfMainTable.search = value;
    };

    // end main table functions

    // reports table functions

    watch(paramsOfReportTable, async (value, oldValue, onCleanup) => {
      loadingReportTable.value = true;
      await _loadDataReportTable();
      loadingReportTable.value = false;
    });

    const refreshReportTable = async () => {
      loadingReportTable.value = true;
      await _loadDataReportTable();
      loadingReportTable.value = false;
    };

    const _loadDataReportTable = async () => {
      try {
        const queryString = Object.entries(paramsOfReportTable)
          .map(([key, values]) => {
            if (typeof values !== 'object') {
              return `${key}=${values}`;
            } else {
              return Object.entries(values)
                .map(([subKey, subValue]) => `${key}.${subKey}=${subValue}`)
                .join('&');
            }
          })
          .filter(query => query !== null)
          .join('&');

        const url = `${APIRoutes.ClientsIdDebtFinanceReport}?${queryString}`;

        const response = await $axios.get<AppResponse<ClientReportFinanceModel>>(url, conf);
        dataOfReportTable.value = response.data;

      } catch (error) {
        console.log(error);
      }
    };

    const getDataReportTable = async () => {
      await _loadDataMainTable();
    };

    const setPageToReport = (page: number) => {
      paramsOfReportTable.Page = page;
    };

    const setPageSizeToReport = (pageSize: number) => {
      paramsOfReportTable.PageSize = pageSize;
    };

    const searchFromReport = (value: string) => {
      paramsOfReportTable.Page = 1;
      paramsOfReportTable.Search = value;
    };

    const sortReportTableData = (data: any) => {
      paramsOfReportTable.OrderBy = data;
    }

    // end report table functions


    // additional functions

    const getPriceTypes = async (params: any) => {
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

    const getDebtBalances = async () => {
      try {
        const { data } = await $axios.get<AppResponse<DebtBalanceModel>>(`${APIRoutes.ClientsIdDebtBalance}?clientId=${paramsOfMainTable.clientId}`,
          conf,
        );
        return data
      } catch (error) {
        console.log(error);
      }
    }

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

    const getEmployedAgents = async (clientsIds: string[]) => {
      if (!clientsIds.length) return;
      try {
        let queryString = clientsIds.join("&clientIds=");
        let url = `${APIRoutes.ClientsIdAgents}?clientIds=${queryString}`;
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

    const createPayment = async (data: ClientPaymentModel) => {
      const { notify } = useNotification();
      try {
        await $axios.post(APIRoutes.ClientsPaymentCreateGroup, data, conf)
        notify({ title: "Cохранено!", type: "success" });
        await refreshMainTable()
      } catch (error) {
        notify({ title: "Ошибка!", type: "error" });
        console.log(error);
      }
    }

    const getClientPaymentInfo = async (debtId: string) => {
      try {
        const { data } = await $axios.get<ClientPaymentModel>(APIRoutes.ClientPaymentInfoById(debtId), conf)
        return data
      } catch (error) {
        console.log(error);
      }
    }

    // endregion

    return {
      dataOfMainTable,
      dataOfReportTable,
      paramsOfMainTable,
      paramsOfReportTable,
      headersOfMainTable,
      headersOfReportTable,
      loadingMainTable,
      loadingReportTable,
      getDataMainTable,
      getDataReportTable,
      refreshMainTable,
      setPageToMain,
      setPageSizeToMain,
      setPageToReport,
      setPageSizeToReport,
      searchFromMain,
      searchFromReport,
      getPriceTypes,
      getDebtBalances,
      refreshReportTable,
      sortReportTableData,
      getCashboxes,
      getAgents,
      getEmployedAgents,
      createPayment,
      getClientPaymentInfo
    };
  })();
};
