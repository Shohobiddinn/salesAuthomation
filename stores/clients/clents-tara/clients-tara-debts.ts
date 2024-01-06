import { defineStore } from "pinia";
import { APIRoutes } from "~/variable/api-routes";
import { Ref } from "vue";
import { AppResponse } from "~/interfaces/api/app-response";
import { ListParams } from "~/interfaces/api/list-parameters";
import { UnwrapNestedRefs } from "@vue/reactivity";
import { Template } from "~/interfaces/ui/template";
import { BoxTypeModel } from "~/interfaces/api/box-type-model";
import { AgentModel } from "~/interfaces/api/agent-model";
import { UserModel } from "~/interfaces/api/user-model";
import { RejectModel } from "~~/interfaces/api/reject-model";
import { ClientCategoryModel } from "~~/interfaces/api/client-category-model";

export const useClientsTaraStore = (tableId: string) =>
  defineStore(`clients_taras_${tableId}`, () => {
    const { $axios } = useNuxtApp();

    // region States

    const data: Ref<AppResponse<BoxTypeModel> | undefined> = ref();
    const data1: Ref<AppResponse<BoxTypeModel> | undefined> = ref();

    const params: UnwrapNestedRefs<ListParams> = reactive({
      page: 1,
      page_size: 10,
      agent: [],
      territory: [],
      tara: [],
      type: [],
    });
    // const params1: UnwrapNestedRefs<ListParams> = reactive({
    //     page: 1,
    //     page_size: 10,
    //     agent: [],
    //     territory: [],
    //     tara: [],
    //     type: []
    // });
    const conf = {
      headers: {
        Authorization: "Bearer " + useCookie("token").value,
        "Content-Type": "application/json",
        "Accept-Language": "ru-RU",
      },
    };

    const templates: Ref<Template[]> = ref([
      {
        name: "ID",
        checked: true,
        key: "id",
        type: "id",
        thWidth: "80px",
      },
      {
        name: "Территория",
        checked: true,
        key: "territory",
        type: "territory",
        thWidth: "120px",
        bRadius: "8px",
      },
      {
        name: "Никнейм",
        checked: true,
        key: "client",
        type: "client",
        thWidth: "120px",
      },
      {
        name: "Тара",
        checked: true,
        key: "tara",
        type: "tara",
        thWidth: "120px",
      },
      {
        name: "Кол-во",
        checked: true,
        key: "count",
        type: "count",
        thWidth: "140px",
      },
      {
        name: "Номер телефона",
        checked: true,
        key: "phone",
        type: "phone",
        thWidth: "140px",
      },
      {
        name: "ИНН",
        checked: true,
        key: "inn",
        type: "inn",
        thWidth: "140px",
      },
    ]);
    // endregion

    watch(params, async (value, oldValue, onCleanup) => {
      await _loadData();
    });

    // region Actions

    const getData = async (param: boolean) => {
      const response = await $axios.post<AppResponse<BoxTypeModel>>(
        APIRoutes.ClientsTara,
        param,
        conf
      );

      if (response.data) {
        data.value = response.data;
      }
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

    const getTara = async (params: any) => {
      try {
        const { data } = await $axios.post<AppResponse<UserModel>>(
          APIRoutes.TarasList,
          params,
          conf
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    };

    const refresh = async () => {
      await _loadData();
    };

    const _loadData = async () => {
      const response = await $axios.post<AppResponse<BoxTypeModel>>(
        APIRoutes.ClientsTara,
        params,
        conf
      );

      if (response.data) {
        data.value = response.data;
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
      data1,
      params,
      templates,
      getData,
      getTerritories,
      getTara,
      setPage,
      setPageSize,
      sortData,
      search,
      refresh,
      getAgent,
    };
  })();
