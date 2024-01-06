import { defineStore } from "pinia";
import { Ref } from "vue";
import { AppResponse } from "~/interfaces/api/app-response";
import { SupervisorModel, AgentModel } from "~/interfaces/api/supervisor-model";
import { UnwrapNestedRefs } from "@vue/reactivity";
import { FilterParams, ListParams } from "~/interfaces/api/list-parameters";
import { Template } from "~/interfaces/ui/template";
import { APIRoutes } from "~/variable/api-routes";
import { useNotification } from "@kyvg/vue3-notification";

export const useSupervisorsStore = (tableId: string) => defineStore(`command_supervisors_${tableId}`, () => {
  const { $axios } = useNuxtApp();

  // region States

  const data: Ref<AppResponse<SupervisorModel> | undefined> = ref();

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

  const templates: Ref<Template[]> = ref([
    {
      name: "ФИО",
      key: "fio",
      thWidth: '140px',
      checked: true,
      isComputable: true,
    },
    {
      name: "Агенты",
      key: "agents",
      thWidth: '180px',
      checked: true,
    },
    {
      name: "Версия APK",
      key: "apk_version",
      thWidth: '140px',
      checked: true,
    },
    {
      name: "Aктивный ",
      key: "is_active",
      thWidth: '140px',
      checked: true,
    },
    {
      name: "Доступ к приложение",
      key: "application_access",
      thWidth: '140px',
      checked: true,
    },
  ]);

  const editDialog = ref('')
  const deleteDialog = ref('')
  let agentDeleting = false
  let acceptDeleting = ref(false)

  const newAgentDialog = ref(false)

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
      const response = await $axios.post<AppResponse<SupervisorModel>>(APIRoutes.CommandSupervisorsList,
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

  const add = async (value: SupervisorModel): Promise<SupervisorModel | any> => {
    if (value.id !== undefined) {
      const response = await $axios.put<SupervisorModel>(APIRoutes.CommandSupervisorDelete(value.id!.toString()),
        value,
        conf,
      );
      return response.data;
    }
    const response = await $axios.post<SupervisorModel>(APIRoutes.CommandSupervisor,
      value,
      conf,
    );
    await refresh()
    return response.data;
  }

  const getAgents = async (params: any) => {
    try {
      const { data } = await $axios.post<AppResponse<AgentModel>>(APIRoutes.CommandAgentsList,
        params,
        conf,
      );
      return data
    } catch (error) {
      console.log(error);
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

  const deleteAgent = async () => {

    if (!acceptDeleting.value) return;

    if (agentDeleting) {
      closeDeleteDialog();
      return;
    }
    agentDeleting = true

    if (deleteDialog.value) {
      try {
        await $axios.delete(APIRoutes.CommandSupervisorDelete(deleteDialog.value), conf)
        const { notify } = useNotification();
        notify({ title: "Супервайзер успешно удален.", type: "success", });
      }
      catch (e) {
        const { notify } = useNotification();
        notify({ title: "Ошибка при удалении супервфйзера.", type: "error", });
      }
    }

    deleteDialog.value = ''

    agentDeleting = false

    await _loadData()
  }

  const closeNewAgentDialog = async () => {
    newAgentDialog.value = false
  }

  const getAgentDetail = async (id: string) => {
    try {
      const response = await $axios.get<SupervisorModel>(APIRoutes.CommandSupervisorDelete(id),
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
    templates,
    editDialog,
    deleteDialog,
    acceptDeleting,
    newAgentDialog,

    // Actions
    getAgentDetail,
    closeNewAgentDialog,
    deleteAgent,
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
    getAgents,
  };
})();
