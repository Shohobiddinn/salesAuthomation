import { defineStore } from "pinia";
import { Ref } from "vue";
import { AppResponse } from "~/interfaces/api/app-response";
import { AuditorModel } from "~/interfaces/api/auditor-model";
import { UnwrapNestedRefs } from "@vue/reactivity";
import { FilterParams, ListParams } from "~/interfaces/api/list-parameters";
import { Template } from "~/interfaces/ui/template";
import { APIRoutes } from "~/variable/api-routes";
import { useNotification } from "@kyvg/vue3-notification";

export const useAuditorsStore = (tableId: string) => defineStore(`command_auditors_${tableId}`, () => {
  const { $axios } = useNuxtApp();

  // region States

  const data: Ref<AppResponse<AuditorModel> | undefined> = ref();

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
        value: [
          "true"
        ],
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

  // create headers for big data-table of auditors

  const editDialog = ref('')
  const deleteDialog = ref('')
  const configByIdDialog = ref('')
  let auditorDeleting = false
  let acceptDeleting = ref(false)

  const newAuditorDialog = ref(false)

  // endregion

  watch(params, async (value, oldValue, onCleanup) => {
    await _loadData();
  });

  // region Actions

  const getData = async (type: any) => {
    if (type) {
      if (params.filter) {
        const i = params.filter.findIndex(f => f.field === "is_active")
        params.filter[i].value = [type.toString()]
      }
    }
    else await _loadData();
  }

  const refresh = async () => {
    await _loadData();
  }

  const _loadData = async () => {
    try {
      const response = await $axios.post<AppResponse<AuditorModel>>(APIRoutes.CommandAuditorsList,
        params,
        conf,
      );

      if (response.data) {
        data.value = response.data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  const add = async (value: AuditorModel): Promise<AuditorModel | any> => {
    if (value.id !== undefined) {
      const response = await $axios.put<AuditorModel>(APIRoutes.CommandAuditorsDelete(value.id!.toString()),
        value,
        conf,
      );
      return response.data;
    }
    const response = await $axios.post<AuditorModel>(APIRoutes.CommandAuditors,
      value,
      conf,
    );
    return response.data;
  }

  const getAuditorsConfigsAll = async () => {
    const { data } = await $axios.get(APIRoutes.CommandAuditorsConfigsAll, conf)
    return data
  }

  const postAuditorsConfigsAll = async (postData: any) => {
    const { notify } = useNotification();
    try {
      const { data } = await $axios.post(
        APIRoutes.CommandAuditorPostConfigsAll,
        postData,
        conf
      );
      notify({ title: "Конфиги успешно обновлены", type: "success" });
      return data;
    } catch (e) {
      notify({ title: "Ошибка с конфигами", type: "error", });
    }
  };

  const postConfigById = async (auditorId: string, postData: any) => {
    const config = {
      headers: {
        "Authorization": "Bearer " + useCookie("token").value,
        "Content-Type": "application/json",
        "accept": "*/*"
      },
      params: {
        auditorId
      }
    };
    try {
      const { data } = await $axios.post(
        APIRoutes.CommandAuditorsConfigs,
        postData,
        config
      );
      return data;
    } catch (e) {
      const { notify } = useNotification();
      notify({ title: "Ошибка с конфигами", type: "error", });
    }
  };

  const getConfigById = async (auditorId: string) => {
    const config = {
      headers: {
        "Authorization": "Bearer " + useCookie("token").value,
        "Content-Type": "application/json",
        "Accept-Language": "ru-RU"
      },
      params: {
        auditorId
      }
    };
    const { data } = await $axios.get(APIRoutes.CommandAuditorsConfigs,
      config,
    );
    return data
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

  const setFilters = (filters: FilterParams[]) => {
    params.filter!.length = 1;
    params.filter! = params.filter!.concat(filters);
  }

  const closeEditDialog = async () => {
    editDialog.value = ''
    await refresh()
  }

  const closeDeleteDialog = async () => {
    deleteDialog.value = ''
    await refresh()
  }

  const closeConfigByIdDialog = async () => {
    configByIdDialog.value = ''
    await refresh()
  }

  const deleteAuditor = async () => {
    if (!acceptDeleting.value) return;

    if (auditorDeleting) {
      closeDeleteDialog();
      return;
    }
    auditorDeleting = true

    if (deleteDialog.value) {
      try {
        await $axios.delete(APIRoutes.CommandAuditorsDelete(deleteDialog.value), conf)
        const { notify } = useNotification();
        notify({ title: "Аудитор успешно удален.", type: "success", });
      }
      catch (e) {
        const { notify } = useNotification();
        notify({ title: "Ошибка при удалении аудитора.", type: "error", });
      }
    }

    deleteDialog.value = ''

    auditorDeleting = false

    await _loadData()
  }

  const closeNewAuditorDialog = async () => {
    newAuditorDialog.value = false
    await refresh()
  }

  const getAuditorDetail = async (id: string) => {
    try {
      const response = await $axios.get<AuditorModel>(APIRoutes.CommandAuditorsDelete(id),
        conf,
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }


  // endregion


  return {
    // States
    data,
    params,
    editDialog,
    deleteDialog,
    acceptDeleting,
    newAuditorDialog,
    configByIdDialog,

    // Actions
    getAuditorDetail,
    closeNewAuditorDialog,
    deleteAuditor,
    closeEditDialog,
    closeDeleteDialog,
    getData,
    setPage,
    setPageSize,
    sortData,
    search,
    add,
    refresh,
    setFilters,
    closeConfigByIdDialog,
    getAuditorsConfigsAll,
    postConfigById,
    getConfigById,
    postAuditorsConfigsAll
  };
})();
