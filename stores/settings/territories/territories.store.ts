import { defineStore } from "pinia";
import { APIRoutes } from "~/variable/api-routes";
import { Ref } from "vue";
import { AppResponse } from "~/interfaces/api/app-response";
import { ListParams } from "~/interfaces/api/list-parameters";
import { UnwrapNestedRefs } from "@vue/reactivity";
import { Template } from "~/interfaces/ui/template";
import { TerritoryModel } from "~/interfaces/api/territory-model";
import { RegionModel } from "~~/interfaces/api/region-model";

export const useTerritoriesStore = (tableId: string) =>
  defineStore(`territories${tableId}`, () => {
    const { $axios } = useNuxtApp();

    // region States

    const data: Ref<AppResponse<TerritoryModel> | undefined> = ref();

    const params: UnwrapNestedRefs<ListParams> = reactive({
      Page: 1,
      PageSize: 10,
      Search: null,
      OrderBy: {
        Field: "id",
        IsAsc: true,
      },
      Filter: [
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
        name: "Название",
        key: "name",
        thWidth: "140px",
        background: "1px solid red",
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
    });

    // region Actions

    const getData = async (type: boolean) => {
      if (params.Filter![0].value.includes(type.toString())) {
        params.Filter![0].value = [];
        params.Filter![0].value.push(type.toString());
        await _loadData();
      } else {
        params.Filter![0].value = [];
        params.Filter![0].value.push(type.toString());
      }
    };

    const refresh = async () => {
      await _loadData();
    };

    const _loadData = async () => {
      try {
      //   const queryParams = [];

      //   for (const [key, value] of Object.entries(params)) {
      //     if (value !== null && value !== undefined) {
      //       if (key === "Filter") {
      //         queryParams.push(
      //           `Filter=${encodeURIComponent(JSON.stringify(value))}`
      //         );
      //       } else if (typeof value === "object") {
      //         if (Array.isArray(value)) {
      //           for (const filterItem of value) {
      //             queryParams.push(
      //               `Filter.${encodeURIComponent(
      //                 filterItem.field
      //               )}=${encodeURIComponent(JSON.stringify(filterItem.value))}`
      //             );
      //           }
      //         } else {
      //           for (const [subKey, subValue] of Object.entries(value)) {
      //             queryParams.push(`${key}.${subKey}=${subValue}`);
      //           }
      //         }
      //       } else {
      //         queryParams.push(`${key}=${value}`);
      //       }
      //     }
      //   }

        // const queryString = queryParams.join("&");
        // const url = `${APIRoutes.TerritoriesList}?${queryString}`;
        const response = await $axios.post<AppResponse<TerritoryModel>>(
          APIRoutes.TerritoriesList,
          params,
          conf
        );
        if (response.data) {
          data.value = response.data;
        }
      } catch (error) {
        console.error("Error while loading data:", error);
      }
    };

    const add = async (value: TerritoryModel): Promise<TerritoryModel> => {
      if (value.id !== undefined) {
        const response = await $axios.put<TerritoryModel>(
          APIRoutes.Territories,
          value,
          conf
        );
        return response.data;
      }
      const response = await $axios.post<TerritoryModel>(
        APIRoutes.Territories,
        value,
        conf
      );
      return response.data;
    };

    const getRegions = async (params: ListParams) => {
      try {
        const { data } = await $axios.post<AppResponse<RegionModel> | undefined>(APIRoutes.RegionsList, params, conf);
        return data;
      } catch (error) {
        console.log(error);
      }
    };

    const setPage = (page: number) => {
      params.Page = page;
    };

    const setPageSize = (pageSize: number) => {
      params.PageSize = pageSize;
    };

    const sortData = (data: any) => {
      params.OrderBy = data;
    };

    const search = (value: string) => {
      params.Page = 1;
      params.Search = value;
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
      getRegions,
    };
  })();
