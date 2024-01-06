import { defineStore } from "pinia";
import { APIRoutes } from "~/variable/api-routes";
import { Ref } from "vue";
import { AppResponse } from "~/interfaces/api/app-response";
import { FilterParams, ListParams } from "~/interfaces/api/list-parameters";
import { UnwrapNestedRefs } from "@vue/reactivity";
import { Template } from "~/interfaces/ui/template";
import { UserModel } from "~/interfaces/api/user-model";
import { SystemConstantModel } from "~~/interfaces/api/system-constant-model";
import { UsersMeModel } from "~~/interfaces/api/users-me-model";

export const useUsersStore = (tableId: string) =>
  defineStore(`users_${tableId}`, () => {
    const { $axios } = useNuxtApp();

    // region States

    const data: Ref<AppResponse<UserModel> | undefined> = ref();

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
        name: "Логин",
        key: "login",
        thWidth: "140px",
        background: "1px solid red",
        checked: true,
      },
      {
        name: "ФИО",
        key: "fio",
        thWidth: "280px",
        checked: true,
        isComputable: true,
      },
      {
        name: "E-mail",
        key: "email",
        thWidth: "140px",
        checked: true,
      },
      {
        name: "Дилер",
        key: "dealer",
        thWidth: "140px",
        checked: true,
      },
      {
        name: "Роль",
        key: "role",
        thWidth: "140px",
        checked: true,
        isComputable: true,
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
      // await _loadData();
    });

    // region Actions

    const getData = async (type: boolean) => {
      if (type?.toString()) {
        params.filter![0].value = [type.toString()];
      } else {
        _loadData();
      }
    };

    const refresh = async () => {
      await _loadData();
    };

    const _loadData = async () => {
      try {
        const response = await $axios.post<AppResponse<UserModel>>(
          APIRoutes.UsersList,
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

    const getRoles = async () => {
      try {
        const { data } = await $axios.get<SystemConstantModel>(
          APIRoutes.SystemConstantsRoles,
          conf
        );
        return data;
      } catch (error) {
        console.error(error);
      }
    };

    const add = async (value: UserModel): Promise<UserModel> => {
      try {
        if (value.id !== undefined) {
          const response = await $axios.put<UserModel>(
            APIRoutes.UsersWithId(value.id!.toString()),
            value,
            conf
          );
          return response.data;
        }
        const response = await $axios.post<UserModel>(
          APIRoutes.Users,
          value,
          conf
        );
        return response.data;
      } catch (error) {
        console.error(error);
      }
    };

    const getMe = async (): Promise<UsersMeModel | undefined> => {
      try {
        const { data } = await $axios.get(
          APIRoutes.UsersMe,
          conf
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
      setFilters,
      getRoles,
      getMe,
    };
  })();
