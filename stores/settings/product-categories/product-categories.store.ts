import { defineStore } from "pinia";
import { APIRoutes } from "~/variable/api-routes";
import { Ref } from "vue";
import { AppResponse } from "~/interfaces/api/app-response";
import { ListParams } from "~/interfaces/api/list-parameters";
import { UnwrapNestedRefs } from "@vue/reactivity";
import { Template } from "~/interfaces/ui/template";
import { ProductCategoryModel } from "~/interfaces/api/product-category-model";
import { TradeDirectionsModel } from "~~/interfaces/api/trade-directions-model";

export const useProductCategoryStore = (tableId: string) =>
  defineStore(`product_category_${tableId}`, () => {
    const { $axios } = useNuxtApp();

    // region States

    const data: Ref<AppResponse<ProductCategoryModel> | undefined> = ref();

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

    const conf = {
      headers: {
        Authorization: "Bearer " + useCookie("token").value,
        "Content-Type": "application/json",
        "Accept-Language": "ru-RU",
      },
    };

    const templates: Ref<Template[]> = ref([
      {
        name: "Название",
        key: "name",
        type: "name",
        checked: true,
      },
      {
        name: "Сортировка",
        key: "code",
        type: "code",
        checked: true,
      },
      {
        name: "Единицы Измерение",
        key: "unit",
        type: "unit",
        checked: true,
      },
    ]);

    // endregion

    const loading = ref(false);
    watch(params, async (value, oldValue, onCleanup) => {
      try {
        loading.value = true;
        await _loadData();
      } catch (error) {
      } finally {
        loading.value = false;
      }
      // await _loadData();
    });

    // region Actions

    const getData = async (type: boolean) => {
      if (type?.toString()) {
        params.filter![0].value = [type.toString()];
      } else {
        await _loadData();
      }
    };

    const refresh = async () => {
      await _loadData();
    };

    const _loadData = async () => {
      const response = await $axios.post<AppResponse<ProductCategoryModel>>(
        APIRoutes.ProductsCategoryList,
        params,
        conf
      );
      if (response.data) {
        data.value = response.data;
      }
    };

    const add = async (
      value: ProductCategoryModel
    ): Promise<ProductCategoryModel> => {
      if (value.id !== undefined) {
        const response = await $axios.put<ProductCategoryModel>(
          APIRoutes.ProductCategoryWithId(value.id!.toString()),
          value,
          conf
        );
        return response.data;
      }
      const response = await $axios.post<ProductCategoryModel>(
        APIRoutes.ProductCategory,
        value,
        conf
      );
      return response.data;
    };

    const getProductSubCategories = async (params: any) => {
      try {
        const { data } = await $axios.post(
          APIRoutes.ProductSubCategoriesList,
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

    const onPhotoFileUpload = async (file: any) => {
      try {
        const res = $axios.post(APIRoutes.FileUpload, file, {
          headers: {
            Authorization: "Bearer " + useCookie("token").value,
            "Content-Type": "multipart/form-data",
          },
        });
        return res;
      } catch (error) {
        console.log(error);
      }
    };

    const getCategoriesByManualParams = async (
      manualParams: ListParams
    ): Promise<ProductCategoryModel[] | undefined> => {
      try {
        const { data } = await $axios.post(
          APIRoutes.ProductsCategoryList,
          params,
          conf
        );
        return data?.items;
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

    // endregion

    return {
      data,
      params,
      templates,
      loading,
      getData,
      setPage,
      setPageSize,
      sortData,
      search,
      add,
      refresh,
      getProductSubCategories,
      getTradeDirections,
      onPhotoFileUpload,
      getCategoriesByManualParams,
    };
  })();
