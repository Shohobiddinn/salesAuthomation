import { defineStore } from "pinia";
import { APIRoutes } from "~/variable/api-routes";
import { ref, Ref } from "vue";
import { AppResponse } from "~/interfaces/api/app-response";
import { ListParams } from "~/interfaces/api/list-parameters";
import { UnwrapNestedRefs } from "@vue/reactivity";
import { Template } from "~/interfaces/ui/template";
import { OrdersModel } from "~/interfaces/api/orders-model";
import { IncomeModel } from "~/interfaces/api/income-model";
import { TaskStatusModel } from "~/interfaces/api/task-statuses-model";
import { ExpeditorModel } from "~~/interfaces/api/expeditor-model";
import { useNotification } from "@kyvg/vue3-notification";

export const useOrdersStore = (tableId: string) =>
  defineStore(`orders_${tableId}`, () => {
    const { $axios } = useNuxtApp();

    // region States

    const data: Ref<AppResponse<OrdersModel> | undefined> = ref();

    const errorMessage: Ref<string> = ref("");

    let params: UnwrapNestedRefs<ListParams> = reactive({
      page: 1,
      pageSize: 10,
      order_by: {
        field: "created_date",
        is_asc: true,
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
        thWidth: "70px",
      },
      {
        name: "№",
        checked: true,
        key: "visual_id",
        type: "visual_id",
        thWidth: "50px",
        bRadius: "8px",
      },
      {
        name: "Дата Заявки",
        checked: true,
        key: "order_date",
        type: "order_date",
        thWidth: "140px",
        bRadius: "8px",
      },
      {
        name: "Дата Отгрузки",
        checked: true,
        key: "shipped_date",
        type: "shipped_date",
        thWidth: "140px",
      },
      {
        name: "Клиент",
        checked: true,
        key: "client",
        type: "client_name",
        thWidth: "120px",
      },
      {
        name: "Отправитель",
        checked: true,
        key: "expeditor",
        type: "expeditor_name",
        thWidth: "140px",
      },
      {
        name: "Кол-во",
        checked: true,
        key: "count",
        type: "count",
        thWidth: "70px",
      },
      {
        name: "Type",
        checked: true,
        key: "type",
        type: "type",
        thWidth: "70px",
      },
      {
        name: "Статус",
        checked: true,
        key: "status",
        type: "status",
        thWidth: "120px",
      },
      {
        name: "Сумма",
        checked: true,
        key: "cost",
        type: "cost",
        thWidth: "100px",
      },
      {
        name: "Бонус",
        checked: true,
        key: "bonus",
        type: "bonus",
        thWidth: "70px",
      },
      {
        name: "Скидка",
        checked: true,
        key: "discount",
        type: "discount",
        thWidth: "70px",
      },

      {
        name: "Агент",
        checked: true,
        key: "agent_name",
        type: "agent_name",
        thWidth: "140px",
      },
    ]);

    // endregion

    watch(params, async (value, oldValue, onCleanup) => {
      await _loadData();
    });

    // region Actions

    const getData = async (par: any) => {
      params = par;
      await _loadData();
    };

    const refresh = async () => {
      await _loadData();
    };
    const cancel = async (orderId: any) => {
      try {
        await $axios.patch<AppResponse<OrdersModel>>(
          APIRoutes.OrdersCancel(orderId),
          "",
          conf
        );
      } catch (error: any) {
        errorMessage.value = error?.response?.data?.Messages[0];
      }
    };
    const restore = async (orderId: any) => {
      await $axios.patch<AppResponse<OrdersModel>>(
        APIRoutes.OrdersRestore(orderId),
        "",
        conf
      );
    };
    const setExpeditor = async (param: any) => {
      const queryString = Object.entries(param)
        .map(([key, values]) => {
          if (typeof values !== "object") {
            console.log(values);
            return `${key}=${values}`;
          } else {
            if (values && values.length > 0) {
              console.log(`${values.join(`&${key}=`)}`, "values");
              return `${key}=${values.join(`&${key}=`)}`;
            } else return;
          }
        })
        .filter((query) => query)
        .join("&");

      await $axios.patch<AppResponse<OrdersModel>>(
        APIRoutes.SetExpeditor(queryString),
        "",
        conf
      );
    };
    const setShipped = async (param: any) => {
      const { notify } = useNotification();
      try {
        await $axios.patch<AppResponse<OrdersModel>>(
          APIRoutes.OrdersShipped(
            param.id,
            param.expeditorId,
            param.shippedDate
          ),
          "",
          conf
        );
        notify({ title: "Сохранено!" });
      } catch (error) {
        notify({ title: "Ошибка!", type: "error" });
      }
    };
    const del = reactive([]);
    const deliver = async (param: any) => {
      console.log("param", param.id);
      await $axios.patch<AppResponse<OrdersModel>>(
        APIRoutes.OrdersDeliver(param.id, param.deliveredDate),
        del,
        conf
      );
    };
    const accepted = async (param: any) => {
      console.log("param", param.id);
      await $axios.patch<AppResponse<OrdersModel>>(
        APIRoutes.OrdersAccepted(param.id, param.expectedShippingdate),
        "",
        conf
      );
    };
    const _loadData = async () => {
      const queryString = Object.entries(params)
        .map(([key, values]) => {
          if (typeof values !== "object") {
            return `${key}=${values}`;
          } else {
            if (values && values.length > 0) {
              return `${key}=${values.join(`&${key}=`)}`;
            } else return;
          }
        })
        .filter((query) => query)
        .join("&");

      const url = `${APIRoutes.OrdersList}?${queryString}&OrderBy.Field=order_date&OrderBy.IsAsc=false`;

      try {
        const response = await $axios.get(url, conf);

        if (response.data) {
          data.value = response.data;
        }
      } catch (error) {
        console.log(error);
      }
      // const response = await $axios.get<AppResponse<OrdersModel>>(APIRoutes.OrdersList(page,size),
      //     conf,
      // );
      // if (response.data) {
      //     data.value = response.data;
      // }
    };
    const order = ref() as any;
    const getWithId = async (id: any) => {
      const response = await $axios.get<IncomeModel>(
        APIRoutes.OrderWithId(id!.toString()),
        conf
      );
      order.value = response.data;
    };
    const details = ref([]) as any;
    const getDetailId = async (id: any) => {
      const response = await $axios.get<IncomeModel>(
        APIRoutes.OrderDetailId(id!.toString()),
        conf
      );
      details.value = response.data;
    };
    const getOrderStatus = async (id: any) => {
      try {
        const { data } = await $axios.get<TaskStatusModel>(
          APIRoutes.SystemConstantsOrdersStatus,
          conf
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    };
    const getOrderBonus = async (params: any) => {
      try {
        const { data } = await $axios.post<TaskStatusModel>(
          APIRoutes.OrdersBonus(params.warehouse_id),
          params.data,
          conf
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    };
    const getOrderDiscounts = async (params: any) => {
      try {
        const { data } = await $axios.post<TaskStatusModel>(
          APIRoutes.OrdersDiscounts,
          params.data,
          conf
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    };
    const getManualBonus = async (params: any) => {
      const queryString = Object.entries(params)
        .map(([key, values]) => {
          if (typeof values !== "object") {
            console.log(values);
            return `${key}=${values}`;
          } else {
            if (values && values.length > 0) {
              console.log(`${values.join(`&${key}=`)}`, "values");
              return `${key}=${values.join(`&${key}=`)}`;
            } else return;
          }
        })
        .filter((query) => query)
        .join("&");
      console.log(queryString);

      // try {
      //     const { data } = await $axios.post<TaskStatusModel>(APIRoutes.OrdersManualBonus(queryString),
      //         params.data,
      //         conf
      //     )
      //     return data
      // } catch (error) {
      //     console.log(error);
      // }
    };

    const getOrderTypes = async (id: any) => {
      try {
        const { data } = await $axios.get<TaskStatusModel>(
          APIRoutes.SystemConstantsOrdersTypes,
          conf
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    };

    const onAddRequest = async (value: OrdersModel): Promise<OrdersModel> => {
      if (value.id !== undefined) {
        const response = await $axios.put<OrdersModel>(
          APIRoutes.OrderRequest,
          value,
          conf
        );
        return response.data;
      }
      const response = await $axios.post<OrdersModel>(
        APIRoutes.OrderRequest,
        value,
        conf
      );
      return response.data;
    };

    const onAddExchange = async (value: OrdersModel): Promise<OrdersModel> => {
      if (value.id !== undefined) {
        const response = await $axios.put<OrdersModel>(
          APIRoutes.OrderExchange,
          value,
          conf
        );
        return response.data;
      }
      const response = await $axios.post<OrdersModel>(
        APIRoutes.OrderExchange,
        value,
        conf
      );
      return response.data;
    };

    const onAddRefund = async (value: OrdersModel): Promise<OrdersModel> => {
      if (value.id !== undefined) {
        const response = await $axios.put<OrdersModel>(
          APIRoutes.OrderRefund,
          value,
          conf
        );
        return response.data;
      }
      const response = await $axios.post<OrdersModel>(
        APIRoutes.OrderRefund,
        value,
        conf
      );
      return response.data;
    };

    const getExpeditors = async (params: any) => {
      try {
        const { data } = await $axios.post<AppResponse<ExpeditorModel>>(
          APIRoutes.ExpeditorList,
          params,
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
      params.pageSize = pageSize;
    };

    const sortData = (data: any) => {
      params.order_by = data;
    };

    const search = (value: string) => {
      params.page = 1;
      params.search = value;
    };
    const manualBonusData = ref({
      bonusIds: [],
      warehouseId: "",
      data: [],
    });
    // endregion
    const bonuses = ref([]);
    const discounts = ref([]);
    const orderData = ref({});
    return {
      bonuses,
      data,
      errorMessage,
      params,
      templates,
      order,
      details,
      orderData,
      discounts,
      manualBonusData,
      getData,
      setPage,
      setPageSize,
      sortData,
      search,
      onAddRequest,
      onAddExchange,
      onAddRefund,
      refresh,
      getWithId,
      cancel,
      setShipped,
      deliver,
      restore,
      accepted,
      getDetailId,
      getOrderStatus,
      getOrderTypes,
      getOrderBonus,
      getManualBonus,
      getOrderDiscounts,
      setExpeditor,
      getExpeditors,
    };
  })();
