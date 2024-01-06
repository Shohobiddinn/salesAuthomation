import { defineStore } from "pinia";
import { APIRoutes } from "~/variable/api-routes";
import { Ref } from "vue";
import { AppResponse } from "~/interfaces/api/app-response";
import { UnwrapNestedRefs } from "@vue/reactivity";
import { Template } from "~/interfaces/ui/template";
import { AgentModel } from "~/interfaces/api/agent-model";
import { TerritoryModel } from "~~/interfaces/api/territory-model";
import { ProductCategoryModel } from "~~/interfaces/api/product-category-model";
import { ProductsModel } from "~~/interfaces/api/products-model";
import { PriceTypesModels } from "~~/interfaces/api/price-types-models";
import { ClientsRemainsModel } from "~~/interfaces/api/clients-remains-model";
import { ListParams } from "~~/interfaces/api/list-parameters";

export const useClientsRemainsStore = (tableId: string) => {
  return defineStore(`clients_remains_${tableId}`, () => {
    const { $axios } = useNuxtApp();

    const conf = {
      headers: {
        Authorization: "Bearer " + useCookie("token").value,
        "Content-Type": "application/json",
        "Accept-Language": "ru-RU",
      },
    };

    const headers: Ref<Template[]> = ref([
      {
        name: "Дата",
        checked: true,
        key: "date",
        type: "date",
        thWidth: "100px",
        bRadius: "8px",
      },
      {
        name: "Клиент",
        checked: true,
        key: "client_name",
        type: "client",
        thWidth: "100px",
      },
      {
        name: "Территория",
        checked: true,
        key: "territory_name",
        type: "territory",
        thWidth: "140px",
      },
      {
        name: "Агент",
        checked: true,
        key: "agent_name",
        type: "agent",
        thWidth: "100px",
      },
      {
        name: "Категория продукта",
        checked: true,
        key: "product_category_name",
        type: "productCategory",
        thWidth: "180px",
      },
      {
        name: "Продукт",
        checked: true,
        key: "product_name",
        type: "product",
        thWidth: "140px",
      },
      {
        name: "Кол-во",
        checked: true,
        key: "count",
        type: "count",
        thWidth: "100px",
      },
      {
        name: "Кол-во (продажа)",
        checked: true,
        key: "sold_count",
        type: "sold_count",
        thWidth: "140px",
      },
      {
        name: "Объём",
        checked: true,
        key: "volume",
        type: "volume",
        thWidth: "100px",
      },
      {
        name: "Сумма",
        checked: true,
        key: "total_sum",
        type: "total_sum",
        thWidth: "140px",
      },
    ]);

    // region by-product data-table States
    const isLoadingByProduct = ref(false);

    const byProductData: Ref<AppResponse<ClientsRemainsModel> | undefined> =
      ref();

    const byProductParams: UnwrapNestedRefs<ListParams> = reactive({
      page: 1,
      page_size: 10,
      agent_id_arr: [],
      search: "",
      territory_id_arr: [],
      product_category_id_arr: [],
      product_id_arr: [],
      date_range: {},
      order_by: {
        field: "date",
        is_asc: false,
      },
      filter: [
        {
          field: "is_active",
          value: ["true"],
        },
      ],
    });
    // end region by-product data-table States

    // region by-category data-table States
    const isLoadingByCategory = ref(false);

    const byCategoryData: Ref<AppResponse<ClientsRemainsModel> | undefined> =
      ref();

    const byCategoryParams: UnwrapNestedRefs<ListParams> = reactive({
      page: 1,
      page_size: 10,
      agent_id_arr: [],
      search: "",
      territory_id_arr: [],
      product_category_id_arr: [],
      product_id_arr: [],
      date_range: {},
      order_by: {
        field: "date",
        is_asc: false,
      },
      filter: [
        {
          field: "is_active",
          value: ["true"],
        },
      ],
    });
    // end region by-category data-table States

    // region by-product data-table Functions
    watch(byProductParams, async (value, oldValue, onCleanup) => {
      await _loadDataByProduct();
    });

    const getDataByProducts = async () => {
      await _loadDataByProduct();
    };

    const refreshByProduct = async () => {
      await _loadDataByProduct();
    };

    const _loadDataByProduct = async () => {
      isLoadingByProduct.value = true;
      const response = await $axios.post<AppResponse<ClientsRemainsModel>>(
        APIRoutes.ClientsRemainsByProduct,
        byProductParams,
        conf
      );
      if (response.data) {
        byProductData.value = response.data;
      }
      isLoadingByProduct.value = false;
    };

    const setPageByProduct = (page: number) => {
      byProductParams.page = page;
    };

    const setPageSizeByProduct = (pageSize: number) => {
      byProductParams.page_size = pageSize;
    };

    const searchFromByProduct = (value: string) => {
      byProductParams.Page = 1;
      byProductParams.Search = value;
    };

    const sortDataByProduct = (data: any) => {
      byProductParams.OrderBy = data;
    };
    // region by-product data-table Functions

    // region by-category data-table Functions
    watch(byCategoryParams, async (value, oldValue, onCleanup) => {
      await _loadDataByCategory();
    });

    const getDataByCategory = async () => {
      await _loadDataByCategory();
    };

    const refreshByCategory = async () => {
      await _loadDataByCategory();
    };

    const _loadDataByCategory = async () => {
      isLoadingByCategory.value = true;
      const response = await $axios.post<AppResponse<ClientsRemainsModel>>(
        APIRoutes.ClientsRemainsByCategory,
        byCategoryParams,
        conf
      );
      if (response.data) {
        byCategoryData.value = response.data;
      }
      isLoadingByCategory.value = false;
    };

    const setPageByCategory = (page: number) => {
      byCategoryParams.page = page;
    };

    const setPageSizeByCategory = (pageSize: number) => {
      byCategoryParams.page_size = pageSize;
    };

    const searchFromByCategory = (value: string) => {
      byCategoryParams.Page = 1;
      byCategoryParams.Search = value;
    };

    const sortDataByCategory = (data: any) => {
      byCategoryParams.OrderBy = data;
    };
    // region by-category data-table Functions

    // additional functions
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

    const getProducts = async (params: any) => {
      try {
        const { data } = await $axios.post<AppResponse<ProductsModel>>(
          APIRoutes.ProductsList,
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

    // endregion

    return {
      // states
      headers,
      isLoadingByProduct,
      isLoadingByCategory,
      byProductData,
      byCategoryData,
      byProductParams,
      byCategoryParams,

      //actions
      getDataByProducts,
      refreshByProduct,
      setPageByProduct,
      setPageSizeByProduct,
      searchFromByProduct,
      sortDataByProduct,
      getDataByCategory,
      refreshByCategory,
      setPageByCategory,
      setPageSizeByCategory,
      searchFromByCategory,
      sortDataByCategory,
      getTerritories,
      getProductCategories,
      getAgents,
      getProducts,
      getPriceTypes,
    };
  })();
};
