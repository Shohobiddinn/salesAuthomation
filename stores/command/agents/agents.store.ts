import { defineStore } from "pinia";
import { APIRoutes } from "~/variable/api-routes";
import { Ref } from "vue";
import { AppResponse } from "~/interfaces/api/app-response";
import { FilterParams, ListParams } from "~/interfaces/api/list-parameters";
import { UnwrapNestedRefs } from "@vue/reactivity";
import { Template } from "~/interfaces/ui/template";
import { AgentModel } from "~/interfaces/api/agent-model";
import { useNotification } from "@kyvg/vue3-notification";
import { AgentType } from "~/interfaces/api/agent-type";

export const useAgentsStore = (tableId: string) =>
  defineStore(`command_agents_${tableId}`, () => {
    const { $axios } = useNuxtApp();

    // region States

    const data: Ref<AppResponse<AgentModel> | undefined> = ref();

    const agentTypes: Ref<AgentType[] | undefined> = ref();

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
        name: "ID оплаты",
        key: "id",
        thWidth: "140px",
        background: "1px solid red",
        checked: true,
      },
      {
        name: "ФИО",
        key: "fio",
        thWidth: "140px",
        checked: true,
        isComputable: true,
      },
      {
        name: "Версия APK",
        key: "apk_version",
        thWidth: "140px",
        checked: true,
      },
      {
        name: "Последная синхоризация",
        key: "last_sync",
        thWidth: "140px",
        checked: true,
      },
      {
        name: "Телефон",
        key: "phone",
        thWidth: "140px",
        checked: true,
      },
      {
        name: "Авторизоваться",
        key: "login",
        thWidth: "140px",
        checked: true,
      },
      {
        name: "Тип",
        key: "agent_type",
        thWidth: "140px",
        checked: true,
      },
    ]);

    const editDialog = ref("");
    const deleteDialog = ref("");
    let agentDeleting = false;
    let acceptDeleting = ref(false);

    const newAgentDialog = ref(false);

    // endregion

    watch(params, async (value, oldValue, onCleanup) => {
      await _loadData();
    });

    // region Actions

    const getData = async (type: boolean) => {
      if (params.filter) {
        const i = params.filter.findIndex((f) => f.field === "is_active");
        params.filter[i].value = [type.toString()];
      }
    };

    const refresh = async () => {
      await _loadData();
    };

    const _loadData = async () => {
      const response = await $axios.post<AppResponse<AgentModel>>(
        APIRoutes.CommandAgentsList,
        params,
        conf
      );
      data.value = response.data;
    };

    const add = async (value: AgentModel): Promise<AgentModel> => {
      if (value.id !== undefined) {
        const response = await $axios.put<AgentModel>(
          APIRoutes.CommandAgentDelete(value.id!.toString()),
          value,
          conf
        );
        return response.data;
      }
      const response = await $axios.post<AgentModel>(
        APIRoutes.CommandAgent,
        value,
        conf
      );
      await refresh();
      return response.data;
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

    const closeDeleteDialog = async () => {
      deleteDialog.value = "";
      await refresh();
    };

    const deleteAgent = async () => {
      if (!acceptDeleting.value) return;

      if (agentDeleting) {
        closeDeleteDialog();
        return;
      }
      agentDeleting = true;

      if (deleteDialog.value) {
        try {
          await $axios.delete(
            APIRoutes.CommandAgentDelete(deleteDialog.value),
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

      agentDeleting = false;

      await _loadData();
    };

    const closeNewAgentDialog = async () => {
      newAgentDialog.value = false;
    };

    const getAgentDetail = async (id: string) => {
      const response = await $axios.get<AgentModel>(
        APIRoutes.CommandAgentDelete(id),
        conf
      );
      return response.data;
    };

    const getAgentTypes = async () => {
      const res = await $axios.get<AgentType[]>(
        APIRoutes.SystemConstants("agent_types"),
        conf
      );

      agentTypes.value = res.data;
    };

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
      agentTypes,

      // Actions
      getAgentTypes,
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
    };
  })();
