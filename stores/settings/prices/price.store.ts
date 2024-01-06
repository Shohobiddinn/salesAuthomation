import { defineStore } from "pinia";
import { APIRoutes } from "~/variable/api-routes";
import { Ref } from "vue";
import moment from "moment";
import { AppResponse } from "~/interfaces/api/app-response";
import { ListParams } from "~/interfaces/api/list-parameters";
import { UnwrapNestedRefs } from "@vue/reactivity";
import { Template } from "~/interfaces/ui/template";
import {
  Products,
  PriceModel,
  PriceSale,
  PriceList,
} from "~/interfaces/api/price-model";
import { WarehousesModel } from "~/interfaces/api/warehouses-model";
import { ProductCategoryModel } from "~/interfaces/api/product-category-model";
import { LibraryConstantsModel } from "~~/interfaces/api/library-constants-model";
import { MarginPriceModel } from "~~/interfaces/api/margin-price-model";
import { useNotification } from "@kyvg/vue3-notification";
import { TradeDirectionsModel } from "~~/interfaces/api/trade-directions-model";
import { BrandModel } from "~~/interfaces/api/brand-model";


export const usePriceStore = (tableId: string) =>
  defineStore(`price_${tableId}`, () => {
    const { $axios } = useNuxtApp();

    const data: Ref<AppResponse<PriceModel> | undefined> = ref();
    const editMultipleDialog = ref([]);
    const loading = ref(false);
    const sale: Ref<PriceSale[] | undefined> = ref([]);
    const purchase: Ref<PriceSale[] | undefined> = ref([]);
    const priceList: Ref<PriceList[] | undefined> = ref([]);
    const products: Ref<PriceModel | undefined> = ref([]) as any;

    const params: UnwrapNestedRefs<ListParams> = reactive({
      page: 1,
      page_size: 10,
      search: null,
      order_by: {
        field: "created_date",
        is_asc: true,
      },
      filter: [
        {
          field: "is_active",
          value: ["true"],
        },
      ],
    });

    const priceListParams = reactive({
      page: 1,
      page_size: 10,
      price_type_id_arr: [],
      category_id_arr: [],
      warehouse: [],
      trade_direction_id_arr: [],
      brand_id_arr: [],
      is_active: 1,
      date_only_range: {
        from_value: ref(moment().format("YYYY-MM-DD")),
        to_value: ref(moment().format("YYYY-MM-DD")),
      },
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
        name: "Тип цены",
        key: "price_type",
        thWidth: "140px",
        background: "1px solid red",
        checked: true,
      },
      {
        name: "Способ оплаты",
        key: "currency",
        thWidth: "140px",
        checked: true,
      },
      {
        name: "Дата установление цены",
        key: "date",
        thWidth: "240px",
        checked: true,
      },
    ]);

    const templatesPriceList: Ref<Template[]> = ref([
      {
        name: "Наименование товара",
        key: "product_name",
        thWidth: "200px",
        background: "1px solid red",
        checked: true,
      },

      {
        name: "Kоличество",
        key: "quantity",
        thWidth: "240px",
        checked: true,
      },
    ]);

    const templatesSettingNew: Ref<Template[]> = ref([
      {
        name: "Все нижеуказанные",
        checked: true,
        key: "name",
      },
      {
        name: "",
        nameTwo: "",
        checked: true,
        key: "radio",
      },
    ]);

    watch(params, async (value, oldValue, onCleanup) => {
      try {
        loading.value = true;
        await _loadData();
      } catch (error) {
      } finally {
        loading.value = false;
      }
    });
    watch(priceListParams, async (value, oldValue, onCleanup) => {
      try {
        await getPriceList();
      } catch (error) {
        console.error(error);
      }
    });
    const getData = async (type: boolean) => {
      if (type?.toString()) {
        params.filter![0].value = [type.toString()];
      } else {
        await _loadData();
      }
    };

    const getPriceSale = async () => {
      try {
        const response = await $axios.get(APIRoutes.PriceSaleList, conf);
        sale.value = response.data;
      } catch (error) {
        console.error(error);
      }
    };

    const getPricePurchuse = async () => {
      try {
        const response = await $axios.get(APIRoutes.PricePurchaseList, conf);
        purchase.value = response.data;
      } catch (error) {
        console.error(error);
      }
    };

    const getPriceList = async () => {
      try {
        const response = await $axios.post(APIRoutes.PriceList, priceListParams, conf);
        priceList.value = response.data;
      } catch (error) {
        console.error(error);
      }
    };

    const refresh = async () => {
      await _loadData();
    };

    const _loadData = async () => {
      try {
        const response = await $axios.post(
          APIRoutes.PriceTypesList,
          params,
          conf
        );
        if (response.data) {
          data.value = response.data;
        }
      } catch (error) {
        console.error(error);
      }
    };

    const getProducts = async (
      id: any,
      priceTypeId: any
    ): Promise<Products[] | undefined> => {
      try {
        if (id && priceTypeId) {
          const { data } = await $axios.get(
            APIRoutes.PriceProductWithId(id, priceTypeId),
            conf
          );
          return data;
        }
      } catch (error) {
        console.error(error);
      }
    };

    const onSavePrice = async (value: PriceModel[]): Promise<void | string> => {
      try {
        const response = await $axios.post(APIRoutes.SavePrice, value, conf);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    };

    const onSavePriceWithoutHistory = async (value: PriceModel[]): Promise<void | string> => {
      try {
        const response = await $axios.post(
          APIRoutes.SavePriceWithoutHistory,
          value,
          conf
        );
        return response.data;
      } catch (error) {
        console.error(error);
      }
    };

    const setNullMultipleDialog = async () => {
      editMultipleDialog.value = [];
    };

    const getWarehouses = async (
      params: any
    ): Promise<AppResponse<WarehousesModel> | undefined> => {
      try {
        const { data } = await $axios.post(
          APIRoutes.WarehousesList,
          params,
          conf
        );
        return data;
      } catch (error) {
        console.error(error);
      }
    };

    const getProductCategories = async (
      params: any
    ): Promise<AppResponse<ProductCategoryModel> | undefined> => {
      try {
        const { data } = await $axios.post(
          APIRoutes.ProductsCategoryList,
          params,
          conf
        );
        return data;
      } catch (error) {
        console.error(error);
      }
    };

    const getLibraryConstants = async (): Promise<
      LibraryConstantsModel | undefined
    > => {
      try {
        const { data } = await $axios.get(APIRoutes.LibraryConstants, conf);
        return data;
      } catch (error) {
        console.error(error);
      }
    };

    const getTradeDirections = async (params: any): Promise<AppResponse<TradeDirectionsModel> | undefined> => {
      try {
        const { data } = await $axios.post(
          APIRoutes.TradeDirectionsList,
          params,
          conf
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    };

    const getBrands = async (params: any): Promise<AppResponse<BrandModel> | undefined> => {
      try {
        const { data } = await $axios.post(APIRoutes.BrandsList,
          params,
          conf,
        );
        return data;
      } catch (error) {
        console.error(error)
      }
    };

    const setMarginPrice = async (data: MarginPriceModel) => {
      const { notify } = useNotification();
      try {
        await $axios.post(APIRoutes.SetMarginPrice, data, conf);
        notify({ title: "Успешно добавлено!", type: "success" });
      } catch (error) {
        console.error(error);
        notify({ title: "Ошибка в добавлении!", type: "error" });
      }
    };

    const setPage = (page: number, type?: String) => {
      if (type === "priceList") {
        priceListParams.page = page
      } else {
        params.page = page;
      }
    };

    const setPageSize = (pageSize: number, type?: String) => {
      if (type === "priceList") {
        priceListParams.page_size = pageSize
      } else {
        params.page_size = pageSize;
      }
    };

    const sortData = (data: any) => {
      params.order_by = data;
    };

    const search = (value: string) => {
      params.page = 1;
      params.search = value;
    };


    return {
      data,
      params,
      templates,
      templatesPriceList,
      templatesSettingNew,
      purchase,
      sale,
      priceList,
      products,
      loading,
      editMultipleDialog,
      priceListParams,

      getData,
      setPage,
      setPageSize,
      sortData,
      search,
      setNullMultipleDialog,
      refresh,
      getPriceSale,
      getPricePurchuse,
      getPriceList,
      getProducts,
      onSavePrice,
      onSavePriceWithoutHistory,
      getWarehouses,
      getProductCategories,
      getLibraryConstants,
      setMarginPrice,
      getTradeDirections,
      getBrands
    };
  })();
