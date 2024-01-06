import { defineStore } from "pinia";
import { ref, Ref } from "vue";
import { AppResponse } from "~/interfaces/api/app-response";
import { UnwrapNestedRefs } from "@vue/reactivity";
import { ListParams } from "~/interfaces/api/list-parameters";
import { APIRoutes } from "~/variable/api-routes";
import { ClientsModel } from "~~/interfaces/api/clients-model";
import { VanSellingModel } from "~~/interfaces/api/van-selling-model";
import { UserModel } from "~~/interfaces/api/user-model";
import { WarehousesModel } from "~~/interfaces/api/warehouses-model";
import { PriceTypesModels } from "~~/interfaces/api/price-types-models";
import { LibraryConstantsModel } from "~~/interfaces/api/library-constants-model";
import { ProductsModel } from "~~/interfaces/api/products-model";
import { CategoryGroupsModel } from "~~/interfaces/api/category-groups";
import moment from "moment/moment";
import { useNotification } from "@kyvg/vue3-notification";

export const useVanSellingOrdersStore = (tableId: string) =>
  defineStore(`order_van_selling_${tableId}`, () => {
    const { $axios } = useNuxtApp();
    // region States

    const data: Ref<AppResponse<ClientsModel> | undefined> = ref();
    const isLoading = ref(false);
    const ordersIds = ref([])

    const params: UnwrapNestedRefs<ListParams> = reactive({
      page: 1,
      page_size: 10,
      status_id_arr: [],
      agent_id_arr: [],
      warehouse_id_arr: [],
      agent_warehouse_id_arr: [],
      price_type_id_arr: [],
      order_type: null,
      date_filter_type: 1,
      date_only_range: {
        from_value: moment("2023-01-01").format("YYYY-MM-DD"),
        to_value: moment().format("YYYY-MM-DD"),
      },
    });

    const headers = ref([
      {
        name: "",
        checked: true,
        key: "checkbox",
        type: "checkbox",
        thWidth: "40px",
        bRadius: "8px",
      },
      {
        name: "Дата заявки",
        checked: true,
        key: "order_date",
        type: "order_date",
        thWidth: "140px",
        bRadius: "8px",
      },
      {
        name: "Дата Отгрузки",
        checked: true,
        key: "shipped_date",
        type: "shipped_date",
        thWidth: "140px",
        bRadius: "8px",
      },
      {
        name: "Агент",
        checked: true,
        key: "agent",
        type: "agent",
        thWidth: "100px",
      },
      {
        name: "Тип цены",
        checked: true,
        key: "price_type",
        type: "price_type",
        thWidth: "100px",
      },
      {
        name: "Кол-во",
        checked: true,
        key: "total_count",
        type: "total_count",
        thWidth: "70px",
      },
      {
        name: "Сумма",
        checked: true,
        key: "total_cost",
        type: "total_cost",
        thWidth: "100px",
      },
      {
        name: "Статус",
        checked: true,
        key: "status",
        type: "status",
        thWidth: "160px",
      },
      {
        name: "Со склада",
        checked: true,
        key: "warehouse",
        type: "warehouse",
        thWidth: "120px",
      },
      {
        name: "На склад",
        checked: true,
        key: "agent_warehouse",
        type: "agent_warehouse",
        thWidth: "120px",
      },
      {
        name: "Создан",
        checked: true,
        key: "created_by",
        type: "created_by",
        thWidth: "120px",
      },
      {
        name: "Комментария",
        checked: true,
        key: "comment",
        type: "comment",
        thWidth: "120px",
      },
    ]);

    const conf = {
      headers: {
        Authorization: "Bearer " + useCookie("token").value,
        "Content-Type": "application/json",
        "Accept-Language": "ru-RU",
      },
    };

    watch(params, async (value, oldValue, onCleanup) => {
      await _loadData();
    });

    // region Actions

    const setNullOrdersIds = () => {
      ordersIds.value = [];
    };

    const getData = async () => {
      await _loadData();
    };

    const refresh = async () => {
      await _loadData();
    };

    const _loadData = async () => {
      isLoading.value = true;

      try {
        const response = await $axios.post<AppResponse<VanSellingModel>>(
          APIRoutes.VanSellingList,
          params,
          conf
        );

        if (response.data) {
          data.value = response.data;
        }
      } catch (error) {
        console.log(error);
      }
      isLoading.value = false;
    };

    const setPage = (page: number) => {
      params.page = page;
    };

    const setPageSize = async (pageSize: number) => {
      params.page_size = pageSize;
    };

    const sortData = (data: any) => {
      params.order_by = data;
    };

    const search = (value: string) => {
      params.page = 1;
      params.search = value;
    };

    const setVanSellingOrderRequest = async (data: any): Promise<void> => {
      const { notify } = useNotification();
      try {
        if (params.order_type === "1") {
          await $axios.post(APIRoutes.VanSellingRequest, data, conf);
          notify("Сохранено!");
          return;
        } else if (params.order_type === "2") {
          await $axios.post(APIRoutes.VanSellingRefund, data, conf);
          notify("Сохранено!");
          return;
        }
      } catch (error) {
        notify("Ошибка!");
        console.log(error);
      }
    };

    const getVanSellingStatuses = async () => {
      try {
        const { data } = await $axios.get<LibraryConstantsModel>(
          APIRoutes.LibraryConstants,
          conf
        );
        return data?.VanSellingOrderStatus;
      } catch (error) {
        console.log(error);
      }
    };

    const getAgents = async (params: any) => {
      try {
        const { data } = await $axios.post<AppResponse<UserModel>>(
          APIRoutes.CommandAgentsList,
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
        console.error(error);
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

    const getProductCategories = async (
      params: ListParams
    ): Promise<CategoryGroupsModel[] | undefined> => {
      try {
        const { data } = await $axios.post(
          APIRoutes.ProductsCategoryList,
          params,
          conf
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    };

    const getProductsFromSharedApi = async (params: {
      warehouseId: string;
      priceTypeId: string;
      categoryId: string;
    }) => {
      const config = { ...conf, params };
      try {
        const { data } = await $axios.get<AppResponse<ProductsModel>>(
          APIRoutes.SharedApiProducts,
          config
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    };

    // endregion

    return {
      // States
      data,
      headers,
      params,
      isLoading,
      ordersIds,

      // Actions
      setNullOrdersIds,
      getData,
      setPage,
      setPageSize,
      sortData,
      search,
      refresh,
      setVanSellingOrderRequest,
      getVanSellingStatuses,
      getAgents,
      getWarehouses,
      getPriceTypes,
      getProductCategories,
      getProductsFromSharedApi,
    };
  })();
