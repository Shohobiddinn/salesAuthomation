import { defineStore } from "pinia";
import { APIRoutes } from "~/variable/api-routes";
import { Ref } from "vue";
import { AppResponse } from "~/interfaces/api/app-response";
import { ListParams } from "~/interfaces/api/list-parameters";
import { UnwrapNestedRefs } from "@vue/reactivity";
import { Template } from "~/interfaces/ui/template";
import { ClientsModel } from "~~/interfaces/api/clients-model";
import { CurrencyModel } from "~~/interfaces/api/currency-model";
import { TradeDirectionsModel } from "~~/interfaces/api/trade-directions-model";

export const useDashboardClientsActRecStore = (tableId: string) =>
  defineStore(`actReconcilition_${tableId}`, () => {
    const { $axios } = useNuxtApp();

    // const data: Ref<AppResponse<InitialBalanceModel> | undefined> = ref()
    const isLoading = ref(false);
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
          value: [],
        },
      ],
    });

    const conf = {
      headers: {
        Authorization: "Bearer " + useCookie("token").value,
        "Content-Type": "application/json",
        "Accept-Language": "ru-RU",
      },
    };

    const templates: Ref<Template[]> = ref([
      {
        name: "ID оплаты",
        checked: true,
        key: "idPayment",
        type: "come",
        thWidth: "100px",
        bRadius: "8px",
      },
      {
        name: "Направление торговли",
        checked: true,
        key: "directionTrade",
        type: "come",
        thWidth: "170px",
      },
      {
        name: "Тип",
        checked: true,
        key: "type",
        type: "come",
        thWidth: "300px",
      },
      {
        name: "Тип",
        checked: true,
        key: "type1",
        type: "come",
        thWidth: "80px",
      },
      {
        name: "Кредит (оплата)",
        checked: true,
        key: "creditPayment",
        type: "come",
        thWidth: "140px",
      },
      {
        name: "Комментарии",
        checked: true,
        key: "come",
        type: "come",
        thWidth: "180px",
      },
    ]);

    watch(params, async (value, oldValue, onCleanup) => {
      try {
        isLoading.value = true;
        await _loadData();
      } catch (error) {
      } finally {
        isLoading.value = false;
      }
    });

    const getData = async (type: boolean) => {
      params.search === "" ? await _loadData() : (params.search = "");
    };

    const _loadData = async () => {
      isLoading.value = true;
      try {
        const response = await $axios.post(
          APIRoutes.DashboardInitialBalanceList,
          params,
          conf
        );
        if (response.data) {
          // data.value = response.data;
        }
      } catch (error) {
        console.error(error);
      }
      isLoading.value = false;
    };

    const send = async (
      value: InitialBalanceModel
    ): Promise<InitialBalanceModel | undefined> => {
      try {
        // const response = await $axios.post(APIRoutes.DashboardInitialBalance,
        //     value,
        //     conf,
        // );
        return response.data;
      } catch (error) {
        console.error(error);
      }
    };

    const getClients = async (
      param: any
    ): Promise<AppResponse<ClientsModel> | undefined> => {
      try {
        const { data } = await $axios.post(APIRoutes.ClientsList, param, conf);
        return data;
      } catch (error) {
        console.error(error);
      }
    };

    const getPriceTypes = async (
      param: any
    ): Promise<AppResponse<CurrencyModel> | undefined> => {
      try {
        const { data } = await $axios.post(APIRoutes.CurrencyList, param, conf);
        return data;
      } catch (error) {
        console.error(error);
      }
    };

    const getTradeDirections = async (
      param: any
    ): Promise<AppResponse<TradeDirectionsModel> | undefined> => {
      try {
        const { data } = await $axios.post(APIRoutes.TradeDirectionsList, param, conf);
        return data;
      } catch (error) {
        console.error(error);
      }
    };

    const setPage = (page: number) => {
      params.page = page;
    };

    const setPageSize = (pageSize: number) => {
      params.page_size = pageSize;
    };

    const sortData = (data: any) => {
      if (data.field === "checkbox") return;
      params.order_by = data;
    };

    const search = (value: string) => {
      params.page = 1;
      params.search = value;
    };

    return {
      // data,
      params,
      templates,
      isLoading,

      getData,
      setPage,
      setPageSize,
      sortData,
      search,
      getClients,
      getPriceTypes,
      getTradeDirections,
      send,
    };
  })();
