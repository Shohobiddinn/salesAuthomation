import { defineStore } from "pinia";
import { APIRoutes } from "~/variable/api-routes";
import { Ref } from "vue";
import { AppResponse } from "~/interfaces/api/app-response";
import { UnwrapNestedRefs } from "@vue/reactivity";
import { Template } from "~/interfaces/ui/template";
import { ClientsModel } from "~/interfaces/api/clients-model";
import { AgentModel } from "~/interfaces/api/agent-model";
import { ClientsParamsModel } from "~~/interfaces/api/clients-params-model";
import { ClientCategoryModel } from "~~/interfaces/api/client-category-model";
import { TerritoryModel } from "~~/interfaces/api/territory-model";
import { ClientTypeModel } from "~~/interfaces/api/client-type-model";
import { ProductCategoryModel } from "~~/interfaces/api/product-category-model";
import { SallesChannelsModel } from "~~/interfaces/api/salles-channels-model";
import { CurrencyModel } from "~~/interfaces/api/currency-model";
import { ExpeditorModel } from "~~/interfaces/api/expeditor-model";
import { AuditorModel } from "~~/interfaces/api/auditor-model";
import { PriceTypesModels } from "~~/interfaces/api/price-types-models";
import { InventoryTypeModel } from "~~/interfaces/api/inventory-type-model";
import { useNotification } from "@kyvg/vue3-notification";
import { EmployeesModel } from "~~/interfaces/api/tasks-models";
import { ClientDetailModel } from "~~/interfaces/api/client-detail-model";
import { ClientsProductsModel } from "~~/interfaces/api/clients-products-model";
import { ClientLocationHistoryModel } from "~~/interfaces/api/client-location-history-model";

export const useClientsStore = (tableId: string) => {
  return defineStore(`clients${tableId}`, () => {
    const { $axios } = useNuxtApp();

    // region States

    const data: Ref<AppResponse<ClientsModel> | undefined> = ref();

    const params: UnwrapNestedRefs<ClientsParamsModel> = reactive({
      page: 1,
      page_size: 10,
      search: null,
      agent: [],
      territory: [],
      client_category: [],
      price_type: [],
      day: [],
      expeditor: [],
      is_active: true,
      location: null,
      inn: null,
      device: [],
    });

    const clients = ref() as any;

    const clientsIds = ref([]);

    const conf = {
      headers: {
        Authorization: "Bearer " + useCookie("token").value,
        "Content-Type": "application/json",
        "Accept-Language": "ru-RU",
      },
    };

    // group-process functions
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

    const getEmployedExpeditors = async (clientsIds: string[]) => {
      if (!clientsIds.length) return;
      try {
        let queryString = clientsIds.join("&clientIds=");
        let url = `${APIRoutes.ClientsIdExpeditors}?clientIds=${queryString}`;
        const response = await $axios.get<EmployeesModel>(url, conf);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    };

    const getEmployedAuditors = async (clientsIds: string[]) => {
      if (!clientsIds.length) return;
      try {
        let queryString = clientsIds.join("&clientIds=");
        let url = `${APIRoutes.ClientsIdAuditors}?clientIds=${queryString}`;
        const response = await $axios.get<EmployeesModel>(url, conf);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    };

    const getClientsSalesChannel = async (clientsIds: string[]) => {
      if (!clientsIds.length) return;
      try {
        let queryString = clientsIds.join("&clientIds=");
        let url = `${APIRoutes.ClientsIdSalesChannel}?clientIds=${queryString}`;
        const response = await $axios.get<EmployeesModel>(url, conf);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    };

    const getClientsCategoryAndTerritories = async (clientsIds: string[]) => {
      if (!clientsIds.length) return;
      try {
        let queryString = clientsIds.join("&clientIds=");
        let url = `${APIRoutes.ClientsIdCategoryTerritories}?clientIds=${queryString}`;
        const response = await $axios.get<EmployeesModel>(url, conf);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    };

    const getClientsPriceTypes = async (clientsIds: string[]) => {
      if (!clientsIds.length) return;
      try {
        let queryString = clientsIds.join("&clientIds=");
        let url = `${APIRoutes.ClientsIdPriceTypes}?clientIds=${queryString}`;
        const response = await $axios.get<EmployeesModel>(url, conf);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    };

    const saveAttachClientsAgents = async (agents: any) => {
      const { notify } = useNotification();
      try {
        await $axios.put<ClientsModel>(
          APIRoutes.ClientsAttachAgentsPut,
          agents,
          conf
        );
        notify({ title: "Cохранено!", type: "success" });
      } catch (error) {
        notify({ title: "Ошибка!", type: "error" });
        console.log(error);
      }
    };

    const saveAttachClientsExpeditors = async (expeditors: any) => {
      const { notify } = useNotification();
      try {
        await $axios.put<ClientsModel>(
          APIRoutes.ClientsAttachExpeditorsPut,
          expeditors,
          conf
        );
        notify({ title: "Cохранено!", type: "success" });
      } catch (error) {
        notify({ title: "Ошибка!", type: "error" });
        console.log(error);
      }
    };

    const saveAttachClientsAuditors = async (auditors: any) => {
      const { notify } = useNotification();
      try {
        await $axios.put<ClientsModel>(
          APIRoutes.ClientsAttachAuditorsPut,
          auditors,
          conf
        );
        notify({ title: "Cохранено!", type: "success" });
      } catch (error) {
        notify({ title: "Ошибка!", type: "error" });
        console.log(error);
      }
    };

    const saveAttachSalesChannel = async (channels: any) => {
      const { notify } = useNotification();
      try {
        await $axios.put<ClientsModel>(
          APIRoutes.ClientsAttachSalesChannel,
          channels,
          conf
        );
        notify({ title: "Cохранено!", type: "success" });
      } catch (error) {
        notify({ title: "Ошибка!", type: "error" });
        console.log(error);
      }
    };

    const saveAttachCategoryTerritories = async (
      categoriesAndTerritories: any
    ) => {
      const { notify } = useNotification();
      try {
        await $axios.put<ClientsModel>(
          APIRoutes.ClientsAttachCategoryTerritories,
          categoriesAndTerritories,
          conf
        );
        notify({ title: "Cохранено!", type: "success" });
      } catch (error) {
        notify({ title: "Ошибка!", type: "error" });
        console.log(error);
      }
    };

    const saveAttachPriceTypes = async (priceTypes: any) => {
      const { notify } = useNotification();
      try {
        await $axios.put<ClientsModel>(
          APIRoutes.ClientsAttachPriceType,
          priceTypes,
          conf
        );
        notify({ title: "Cохранено!", type: "success" });
      } catch (error) {
        notify({ title: "Ошибка!", type: "error" });
        console.log(error);
      }
    };
    // end group-process functions

    const setNullMultipleDialog = async () => {
      clientsIds.value = [];
    };

    // client data-table header
    const templates: Ref<Template[]> = ref([
      {
        name: "",
        checked: true,
        key: "checkbox",
        type: "checkbox",
        thWidth: "100px",
      },
      {
        name: "ID",
        checked: true,
        key: "visual_id",
        type: "id",
        thWidth: "140px",
      },
      {
        name: "Названия",
        checked: true,
        key: "name",
        type: "name",
        thWidth: "140px",
        bRadius: "8px",
      },
      {
        name: "Название фирмы",
        checked: true,
        key: "company_name",
        type: "company_name",
        thWidth: "140px",
      },
      {
        name: "Тел номер",
        checked: true,
        key: "phone",
        type: "phone",
        thWidth: "140px",
      },
      {
        name: "Категория",
        checked: true,
        key: "category",
        type: "category",
        thWidth: "140px",
      },
      {
        name: "Агент",
        checked: true,
        key: "agents",
        type: "agents",
        thWidth: "140px",
      },
      {
        name: "День",
        checked: true,
        key: "visit_days",
        type: "day",
        thWidth: "70px",
      },
      {
        name: "Территория",
        checked: true,
        key: "territory",
        type: "territory",
        thWidth: "140px",
      },
      {
        name: "Ориентир",
        checked: true,
        key: "address",
        type: "address",
        thWidth: "140px",
      },
      {
        name: "Aктивный ",
        checked: true,
        key: "is_active",
        type: "is_active",
        thWidth: "140px",
      },
    ]);
    // end client data-table header

    // client data-table header functions
    watch(params, async (value, oldValue, onCleanup) => {
      await _loadData();
    });

    const getData = async (type: boolean) => {
      await _loadData();
    };

    const refresh = async () => {
      await _loadData();
    };

    const _loadData = async () => {
      const response = await $axios.post<AppResponse<ClientsModel>>(
        APIRoutes.ClientsList,
        params,
        conf
      );
      if (response.data) {
        data.value = response.data;
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
    const getWithId = async (id: any) => {
      const response = await $axios.get<ClientsModel>(
        APIRoutes.ClientsWithId(id!.toString()),
        conf
      );
      clients.value = response.data;
    };

    const add = async (value: ClientsModel): Promise<ClientsModel> => {
      if (value.id !== undefined) {
        const response = await $axios.put<ClientsModel>(
          APIRoutes.ClientsGroupsWithId(value.id!.toString()),
          value,
          conf
        );
        return response.data;
      }
      const response = await $axios.post<ClientsModel>(
        APIRoutes.Clients,
        value,
        conf
      );
      return response.data;
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

    const getClientTypes = async (params: any) => {
      try {
        const { data } = await $axios.post<AppResponse<ClientTypeModel>>(
          APIRoutes.ClientTypesList,
          params,
          conf
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    };

    const getProductCategories = async (params: any) => {
      try {
        const { data } = await $axios.post<AppResponse<ProductCategoryModel>>(
          APIRoutes.ProductsCategoryList,
          params,
          conf
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    };

    const getSalesChannels = async (params: any) => {
      try {
        const { data } = await $axios.post<AppResponse<SallesChannelsModel>>(
          APIRoutes.SalesChannelsList,
          params,
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

    const getAuditors = async (params: any) => {
      try {
        const { data } = await $axios.post<AppResponse<AuditorModel>>(
          APIRoutes.CommandAuditorsList,
          params,
          conf
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    };

    const getPriceTypes = async (params: any) => {
      try {
        const { data } = await $axios.post<AppResponse<PriceTypesModels>>(
          APIRoutes.PriceTypesList,
          params,
          conf
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    };

    const getInventoryTypes = async (params: any) => {
      try {
        const { data } = await $axios.post<AppResponse<InventoryTypeModel>>(
          APIRoutes.InventoryTypesList,
          params,
          conf
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    };

    const getClientDetailById = async (clientId: string) => {
      try {
        const { data } = await $axios.get<ClientDetailModel>(
          APIRoutes.ClientDetailWithId(clientId),
          conf
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    };

    const getClientSalesAmount = async (
      clientId: string
    ): Promise<number | undefined> => {
      try {
        const { data } = await $axios.get(
          APIRoutes.ClientSalesAmountById(clientId),
          conf
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    };

    const getClientOrdersCount = async (
      clientId: string
    ): Promise<number | undefined> => {
      try {
        const { data } = await $axios.get(
          APIRoutes.ClientOrdersCountById(clientId),
          conf
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    };

    const getProductsByClientId = async (
      clientId: string
    ): Promise<ClientsProductsModel | undefined> => {
      try {
        const { data } = await $axios.get(
          APIRoutes.ClientProductsById(clientId),
          conf
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    };

    const getClientsPhotoReports = async (
      clientId: string
    ): Promise<string[] | undefined> => {
      try {
        const { data } = await $axios.get(
          APIRoutes.ClientPhotoReportById(clientId),
          conf
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    };

    const getClientLocationHisotry = async (clientId: string) => {
      try {
        const { data } = await $axios.get<ClientLocationHistoryModel[] | []>(
          `${APIRoutes.ClientLocationHistory}?ClientId=${clientId}`,
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
      params,
      templates,
      clients,
      clientsIds,
      getData,
      setPage,
      setPageSize,
      sortData,
      search,
      add,
      refresh,
      getWithId,
      getEmployedAgents,
      getEmployedExpeditors,
      saveAttachClientsAgents,
      getExpeditors,
      saveAttachClientsExpeditors,
      getClientsCategoryAndTerritories,
      saveAttachCategoryTerritories,
      getClientsSalesChannel,
      saveAttachSalesChannel,
      getClientsPriceTypes,
      saveAttachPriceTypes,
      getTerritories,
      getClientCategories,
      getClientTypes,
      getProductCategories,
      getSalesChannels,
      getCurrencies,
      getAuditors,
      getAgents,
      getPriceTypes,
      getInventoryTypes,
      setNullMultipleDialog,
      getEmployedAuditors,
      saveAttachClientsAuditors,
      getClientDetailById,
      getClientSalesAmount,
      getClientOrdersCount,
      getProductsByClientId,
      getClientsPhotoReports,
      getClientLocationHisotry
    };
  })();
};
