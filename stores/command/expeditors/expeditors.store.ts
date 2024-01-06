import { defineStore } from "pinia";
import { Ref } from "vue";
import { AppResponse } from "~/interfaces/api/app-response";
import { ExpeditorModel } from "~/interfaces/api/expeditor-model";
import { UnwrapNestedRefs } from "@vue/reactivity";
import { FilterParams, ListParams } from "~/interfaces/api/list-parameters";
import { Template } from "~/interfaces/ui/template";
import { APIRoutes } from "~/variable/api-routes";
import { useNotification } from "@kyvg/vue3-notification";
import { TerritoryModel } from "~/interfaces/api/territory-model";
import { WarehousesModel } from "~/interfaces/api/warehouses-model";
import { CurrencyModel } from "~/interfaces/api/currency-model";
import { TradeDirectionsModel } from "~/interfaces/api/trade-directions-model";

export const useExpeditorsStore = (tableId: string) =>
  defineStore(`command_expeditors_${tableId}`, () => {
    const { $axios } = useNuxtApp();

    // region States

    const data: Ref<AppResponse<ExpeditorModel> | undefined> = ref();

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
        name: "Ф.И.О",
        checked: true,
        key: "fio",
        thWidth: "180px",
        isComputable: true,
      },
      {
        name: "Логин для доступа",
        checked: true,
        key: "login",
        thWidth: "200px",
      },
      {
        name: "Номер телефона",
        checked: true,
        key: "phone",
        thWidth: "140px",
      },
      {
        name: "Aктивный ",
        checked: true,
        key: "is_active",
        thWidth: "140px",
      },
      {
        name: "Версия проложении",
        checked: true,
        key: "apk_version",
        thWidth: "180px",
      },
      {
        name: "Доступ к приложение",
        checked: true,
        key: "application_access",
        thWidth: "180px",
        bRadius: "8px",
      },
    ]);

    const editDialog = ref("");
    const configByIdDialog = ref("");
    const deleteDialog = ref("");
    let expeditorDeleting = false;
    let acceptDeleting = ref(false);

    const newExpeditorDialog = ref(false);

    // endregion

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
      try {
        const response = await $axios.post(
          APIRoutes.CommandExpeditorsList,
          params,
          conf
        );

        if (response.data) {
          data.value = response.data;
        }
      } catch (error) {
        console.log(error);
      }
    };

    const add = async (value: ExpeditorModel): Promise<ExpeditorModel> => {
      try {
        if (value.id !== undefined) {
          const response = await $axios.put<ExpeditorModel>(
            APIRoutes.CommandExpeditorDelete(value.id!.toString()),
            value,
            conf
          );
          return response.data;
        }
        const response = await $axios.post<ExpeditorModel>(
          APIRoutes.CommandExpeditor,
          value,
          conf
        );
        return response.data;
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

    const getWarehousesList = async (params: any) => {
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

    const getExpeditorsConfigsAll = async () => {
      try {
        const { data } = await $axios.get(
          APIRoutes.CommandExpeditorGetConfigsAll,
          conf
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    };

    const postExpeditorsConfigsAll = async (postData: any) => {
      const { notify } = useNotification();
      try {
        const { data } = await $axios.post(
          APIRoutes.CommandExpeditorPostConfigsAll,
          postData,
          conf
        );
        notify({ title: "Конфиги успешно обновлены", type: "success" });
        return data;
      } catch (e) {
        notify({ title: "Ошибка с конфигами", type: "error" });
      }
    };

    const getCurrencies = async (params: any) => {
      try {
        const { data } = await $axios.post<AppResponse<CurrencyModel>>(
          APIRoutes.CurrencyList,
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

    const postConfigById = async (expeditorId: string, postData: any) => {
      try {
        const config = {
          headers: {
            Authorization: "Bearer " + useCookie("token").value,
            "Content-Type": "application/json",
            "Accept-Language": "ru-RU",
          },
          params: {
            expeditorId,
          },
        };
        const { data } = await $axios.post(
          APIRoutes.CommandExpeditorConfigs,
          postData,
          config
        );
        return data;
      } catch (e) {
        const { notify } = useNotification();
        notify({ title: "Ошибка с конфигами", type: "error" });
      }
    };

    const getConfigById = async (expeditorId: string) => {
      try {
        const config = {
          headers: {
            Authorization: "Bearer " + useCookie("token").value,
            "Content-Type": "application/json",
            "Accept-Language": "ru-RU",
          },
          params: {
            expeditorId,
          },
        };
        const { data } = await $axios.get(
          APIRoutes.CommandExpeditorConfigs,
          config
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

    const closeEditDialog = async () => {
      editDialog.value = "";
      await refresh();
    };

    const closeConfigByIdDialog = async () => {
      configByIdDialog.value = "";
      await refresh();
    };

    const closeDeleteDialog = async () => {
      deleteDialog.value = "";
      await refresh();
    };

    const deleteExpeditor = async () => {
      if (!acceptDeleting.value) return;

      if (expeditorDeleting) {
        closeDeleteDialog();
        return;
      }
      expeditorDeleting = true;

      if (deleteDialog.value) {
        const { notify } = useNotification();
        try {
          await $axios.delete(
            APIRoutes.CommandExpeditorDelete(deleteDialog.value),
            conf
          );
          notify({ title: "Экспедитор успешно удален.", type: "success" });
        } catch (e) {
          notify({ title: "Ошибка при удалении экспедитора.", type: "error" });
        }
      }

      deleteDialog.value = "";

      expeditorDeleting = false;

      await _loadData();
    };

    const closeNewExpeditorDialog = async () => {
      newExpeditorDialog.value = false;
      await refresh();
    };

    const getExpeditorDetail = async (id: string) => {
      const response = await $axios.get<ExpeditorModel>(
        APIRoutes.CommandExpeditorDelete(id),
        conf
      );
      return response.data;
    };

    // endregion

    return {
      // States
      data,
      params,
      templates,
      editDialog,
      configByIdDialog,
      deleteDialog,
      acceptDeleting,
      newExpeditorDialog,

      // Actions
      getExpeditorDetail,
      closeNewExpeditorDialog,
      deleteExpeditor,
      closeEditDialog,
      closeConfigByIdDialog,
      closeDeleteDialog,
      getData,
      setPage,
      setPageSize,
      sortData,
      search,
      add,
      refresh,
      setFilters,
      getTerritories,
      getWarehousesList,
      getExpeditorsConfigsAll,
      getCurrencies,
      getTradeDirections,
      getConfigById,
      postConfigById,
      postExpeditorsConfigsAll,
    };
  })();
