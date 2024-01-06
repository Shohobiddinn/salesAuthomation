import { defineStore } from "pinia";
import { APIRoutes } from "~/variable/api-routes";
import { Ref } from "vue";
import { AppResponse } from "~/interfaces/api/app-response";
import { ListParams } from "~/interfaces/api/list-parameters";
import { UnwrapNestedRefs } from "@vue/reactivity";
import { Template } from "~/interfaces/ui/template";
import { ProductsModel } from "~/interfaces/api/products-model";
import { notify, useNotification } from "@kyvg/vue3-notification";
import { ProductGroupsModel } from "~~/interfaces/api/product-groups-model";
import { ProductCategoryModel } from "~~/interfaces/api/product-category-model";

export const useProductsStore = (tableId: string) =>
  defineStore(`products_${tableId}`, () => {
    const { $axios } = useNuxtApp();

    const data: Ref<AppResponse<ProductsModel> | undefined> = ref();

    const isLoading = ref(false);

    const productsIds = ref([]);

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
        name: "",
        key: "checkbox",
        type: "checkbox",
        checked: true,
        thWidth: "100px",
      },
      {
        name: "Название",
        key: "name",
        type: "name",
        checked: true,
        thWidth: "250px",
      },
      {
        name: "Кат. товара",
        key: "category",
        type: "category",
        checked: true,
        thWidth: "160px",
      },
      {
        name: "Ед. Измерение",
        key: "unit",
        type: "unit",
        checked: true,
        thWidth: "200px",
      },
      {
        name: "Сортировка",
        key: "sort",
        type: "sort",
        checked: true,
        thWidth: "160px",
      },
      {
        name: "Нап. Торговли",
        key: "trade",
        type: "trade",
        checked: true,
        thWidth: "160px",
      },
      {
        name: "Объем",
        key: "quantity_in_package",
        type: "quantity_in_package",
        checked: true,
        thWidth: "160px",
      },
      {
        name: "Вес",
        key: "weight",
        type: "weight",
        checked: true,
        thWidth: "160px",
      },
      {
        name: "Канал сбыта",
        key: "sales_channel",
        type: "sales_channel",
        checked: true,
        thWidth: "160px",
      },
      {
        name: "Группа продуктов",
        key: "product_group",
        type: "product_group",
        checked: true,
        thWidth: "160px",
      },
      {
        name: "Бранд",
        key: "brand",
        type: "brand",
        checked: true,
        thWidth: "160px",
      },
      {
        name: "Тип коробки",
        key: "box_type",
        type: "box_type",
        checked: true,
        thWidth: "160px",
      },
      {
        name: "Код",
        key: "code",
        type: "code",
        checked: true,
        thWidth: "160px",
      },
    ]);
    // @ts-ignore
    const form: Ref<ProductsModel> = ref({
      id: undefined,
      name: "",
      category_id: "",
      unit_id: "",
      quantity_in_package: null,
      weight: null,
      sort: null,
      sales_channel_id: "",
      box_type_id: "",
      code: "",
      sub_code: "",
      bar_code: "",
      IKPU_code: "",
      MML: true,
      image_id: "",
      brand_id: "",
      is_active: true,
      product_group_id: true,
    });
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

    const setNullProductIds = () => {
      productsIds.value = [];
    };

    const getData = async (type: boolean, category_id: string) => {
      if (category_id) {
        params.filter![1] = {
          field: "category_id",
          value: [category_id],
        };
        return;
      } else if (type.toString()) {
        params.filter![0].value = [type.toString()];
      } else {
        await _loadData();
      }
    };

    const refresh = async (value: any) => {
      params.filter![0].value.push(value.toString());
    };

    const _loadData = async () => {
      isLoading.value = true;
      try {
        const response = await $axios.post<AppResponse<ProductsModel>>(
          APIRoutes.ProductsList,
          params,
          conf
        );
        if (response.data) {
          data.value = response.data;
        }
      } catch (error) {
        console.error(error);
      }
      isLoading.value = false;
    };

    const add = async (value: any) => {
      if (value.id !== undefined) {
        form.value.name = value.name;
        form.value.volume = value.volume;
        form.value.category_id = value.category_id;
        form.value.IKPU_code = value.IKPU_code;
        form.value.MML = value.MML;
        form.value.bar_code = value.bar_code;
        form.value.box_type_id = value.box_type_id;
        form.value.brand_id = value.brand_id;
        form.value.code = value.code;
        form.value.image_id = value.image_id;
        form.value.is_active = value.is_active;
        form.value.product_group_id = value.product_group_id;
        form.value.quantity_in_package = value.quantity_in_package;
        form.value.sales_channel_id = value.sales_channel_id;
        form.value.sort = value.sort;
        form.value.sub_code = value.sub_code;
        form.value.unit_id = value.unit_id;
        form.value.weight = value.weight;
        const response = await $axios.put<ProductsModel>(
          APIRoutes.ProductsWithId(value.id!.toString()),
          form.value,
          conf
        );
        return response.data;
      }
      const response = await $axios.post<ProductsModel>(
        APIRoutes.Products,
        value,
        conf
      );
      return response.data;
    };
    const deleteDialog = ref("");
    let productDeleting = false;
    let acceptDeleting = ref(false);

    const closeDeleteDialog = async () => {
      deleteDialog.value = "";
      await refresh();
    };

    const deleteProducts = async () => {
      if (!acceptDeleting.value) return;

      if (productDeleting) {
        closeDeleteDialog();
        return;
      }
      productDeleting = true;

      if (deleteDialog.value) {
        try {
          await $axios.delete(
            APIRoutes.ProductsDeleteWithId(deleteDialog.value),
            conf
          );
          const { notify } = useNotification();
          notify({ title: "Агент успешно удален.", type: "success" });
        } catch (e) {
          const { notify } = useNotification();
          notify({ title: "Ошибка при удалении агента.", type: "error" });
        }
      }

      deleteDialog.value = "";

      productDeleting = false;

      await _loadData();
    };

    const onChangeMultipleProductsStatus = async () => {
      const { notify } = useNotification();
      notify({ title: "Пожалуйста подождите" });
      try {
        for (let productId of productsIds.value) {
          let product = data.value?.items.find(
            (product: any) => product.id === productId
          );
          let _product = null;
          if (product !== undefined) {
            let {
              name,
              volume,
              category_id,
              IKPU_code,
              MML,
              bar_code,
              box_type_id,
              brand_id,
              code,
              image_id,
              is_active,
              product_group_id,
              quantity_in_package,
              sales_channel_id,
              sort,
              sub_code,
              unit_id,
              weight,
            } = product;

            is_active = !is_active;

            _product = {
              name,
              volume,
              category_id,
              IKPU_code,
              MML,
              bar_code,
              box_type_id,
              brand_id,
              code,
              image_id,
              is_active,
              product_group_id,
              quantity_in_package,
              sales_channel_id,
              sort,
              sub_code,
              unit_id,
              weight,
            };
          }
          await $axios.put(
            APIRoutes.ProductsDeleteWithId(productId),
            _product,
            conf
          );
        }
        await _loadData();
        productsIds.value = [];
        notify({ title: "Сохранено!" });
      } catch (error) {
        console.log(error);
        notify({ title: "Ошибка при удалении!", type: "error" });
      }
    };

    const getProductGroups = async (params: any) => {
      try {
        const { data } = await $axios.post<AppResponse<ProductGroupsModel>>(
          APIRoutes.ProductGroupsList,
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

    // endregion

    return {
      //state
      data,
      params,
      templates,
      deleteDialog,
      acceptDeleting,
      loading,
      productsIds,
      isLoading,

      //methods
      getData,
      setPage,
      setPageSize,
      sortData,
      search,
      add,
      refresh,
      deleteProducts,
      closeDeleteDialog,
      getProductGroups,
      getProductCategories,
      setNullProductIds,
      onChangeMultipleProductsStatus,
    };
  })();
