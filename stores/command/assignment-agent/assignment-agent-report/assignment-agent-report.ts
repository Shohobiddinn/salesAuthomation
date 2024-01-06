import { defineStore } from "pinia";
import { Ref } from "vue";
import { AppResponse } from "~/interfaces/api/app-response";
import { Template } from "~/interfaces/ui/template";
import { APIRoutes } from "~/variable/api-routes";
import { AgentLimitReportModel } from "~/interfaces/api/agent-limit-report-model";
import { ProductsModel } from "~~/interfaces/api/products-model";
import { AgentModel } from "~~/interfaces/api/agent-model";
import { LimitTypeModel } from "~~/interfaces/api/limit-type-model";


export const useAssignmentReportsStore = (tableId: string) => defineStore(`command_assignment_report_${tableId}`, () => {
  const { $axios } = useNuxtApp();

  // region States

  const data: Ref<AppResponse<AgentLimitReportModel> | undefined> = ref();

  const params = reactive({
    page: 1,
    pageSize: 10,
    warehouse: [],
    agent: [],
    product: [],
    type: []
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
      name: "Агенты",
      checked: true,
      key: "agent",
      type: "",
      thWidth: '140px'
    },
    {
      name: "Склад",
      checked: true,
      key: "warehouse",
      type: "warehouse",
      thWidth: '140px'
    },
    {
      name: "Продукт",
      checked: true,
      key: "product",
      type: "product",
      thWidth: '200px',
      bRadius: '8px'
    },
    {
      name: "Период ограничении",
      checked: true,
      key: "type",
      type: "limitation",
      thWidth: '180px'
    },
    {
      name: "Органиченное кол-во",
      checked: true,
      key: "limit_amount",
      type: "limited",
      thWidth: '180px'
    },
    {
      name: "Продажа",
      checked: true,
      key: "sale_amount",
      type: "sale",
      thWidth: '140px'
    },
    {
      name: "Остаток за период",
      checked: true,
      key: "remain",
      type: "balance",
      thWidth: '160px'
    },
  ]);

  const filterStates = ref({
    firstRow: [
      { name: "Склад", key: "warehouse" },
      { name: "Агент", key: "agent" },
      { name: "Продукт", key: "product" },
      { name: "Тип", key: "type" },
      { name: "", key: "btn" },
    ]
  })

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
    const queryString = Object.entries(params)
      .map(([key, values]) => {
        if (typeof values !== 'object') {
          return `${key}=${values}`;
        } else {
          if (values.length > 0) {
            return `${key}=${values.join(`&${key}=`)}`;
          } else return
        }
      }).filter(query => query).join('&')

    const url = `${APIRoutes.CommandAgentsLimitReports}?${queryString}`;

    try {
      const response = await $axios.get<AppResponse<AgentLimitReportModel>>(url, conf);

      if (response.data) {
        data.value = response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setPage = (page: number) => {
    params.page = page;
  }

  const setPageSize = (pageSize: number) => {
    params.pageSize = pageSize;
  }

  const getProducts = async (params: any) => {
    try {
      const { data } = await $axios.post<AppResponse<ProductsModel>>(APIRoutes.ProductsList, params, conf)
      return data
    } catch (error) {
      console.log(error);
    }
  }

  const getAgents = async (params: any) => {
    try {
      const { data } = await $axios.post<AppResponse<AgentModel>>(APIRoutes.CommandAgentsList, params, conf)
      return data
    } catch (error) {
      console.log(error);
    }
  }

  const getWarehouses = async (params: any) => {
    const { data } = await $axios.post(APIRoutes.WarehousesList, params, conf)
    return data
  }

  const getLimitTypes = async () => {
    try {
      const { data } = await $axios.get<LimitTypeModel>(APIRoutes.CommandAgentLimitTypes, conf)
      return data
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
    filterStates,

    // Actions
    getData,
    setPage,
    setPageSize,
    refresh,
    getWarehouses,
    getAgents,
    getProducts,
    getLimitTypes
  };
})();
