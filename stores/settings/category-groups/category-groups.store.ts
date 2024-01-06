import { defineStore } from "pinia";
import { APIRoutes } from "~/variable/api-routes";
import { Ref } from "vue";
import { AppResponse } from "~/interfaces/api/app-response";
import { ListParams } from "~/interfaces/api/list-parameters";
import { UnwrapNestedRefs } from "@vue/reactivity";
import { Template } from "~/interfaces/ui/template";
import { CategoryGroups } from "~/interfaces/api/category-groups";
export const useCategoryGroupsStore = (tableId: string) =>
  defineStore(`category_groups${tableId}`, () => {
    const { $axios } = useNuxtApp();

    // region States

    const data: Ref<AppResponse<CategoryGroups> | undefined> = ref();

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
        thWidth: "140px",
        background: "1px solid red",
        checked: true,
      },
      {
        name: "Kатегория",
        key: "categories",
        thWidth: "140px",
        checked: true,
      },
    ]);

    // endregion

    watch(params, async (value, oldValue, onCleanup) => {
      await _loadData();
    });

    // region Actions

    const getData = async (type: boolean) => {
      if (type.toString()) {
        params.filter![0].value = [type.toString()];
      } else {
        await _loadData();
      }
    };

    const refresh = async () => {
      await _loadData();
    };

    const _loadData = async () => {
      try {
        const response = await $axios.post<AppResponse<CategoryGroups>>(
          APIRoutes.CategoryGroupsList,
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
    const categories = ref([]);
    const groupCategories = async (id: any) => {
      try {
        const response = await $axios.get(
          APIRoutes.CategoryGroupsCategory(id),
          conf
        );
        if (response.data) {
          categories.value = response.data;
        }
      } catch (error) {
        console.error(error);
      }
    };
    const add = async (value: CategoryGroups): Promise<CategoryGroups> => {
      try {
        if (value.id !== undefined) {
          const response = await $axios.put<CategoryGroups>(
            APIRoutes.CategoryGroups,
            value,
            conf
          );
          return response.data;
        }
        const response = await $axios.post<CategoryGroups>(
          APIRoutes.CategoryGroups,
          value,
          conf
        );
        return response.data;
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
      categories,
      getData,
      setPage,
      setPageSize,
      sortData,
      search,
      add,
      refresh,
      groupCategories,
    };
  })();
