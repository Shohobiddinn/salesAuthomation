import { defineStore } from "pinia";
import { APIRoutes } from "~/variable/api-routes";
import { Ref } from "vue";
import { AppResponse } from "~/interfaces/api/app-response";
import { ListParams } from "~/interfaces/api/list-parameters";
import { UnwrapNestedRefs } from "@vue/reactivity";
import { Template } from "~/interfaces/ui/template";
import { ProductGroupsModel } from "~/interfaces/api/product-groups-model";

export const useProductGroupsStore = (tableId: string) => defineStore(`product_group_${tableId}`, () => {
  const { $axios } = useNuxtApp();

  // region States

  const data: Ref<AppResponse<ProductGroupsModel> | undefined> = ref();

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
        value: ["true"],
      }
    ],
  });

  const conf = {
    headers: {
      "Authorization": "Bearer " + useCookie("token").value,
      "Content-Type": "application/json",
      "Accept-Language": "ru-RU"
    }
  };

  const templates: Ref<Template[]> = ref([
    {
      name: "Название",
      key: "name",
      checked: true
    },
    {
      name: "Элементы",
      key: "code",
      checked: true
    },
  ]);

  watch(params, async (value, oldValue, onCleanup) => {
    await _loadData();
  });

  const getData = async (type: boolean) => {
    if (type.toString()) {
      params.filter![0].value = [type.toString()]
    } else {
      params.filter![0].value = []
      params.filter![0].value.push(type.toString());
    }
  }

  const refresh = async () => {
    await _loadData();
  }

  const _loadData = async () => {
    try {
      const response = await $axios.post<AppResponse<ProductGroupsModel>>(APIRoutes.ProductGroupsList,
        params,
        conf,
      );
      if (response.data) {
        data.value = response.data;
      }
    } catch (error) {
      console.error(error)
    }

  }

  const add = async (value: ProductGroupsModel): Promise<ProductGroupsModel> => {
    try {
      if (value.id !== undefined) {
        await $axios.put<ProductGroupsModel>(APIRoutes.ProductGroupsWithId(value.id!.toString()),
          value,
          conf,
        )
      }
      else {
        await $axios.post<ProductGroupsModel>(APIRoutes.ProductGroups,
          value,
          conf,
        )
      }
      await refresh()
    } catch (error) {
      console.error(error)
    }

  }

  const setPage = (page: number) => {
    params.page = page;
  }

  const setPageSize = (pageSize: number) => {
    params.page_size = pageSize;
  }

  const sortData = (data: any) => {
    params.order_by = data;
  }

  const search = (value: string) => {
    params.page = 1;
    params.search = value;
  }


  return {
    data,
    params,
    templates,
    getData,
    setPage,
    setPageSize,
    sortData,
    search,
    add,
    refresh,
  };
})();
