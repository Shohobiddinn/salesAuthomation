import { defineStore } from "pinia";
import { Ref } from "vue";
import { AppResponse } from "~/interfaces/api/app-response";
import { TaskModel } from "~/interfaces/api/tasks-models";
import { UnwrapNestedRefs } from "@vue/reactivity";
import { FilterParams, ListParams } from "~/interfaces/api/list-parameters";
import { Template } from "~/interfaces/ui/template";
import { APIRoutes } from "~/variable/api-routes";
import { useNotification } from "@kyvg/vue3-notification";
import { UserModel } from '~/interfaces/api/user-model'
import { TaskTypeModel } from "~/interfaces/api/tasks-models";
import { TaskStatusModel } from '~/interfaces/api/task-statuses-model'
import { ClientsModel } from '~/interfaces/api/clients-model'

export const useTasksStore = (tableId: string) => defineStore(`command_tasks_${tableId}`, () => {
  const { $axios } = useNuxtApp();

  // region States

  const data: Ref<AppResponse<TaskModel> | undefined> = ref();

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

  const headers: Ref<Template[]> = ref([
    {
      name: "Задание",
      checked: true,
      key: "task_description",
      type: "task",
      thWidth: '100px'
    },
    {
      name: "Клиент",
      checked: true,
      key: "client",
      type: "client",
      thWidth: '100px'
    },
    {
      name: "Назначающий",
      checked: true,
      key: "created_by",
      type: "assign",
      thWidth: '140px',
      bRadius: '8px'
    },
    {
      name: "Исполняющий",
      checked: true,
      key: "performer",
      type: "performer",
      thWidth: '140px'
    },
    {
      name: "Дата создание",
      checked: true,
      key: "created_date",
      type: "creation",
      thWidth: '140px'
    },
    {
      name: "Срок до",
      checked: true,
      key: "due_date",
      type: "deadline",
      thWidth: '100px'
    },
    {
      name: "Фото задании",
      checked: true,
      key: "file",
      type: "photoTask",
      thWidth: '140px'
    },
    {
      name: "Фото результата",
      checked: true,
      key: "result_file",
      type: "photoResult",
      thWidth: '140px'
    },
    {
      name: "Тип задачи",
      checked: true,
      key: "task_entity_type",
      type: "taskType",
      thWidth: '140px'
    },
    {
      name: "Статус",
      checked: true,
      key: "status",
      type: "status",
      thWidth: '140px'
    },
  ]);

  const filterStates = ref({
    firstRow: [
      { name: "Назначающий", key: "assigner", isOpen: false },
      { name: "Исполняющий", key: "performer", isOpen: false },
      { name: "Статус", key: "status", isOpen: false },
      { name: "Тип", key: "task_type", isOpen: false },
    ],
    secondRow: [
      { name: "", key: "btn" },
    ]
  })

  const editDialog = ref('')
  const changeStatus = ref({
    id: '',
    status: ''
  })
  const deleteDialog = ref('')
  let taskDeleting = false
  let acceptDeleting = ref(false)

  const newTaskDialog = ref(false)

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
      const response = await $axios.post<AppResponse<TaskModel>>(APIRoutes.CommandTasksList,
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

  const add = async (value: TaskModel): Promise<TaskModel | any> => {
    const { notify } = useNotification();
    if (value.id !== undefined) {
      try {
        const response = await $axios.put<TaskModel>(APIRoutes.CommandTasksById(value.id!.toString()),
          value,
          conf,
        );
        notify({ title: "Задача успешно изменено.", type: "success", });
        return response.data;
      } catch (error) {
        console.log(error);
        notify({ title: "Ошибка при изменении задачи.", type: "error", });
      }
    }
    try {
      const response = await $axios.post<TaskModel>(APIRoutes.CommandTasks,
        value,
        conf,
      );
      notify({ title: "Задача успешно добавлено.", type: "success", });
      return response.data;
    } catch (error) {
      console.log(error);
      notify({ title: "Ошибка при добалении задачи.", type: "error", });
    }
  }

  const getUsers = async (params: any) => {
    try {
      const { data } = await $axios.post<AppResponse<UserModel>>(APIRoutes.UsersList,
        params,
        conf
      );
      return data
    } catch (error) {
      console.log(error);
    }
  }

  const getTaskStatuses = async () => {
    try {
      const { data } = await $axios.get<TaskStatusModel>(APIRoutes.SystemConstantsTaskStatuses,
        conf
      )
      return data
    } catch (error) {
      console.log(error);
    }
  }

  const getTaskTypes = async (params: any) => {
    try {
      const { data } = await $axios.post<AppResponse<TaskTypeModel>>(APIRoutes.TaskTypesList,
        params,
        conf
      );
      return data
    } catch (error) {
      console.log(error);
    }
  }

  const onChangeStatus = async (id: string, comment: string) => {
    const { notify } = useNotification()
    let url = ''
    try {
      switch (changeStatus.value.status) {
        // confirm: api status null qivotti
        case 'Deleted':
          url = `${APIRoutes.CommandTasksDelete}?id=${id}&comment=${comment}`
          break;
        case 'Rejected':
          url = `${APIRoutes.CommandTasksReject}?id=${id}&comment=${comment}`
          break;
        case 'Completed':
          url = `${APIRoutes.CommandTasksSetComplete}?id=${id}&comment=${comment}`
          break;
        case 'Closed':
          url = `${APIRoutes.CommandTasksClose}?id=${id}&comment=${comment}`
          break;
        case 'Accepted':
          url = `${APIRoutes.CommandTasksAccept}?id=${id}&comment=${comment}`
          break;
        default:
          break;
      }
      !!url && await $axios.post(url, null, conf)
      notify({ title: "Статус успешно изменено.", type: "success", });
      await refresh()
      closeChangeStatusDiaog()
      return data
    } catch (error) {
      console.log(error);
      notify({ title: "Ошибка при изменении статуса.", type: "error", });
    }
  }

  const getClients = async (params: any) => {
    try {
      const { data } = await $axios.post<AppResponse<ClientsModel>>(APIRoutes.ClientsList,
        params,
        conf
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

  const closeChangeStatusDiaog = () => {
    changeStatus.value.id = ''
    changeStatus.value.status = ''
  }

  const deleteTask = async () => {

    if (!acceptDeleting.value) return;

    if (taskDeleting) {
      closeDeleteDialog();
      return;
    }
    taskDeleting = true

    if (deleteDialog.value) {
      try {
        await $axios.delete(APIRoutes.CommandTasksById(deleteDialog.value), conf)
        const { notify } = useNotification();
        notify({ title: "Задача успешно удалена.", type: "success", });
      }
      catch (e) {
        const { notify } = useNotification();
        notify({ title: "Ошибка при удалении задачи.", type: "error", });
      }
    }

    deleteDialog.value = ''

    taskDeleting = false

    await _loadData()
  }

  const closeNewTaskDialog = async () => {
    newTaskDialog.value = false
    await refresh()
  }

  const getTaskDetail = async (id: string) => {
    try {
      const response = await $axios.get<TaskModel>(APIRoutes.CommandTasksById(id),
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
    headers,
    editDialog,
    deleteDialog,
    acceptDeleting,
    newTaskDialog,
    filterStates,
    changeStatus,

    // Actions
    getTaskDetail,
    closeNewTaskDialog,
    deleteTask,
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
    getUsers,
    getTaskStatuses,
    getTaskTypes,
    closeChangeStatusDiaog,
    getClients,
    onChangeStatus
  };
})();
