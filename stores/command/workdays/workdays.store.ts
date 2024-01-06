import { defineStore } from "pinia";
import { Ref } from "vue";
import { AppResponse } from "~/interfaces/api/app-response";
import { Template } from "~/interfaces/ui/template";
import { APIRoutes } from "~/variable/api-routes";
import { useNotification } from "@kyvg/vue3-notification";
import { WorkdaysModel } from "~~/interfaces/api/workdays-model";
import { RoleModel } from "~~/interfaces/api/role-model";


export const useWorkdaysStore = (tableId: string) => defineStore(`command_workdays_${tableId}`, () => {
  const { $axios } = useNuxtApp();

  // region States

  const data: Ref<AppResponse<WorkdaysModel> | undefined> = ref();

  const params = reactive({
    page: 1,
    page_size: 10,
    role: null,
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
      name: "",
      checked: false,
      key: "checkbox",
      type: "checkbox",
      thWidth: "20px",
    },
    {
      name: "Ф.И.О",
      checked: true,
      key: "full_name",
      type: "come",
      thWidth: '180px',
      isComputable: true
    },
    {
      name: "Должность",
      checked: true,
      key: "role",
      type: "come",
      thWidth: '120px'
    },
    {
      name: "Рабочий день",
      checked: true,
      key: "is_install",
      type: "come",
      thWidth: '120px'
    },
  ]);
  const editMultipleDialog = ref([])

  // endregion

  watch(params, async (value, oldValue, onCleanup) => {
    await _loadData();
  });

  // region Actions

  const getData = async () => {
    await _loadData();
  }

  const refresh = async () => {
    await _loadData();
  }

  const _loadData = async () => {
    let url = `${APIRoutes.CommandWorkingDaysList}?page=${params.page}&pageSize=${params.page_size}`
    if (params.role || params.role === 0) {
      url = `${APIRoutes.CommandWorkingDaysList}?page=${params.page}&pageSize=${params.page_size}&role=${params.role}`
    }
    const response = await $axios.get<AppResponse<WorkdaysModel>>(url, conf);

    if (response.data) {
      data.value = response.data;
    }
  }

  const getRoles = async () => {
    try {
      const { data } = await $axios.get<AppResponse<RoleModel>>(APIRoutes.SystemConstantsRoles, conf)
      return data
    } catch (error) {
      console.log(error);
    }
  }

  const onInstallWorkingDays = async (data: any) => {
    const { notify } = useNotification();

    try {
      await $axios.post(APIRoutes.CommandWorkingDaysCreate,
        data,
        conf,
      )
      notify({ title: "Рабочий день успешно установлен!", type: "success", });
    } catch (error) {
      console.log(error);
      notify({ title: "Ошибка в установлении рабочого дня!", type: "error", });
    }
  }

  const setPage = (page: number) => {
    params.page = page;
  }

  const setPageSize = (pageSize: number) => {
    params.page_size = pageSize;
  }

  const setNullMultipleDialog = async () => {
    editMultipleDialog.value = []
  }


  // endregion


  return {
    // States
    data,
    params,
    headers,
    editMultipleDialog,

    // Actions
    getData,
    setPage,
    setPageSize,
    refresh,
    setNullMultipleDialog,
    onInstallWorkingDays,
    getRoles
  };
})();
