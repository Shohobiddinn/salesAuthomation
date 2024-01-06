import { defineStore } from "pinia";
import { APIRoutes } from "~/variable/api-routes";
import { Ref } from "vue";
import { AppResponse } from "~/interfaces/api/app-response";
import { ListParams } from "~/interfaces/api/list-parameters";
import { UnwrapNestedRefs } from "@vue/reactivity";
import { Template } from "~/interfaces/ui/template";
import { OrderReturnTaraModel } from "~/interfaces/api/order-return-tara-model";
import { TarasModel } from "~~/interfaces/api/taras-model";
import { EmployeeModel } from "~~/interfaces/api/tasks-models";
import { notify } from "@kyvg/vue3-notification";
import { ConstantModel } from "~~/interfaces/api/library-constants-model";
import { AgentModel } from "~~/interfaces/api/agent-model";
import { refundTaraByIdModel } from "~~/interfaces/api/refund-tara-by-id-model";

export const useOrderReturnContainersStore = (tableId: string) =>
  defineStore(`order-return-tara_${tableId}`, () => {
    const { $axios } = useNuxtApp();

    // region States

    const data: Ref<AppResponse<OrderReturnTaraModel> | undefined> = ref();
    const isLoading = ref(false);
    const ordersIds = ref([]);

    let params: UnwrapNestedRefs<ListParams> = reactive({
      page: 1,
      page_size: 10,
      search: "",
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
      agent_id_arr: [],
      type_arr: [],
      status_arr: [],
      date_filter_type: 1,
      date_only_range: {
        from_value: "2023-01-01",
        to_value: "2023-09-12",
      },
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
        name: "",
        checked: true,
        key: "checkbox",
        type: "checkbox",
        thWidth: "40px",
        bRadius: "8px",
      },
      {
        name: "ID",
        checked: true,
        key: "visual_id",
        type: "visual_id",
        thWidth: "70px",
        bRadius: "8px",
      },

      {
        name: "Клиент",
        checked: true,
        key: "client_name",
        type: "client",
        thWidth: "100px",
      },
      {
        name: "Агент",
        checked: true,
        key: "agent_name",
        type: "agent",
        thWidth: "100px",
      },
      {
        name: "Кол-во",
        checked: true,
        key: "total_amount",
        type: "amount",
        thWidth: "70px",
      },
      {
        name: "Дата отгрузки",
        checked: true,
        key: "received_date",
        type: "received_date",
        thWidth: "140px",
      },
      {
        name: "Тара",
        checked: true,
        key: "tara",
        type: "tara",
        thWidth: "80px",
      },
      {
        name: "Тип",
        checked: true,
        key: "type_name",
        type: "type",
        thWidth: "80px",
      },
      {
        name: "Статус",
        checked: true,
        key: "status_name",
        type: "status",
        thWidth: "80px",
      },
      {
        name: "ID заказа",
        checked: true,
        key: "visual_id",
        type: "visual_id",
        thWidth: "120px",
      },
      {
        name: "Дата создания",
        checked: true,
        key: "created_date",
        type: "created_date",
        thWidth: "140px",
      },
      {
        name: "Дата обновления",
        checked: true,
        key: "last_modified_date",
        type: "last_modified_date",
        thWidth: "140px",
      },
      {
        name: "Сделано",
        checked: true,
        key: "created_by",
        type: "created_by",
        thWidth: "120px",
      },
      {
        name: "Обновлено",
        checked: true,
        key: "last_modified_by",
        type: "last_modified_by",
        thWidth: "120px",
      },
    ]);

    // endregion

    watch(params, async (value, oldValue, onCleanup) => {
      await _loadData();
    });

    // region Actions

    const setNullOrdersIds = () => {
      ordersIds.value = [];
    };

    const getData = async () => {
      await _loadData();
    };

    const refresh = async () => {
      await _loadData();
    };

    const _loadData = async () => {
      isLoading.value = true;
      try {
        const response = await $axios.post(
          APIRoutes.OrderRefundTaraList,
          params,
          conf
        );
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

    const add = async (
      value: OrderReturnTaraModel
    ): Promise<OrderReturnTaraModel | undefined> => {
      if (value.id !== undefined) {
        try {
          const response = await $axios.put<OrderReturnTaraModel>(
            APIRoutes.OrderRefundTara,
            value,
            conf
          );
          notify({ title: "Добавлено!" });
          return response.data;
        } catch (error) {
          notify({ title: "Ошибка в добавлении!", type: "error" });
          console.log(error);
        }
      } else {
        try {
          const response = await $axios.post<OrderReturnTaraModel>(
            APIRoutes.OrderRefundTara,
            value,
            conf
          );
          notify({ title: "Сохранено!" });
          return response.data;
        } catch (error) {
          notify({ title: "Ошибка в сохранении!", type: "error" });
          console.log(error);
        }
      }
    };

    const setRecievedStatus = async (orderId: string) => {
      try {
        await $axios.patch(
          APIRoutes.OrderRefundSetReceived(orderId),
          null,
          conf
        );
        notify({ title: "Сохранено!" });
      } catch (error) {
        notify({ title: "Ошибка!", type: "error" });
        console.log(error);
      }
    };

    const setCanceledStatus = async (orderId: string) => {
      try {
        await $axios.patch(
          APIRoutes.OrderRefundSetCanceled(orderId),
          null,
          conf
        );
        notify({ title: "Сохранено!" });
      } catch (error) {
        notify({ title: "Ошибка!", type: "error" });
        console.log(error);
      }
    };

    const onRestoreOrder = async (orderId: string) => {
      try {
        await $axios.patch(
          APIRoutes.OrderRefundSetRestored(orderId),
          null,
          conf
        );
        notify({ title: "Сохранено!" });
      } catch (error) {
        notify({ title: "Ошибка!", type: "error" });
        console.log(error);
      }
    };

    const getAgents = async (
      params: any
    ): Promise<AppResponse<AgentModel> | undefined> => {
      try {
        const { data } = await $axios.post(
          APIRoutes.CommandAgentsList,
          params,
          conf
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    };

    const getRefundTaraConstants = async (): Promise<object | undefined> => {
      try {
        const { data } = await $axios.get(APIRoutes.LibraryConstants, conf);
        const { TaraRefundType, TaraRefundStatus, TaraRefundDateFilterType } =
          data;
        return { TaraRefundType, TaraRefundStatus, TaraRefundDateFilterType };
      } catch (error) {
        console.log(error);
      }
    };

    const getTara = async (
      params: TarasModel
    ): Promise<AppResponse<TarasModel> | undefined> => {
      try {
        const { data } = await $axios.post(APIRoutes.TarasList, params, conf);
        return data;
      } catch (error) {
        console.log(error);
      }
    };

    const getAgentByClientId = async (
      ClientId: any
    ): Promise<AppResponse<EmployeeModel> | undefined> => {
      try {
        const { data } = await $axios.get(
          `${APIRoutes.ClientsIdAgents}?clientIds=${ClientId}`,
          conf
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    };

    const getTaraRefundById = async (
      orderId: string
    ): Promise<refundTaraByIdModel | undefined> => {
      try {
        const { data } = await $axios.get(
          APIRoutes.OrderRefundTaraById(orderId),
          conf
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    };

    // endregion

    return {
      // states
      data,
      params,
      templates,
      isLoading,
      ordersIds,

      // actions
      getData,
      setPage,
      setPageSize,
      sortData,
      search,
      add,
      refresh,
      getAgents,
      getTara,
      getAgentByClientId,
      setNullOrdersIds,
      setRecievedStatus,
      onRestoreOrder,
      setCanceledStatus,
      getRefundTaraConstants,
      getTaraRefundById,
    };
  })();
