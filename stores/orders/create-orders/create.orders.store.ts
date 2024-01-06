import { defineStore } from "pinia";
import { Ref } from "vue";
import { AppResponse } from "~/interfaces/api/app-response";
import { UnwrapNestedRefs } from "@vue/reactivity";
import { FilterParams, ListParams } from "~/interfaces/api/list-parameters";
import { Template } from "~/interfaces/ui/template";
import { APIRoutes } from "~/variable/api-routes";
import { ClientsModel } from "~~/interfaces/api/clients-model";
import { AgentModel } from "~/interfaces/api/agent-model";
import { TerritoryModel } from "~/interfaces/api/territory-model";
import { ClientCategoryModel } from "~/interfaces/api/client-category-model";
import { PriceModel } from "~/interfaces/api/price-model";
import { WarehousesModel } from "~/interfaces/api/warehouses-model";
import { TradeDirectionsModel } from "~~/interfaces/api/trade-directions-model";
import { OrderStatusModel } from "~~/interfaces/api/order-status-model";
import { ProductCategoryModel } from "~~/interfaces/api/product-category-model";

export const useCreateOrdersStore = (tableId: string) =>
  defineStore(`orders_create_orders_${tableId}`, () => {
    const { $axios } = useNuxtApp();

    // region States

    const data: Ref<AppResponse<ClientsModel> | undefined> = ref();

    const isLoading = ref(false)

    const params: UnwrapNestedRefs<ListParams> = reactive({
      page: 1,
      pageSize: 10,
      agent: [],
      category: [],
      territory: [],
      day: [],
    });

    const conf = {
      headers: {
        Authorization: "Bearer " + useCookie("token").value,
        "Content-Type": "application/json",
        "Accept-Language": "ru-RU",
      },
    };

    const headers: Ref<Template[]> = ref([
      {
        name: "ID",
        checked: true,
        key: "visual_id",
        type: "come",
        thWidth: "60px",
      },
      {
        name: "Названия",
        checked: true,
        key: "name",
        type: "come",
        thWidth: "100px",
      },
      {
        name: "Название фирмы",
        checked: true,
        key: "company_name",
        type: "come",
        thWidth: "140px",
      },
      {
        name: "Тел номер",
        checked: true,
        key: "phone",
        type: "come",
        thWidth: "120px",
      },
      {
        name: "Категория",
        checked: true,
        key: "category",
        type: "come",
        thWidth: "70px",
      },
      {
        name: "Агент",
        checked: true,
        key: "agents",
        type: "come",
        thWidth: "100px",
      },
      {
        name: "Код агента",
        checked: true,
        key: "agent_code",
        type: "come",
        thWidth: "100px",
      },
      {
        name: "День",
        checked: true,
        key: "days",
        type: "come",
        thWidth: "70px",
      },
      {
        name: "Территория",
        checked: true,
        key: "territory",
        type: "come",
        thWidth: "120px",
      },
      {
        name: "Ориентир",
        checked: true,
        key: "navigate",
        type: "come",
        thWidth: "100px",
      },
      {
        name: "Просрочка",
        checked: true,
        key: "delay",
        type: "come",
        thWidth: "140px",
      },
    ]);

    const filterStates = ref({
      firstRow: [
        { name: "Агент", key: "agent" },
        { name: "Территория", key: "territory" },
        { name: "Категория", key: "category" },
        { name: "День", key: "day" },
      ],
      secondRow: [{ name: "", key: "btn" }],
    });

    const editClient = ref("");
    const deleteDialog = ref("");
    let acceptDeleting = ref(false);

    // endregion

    watch(params, async (value, oldValue, onCleanup) => {
      await _loadData();
    });

    // region Actions

    const getData = async () => {
      _loadData();
    };

    const refresh = async () => {
      await _loadData();
    };

    const _loadData = async () => {
      isLoading.value = true
      try {
        const queryString = Object.entries(params)
          .map(([key, values]) => {
            if (typeof values !== "object") {
              return `${key}=${values}`;
            } else {
              if (values.length > 0) {
                return `${key}=${values.join(`&${key}=`)}`;
              } else return;
            }
          })
          .filter((query) => query)
          .join("&");

        const url = `${APIRoutes.SharedApiClients}?${queryString}`;

        const response = await $axios.get(url, conf);

        if (response.data) {
          data.value = response.data;
        }
      } catch (error) {
        console.log(error);
      }
      isLoading.value = false
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

    const getPriceTypes = async (params: any) => {
      try {
        const { data } = await $axios.post<AppResponse<PriceModel>>(
          APIRoutes.PriceTypesList,
          params,
          conf
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    };

    const getWarehouses = async (params: any) => {
      try {
        const { data } = await $axios.post<AppResponse<WarehousesModel>>(
          APIRoutes.WarehousesList,
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

    const getBonusTypes = async () => {
      try {
        const { data } = await $axios.get<AppResponse<OrderStatusModel>>(
          APIRoutes.OrderBonusType,
          conf
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    };

    const getDiscountTypes = async () => {
      try {
        const { data } = await $axios.get<AppResponse<OrderStatusModel>>(
          APIRoutes.OrderDiscountType,
          conf
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    };

    const getProducts = async (params: any) => {
      const config = {
        headers: {
          Authorization: "Bearer " + useCookie("token").value,
          "Content-Type": "application/json",
          "Accept-Language": "ru-RU",
        },
        params: {
          warehouseId: params?.warehouseId,
          priceTypeId: params?.priceTypeId,
          categoryId: params?.categoryId,
        },
      };
      try {
        const { data } = await $axios.get<AppResponse<ClientsModel>>(
          APIRoutes.SharedApiProducts,
          config
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    };

    const getAgentByClientId = async (ClientId: any) => {
      try {
        const { data } = await $axios.get<AppResponse<ClientsModel>>(
          `${APIRoutes.ClientsIdAgents}?clientIds=${ClientId}`,
          conf
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    };

    const getProductcategories = async (params: ListParams) => {
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

    const setPage = (page: number) => {
      params.page = page;
    };

    const setPageSize = (pageSize: number) => {
      params.pageSize = pageSize;
    };

    const sortData = (data: any) => {
      params.order_by = data;
    };

    const search = (value: string) => {
      params.page = 1;
      params.search = value;
    };

    const setFilters = (filters: FilterParams[]) => {
      params.filter!.length = 1;
      params.filter! = params.filter!.concat(filters);
    };

    // endregion

    return {
      // States
      data,
      params,
      headers,
      editClient,
      deleteDialog,
      acceptDeleting,
      filterStates,
      isLoading,

      // Actions
      getData,
      setPage,
      setPageSize,
      sortData,
      search,
      refresh,
      setFilters,
      getAgents,
      getTerritories,
      getClientCategories,
      getPriceTypes,
      getWarehouses,
      getProducts,
      getAgentByClientId,
      getTradeDirections,
      getBonusTypes,
      getDiscountTypes,
      getProductcategories,
    };
  })();
