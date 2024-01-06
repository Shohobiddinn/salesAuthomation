import { defineStore } from "pinia";
import { ref, Ref } from "vue";
import { AppResponse } from "~/interfaces/api/app-response";
import { UnwrapNestedRefs } from "@vue/reactivity";
import { FilterParams, ListParams } from "~/interfaces/api/list-parameters";
import { APIRoutes } from "~/variable/api-routes";
import { ClientsModel } from "~~/interfaces/api/clients-model";
import moment from "moment/moment";

export const useEmployeeRejectsStore = (tableId: string) =>
  defineStore(`employee_rejects_${tableId}`, () => {
    const { $axios } = useNuxtApp();
    // region States

    const data: Ref<AppResponse<ClientsModel> | undefined> = ref();
    const isLoading = ref(false);

    let params: UnwrapNestedRefs<ListParams> = reactive({
      Page: 1,
      PageSize: 10,
      agents: [],
      rejects: [],
      clients: [],
      territories: [],
      Date: {
        FromValue: moment("2023-01-01").format("YYYY-MM-DD"),
        ToValue: moment().format("YYYY-MM-DD"),
      },
    });

    const templates = ref([
      {
        name: "№",
        checked: true,
        key: "no",
        type: "no",
        thWidth: "40px",
        bRadius: "8px",
      },
      {
        name: "Дата",
        checked: true,
        key: "date",
        type: "date",
        thWidth: "180px",
        bRadius: "8px",
      },
      {
        name: "Клиент",
        checked: true,
        key: "client_name",
        type: "client",
        thWidth: "200px",
      },
      {
        name: "Причины отказа",
        checked: true,
        key: "reject",
        type: "reject",
        thWidth: "200px",
      },
      {
        name: "Агент",
        checked: true,
        key: "agent",
        type: "agent",
        thWidth: "170px",
      },
      {
        name: "Территория",
        checked: true,
        key: "territory",
        type: "territory",
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

    const getData = async () => {
      await _loadData();
    };

    const refresh = async () => {
      await _loadData();
    };

    const _loadData = async () => {
      isLoading.value = true;
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

      const url = `${APIRoutes.EmployeeRejects}?${queryString}&Date.FromValue=${params.Date.FromValue}&Date.ToValue=${params.Date.ToValue}`;

      try {
        const response = await $axios.get(url, conf);

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
      params.PageSize = pageSize;
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

    const getAgent = async (params: any) => {
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

    const getTerritories = async (params: any) => {
      try {
        const { data } = await $axios.post<AppResponse<UserModel>>(
          APIRoutes.TerritoriesList,
          params,
          conf
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    };

    const getRejects = async (params: any) => {
      try {
        const { data } = await $axios.post<AppResponse<RejectModel>>(
          APIRoutes.RejectsList,
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

    // endregion

    return {
      // States
      data,
      isLoading,
      params,
      templates,
      // Actions
      getData,
      setPage,
      setPageSize,
      sortData,
      search,
      refresh,
      setFilters,
      getAgent,
      getTerritories,
      getRejects,
      getClientCategories,
    };
  })();
