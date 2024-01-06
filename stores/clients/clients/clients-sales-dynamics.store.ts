import { defineStore } from "pinia";
import moment from "moment";
import { APIRoutes } from "~/variable/api-routes";
import { Ref } from "vue";
import { AppResponse } from "~/interfaces/api/app-response";
import { ListParams2 } from "~/interfaces/api/list-parameters";
import { UnwrapNestedRefs } from "@vue/reactivity";
import { Template } from "~/interfaces/ui/template";
import {
  SalesDynamicsByCategoryModel,
  SalesDynamicsByDayAndMonthModel,
} from "~~/interfaces/api/sales-dynamics-model";

export const useClientSalesDynamicsStore = (tableId: string) => {
  return defineStore(`clients_sales_dynamics_${tableId}`, () => {
    const { $axios } = useNuxtApp();

    // region States
    const dynamicsByDay: Ref<SalesDynamicsByDayAndMonthModel[] | undefined> = ref();
    const dynamicsByMonth: Ref<SalesDynamicsByDayAndMonthModel[] | undefined> = ref();
    const dynamicsByCategory: Ref<SalesDynamicsByCategoryModel[] | undefined> = ref();
    const loading = ref(false);

    const params: UnwrapNestedRefs<ListParams2> = reactive({
      clientId: "",
      DateRange: {
        From: "2023-01-01",
        To: moment().format("YYYY-MM-DD"),
      },
    });

    const conf = {
      headers: {
        Authorization: "Bearer " + useCookie("token").value,
        "Content-Type": "application/json",
        "Accept-Language": "ru-RU",
      },
    };

    watch(params, async (value, oldValue, onCleanup) => {
      loading.value = true;
      await getSalesDynamicsByDay();
      await getSalesDynamicsByMonth();
      await getSalesDynamicsByCategory();
      loading.value = false;
    });

    const getSalesDynamicsByDay = async () => {
      try {
        const url = `${APIRoutes.ClientSalesDynamicsByDay}?ClientId=${params.clientId}&DateRange.From=${params.DateRange.From}&DateRange.To=${params.DateRange.To}`;
        const { data } = await $axios.get<SalesDynamicsByDayAndMonthModel[]>(url, conf);
        dynamicsByDay.value = data;
      } catch (error) {
        console.log(error);
      }
    };

    const getSalesDynamicsByMonth = async () => {
      try {
        const url = `${APIRoutes.ClientSalesDynamicsByMonth}?ClientId=${params.clientId}&DateRange.From=${params.DateRange.From}&DateRange.To=${params.DateRange.To}`;
        const { data } = await $axios.get<SalesDynamicsByDayAndMonthModel[]>(url, conf);
        dynamicsByMonth.value =  data;
      } catch (error) {
        console.log(error);
      }
    };

    const getSalesDynamicsByCategory = async () => {
      try {
        const url = `${APIRoutes.ClientSalesDynamicsByCategrory}?ClientId=${params.clientId}&DateRange.From=${params.DateRange.From}&DateRange.To=${params.DateRange.To}`;
        const { data } = await $axios.get<SalesDynamicsByCategoryModel>(url, conf);
        dynamicsByCategory.value = data;
      } catch (error) {
        console.log(error);
      }
    };

    return {
      dynamicsByDay,
      dynamicsByMonth,
      dynamicsByCategory,
      params,
      loading,
      getSalesDynamicsByDay,
      getSalesDynamicsByMonth,
      getSalesDynamicsByCategory,
    };
  })();
};
