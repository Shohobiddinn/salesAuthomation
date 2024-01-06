import { defineStore } from "pinia";
import { APIRoutes } from "~/variable/api-routes";
import { Ref } from "vue";
import { AppResponse } from "~/interfaces/api/app-response";
import { ListParams2 } from "~/interfaces/api/list-parameters";
import { UnwrapNestedRefs } from "@vue/reactivity";
import { Template } from "~/interfaces/ui/template";
import { ClientsOrderModel } from "~~/interfaces/api/clients-order-model";
import { ProductCategoryModel } from "~~/interfaces/api/product-category-model";
import { OrderStatusModel } from "~~/interfaces/api/order-status-model";
import { CurrencyModel } from "~~/interfaces/api/currency-model";

export const useClientsOrdersStore = (tableId: string) => {
  return defineStore(`clients_orders_${tableId}`, () => {
    const { $axios } = useNuxtApp();

    // region States

    const data: Ref<AppResponse<ClientsOrderModel> | undefined> = ref();

    const clientId = ref('')

    const loading = ref(false)

    const params: UnwrapNestedRefs<ListParams2> = reactive({
      Page: 1,
      PageSize: 10,
      search: null,
      Status: [],
      ProductCategory: [],
      Currency: [],
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
        name: "№",
        checked: true,
        key: "order_number",
        thWidth: "40px",
        bRadius: "8px",
      },
      {
        name: "Тип",
        checked: true,
        key: "type",
        thWidth: "80px",
      },
      {
        name: "Дата",
        checked: true,
        key: "order_date",
        thWidth: "140px",
      },
      {
        name: "Кол-во",
        checked: true,
        key: "amount",
        thWidth: "100px",
      },
      {
        name: "Объем",
        checked: true,
        key: "volume",
        thWidth: "140px",
      },
      {
        name: "Сумма",
        checked: true,
        key: "cost",
        thWidth: "140px",
      },
      {
        name: "Статус",
        checked: true,
        key: "status",
        thWidth: "140px",
        bRadius: "8px",
      },
      {
        name: "Коммент",
        checked: true,
        key: "comment",
        thWidth: "140px",
        bRadius: "8px",
      },
    ]);

    // endregion

    watch(params, async (value, oldValue, onCleanup) => {
      loading.value = true
      await _loadData();
      loading.value = false

    });

    const refresh = async () => {
      loading.value = true
      await _loadData();
      loading.value = false
    }

    const _loadData = async () => {
      if (!clientId.value) return
      try {
        const queryString = Object.entries(params)
          .map(([key, values]) => {
            if (typeof values !== 'object') {
              return `${key}=${values}`;
            } else {
              if (values?.length > 0) {
                return `${key}=${values.join(`&${key}=`)}`;
              } else return
            }
          }).filter(query => query).join('&')

        const url = `${APIRoutes.ClientOrdersById}?${queryString}&ClientId=${clientId.value}`;

        const response = await $axios.get<AppResponse<ClientsOrderModel>>(url, conf);

        if (response.data) {
          data.value = response.data;
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getData = async (_clientId: string) => {
      clientId.value = _clientId
      await _loadData()
    }

    const getProductCategories = async (params: any) => {
      try {
        const { data } = await $axios.post<AppResponse<ProductCategoryModel>>(APIRoutes.ProductsCategoryList, params, conf)
        return data
      } catch (error) {
        console.log(error);
      }
    }

    const getCurrencies = async (params: any) => {
      try {
        const { data } = await $axios.post<AppResponse<CurrencyModel>>(APIRoutes.CurrencyList,
          params,
          conf,
        );
        return data
      } catch (error) {
        console.log(error);
      }
    }

    const getOrderStatuses = async () => {
      try {
        const { data } = await $axios.get<OrderStatusModel[]>(APIRoutes.SystemConstantsOrderStatuses,
          conf
        );
        return data
      } catch (error) {
        console.log(error);
      }
    }

    const setPage = (page: number) => {
      params.Page = page;
    }

    const setPageSize = (pageSize: number) => {
      params.PageSize = pageSize;
    }

    const search = (value: string) => {
      params.Page = 1;
      params.search = value;
    }

    // endregion

    return {
      data,
      params,
      templates,
      loading,
      getData,
      refresh,
      setPage,
      setPageSize,
      search,
      getOrderStatuses,
      getProductCategories,
      getCurrencies
    };
  })();
};
