import { defineStore } from "pinia";
import { APIRoutes } from "~/variable/api-routes";
import { Ref } from "vue";
import { AppResponse } from "~/interfaces/api/app-response";
import { ListParams2 } from "~/interfaces/api/list-parameters";
import { UnwrapNestedRefs } from "@vue/reactivity";
import { Template } from "~/interfaces/ui/template";
import { ClientDetailDeviceModel } from "~~/interfaces/api/ClientDetailDeviceModel";

export const useClientDetailsDevicesStore = (tableId: string) => {
  return defineStore(`clients_devices_${tableId}`, () => {
    const { $axios } = useNuxtApp();

    // region States

    const dataOfMainTable: Ref<AppResponse<ClientDetailDeviceModel> | undefined> = ref();
    const dataOfWithdrawTable: Ref<AppResponse<ClientDetailDeviceModel> | undefined> = ref();
    const loadingMainTable = ref(false);
    const loadingWithdrawTable = ref(false)

    const paramsOfMainTable: UnwrapNestedRefs<ListParams2> = reactive({
      clientId: '',
      Page: 1,
      PageSize: 10,
      Search: '',
      OrderBy: {
        field: "inventory_type_name",
        is_asc: true,
      },
    });

    const paramsOfWithdrawTable: UnwrapNestedRefs<ListParams2> = reactive({
      clientId: '',
      Page: 1,
      PageSize: 10,
      Search: '',
      OrderBy: {
        field: "inventory_type_name",
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

    const headers: Ref<Template[]> = ref([
      {
        name: "№",
        checked: true,
        key: "orderNumber",
        thWidth: "40px",
        bRadius: "8px",
      },
      {
        name: "Тип инвентаря",
        checked: true,
        key: "inventory_type_name",
        thWidth: "140px",
      },
      {
        name: "Тип",
        checked: true,
        key: "name",
        thWidth: "80px",
      },
      {
        name: "Дата прикрепления",
        checked: true,
        key: "attachment_date",
        thWidth: "140px",
      },
      {
        name: "Серийный номер",
        checked: true,
        key: "serial_number",
        thWidth: "160px",
      },
      {
        name: "Интвертарный номер",
        checked: true,
        key: "inventory_number",
        thWidth: "160px",
      },
    ]);

    // endregion

    // main table functions

    watch(paramsOfMainTable, async (value, oldValue, onCleanup) => {
      loadingMainTable.value = true;
      await _loadDataMainTable();
      loadingMainTable.value = false;
    });

    const refreshMainTable = async () => {
      loadingMainTable.value = true;
      await _loadDataMainTable();
      loadingMainTable.value = false;
    };

    const _loadDataMainTable = async () => {
      try {
        const queryString = Object.entries(paramsOfMainTable)
          .map(([key, values]) => {
            if (typeof values !== 'object') {
              return `${key}=${values}`;
            } else {
              return Object.entries(values)
                .map(([subKey, subValue]) => `${key}.${subKey}=${subValue}`)
                .join('&');
            }
          })
          .filter(query => query !== null)
          .join('&');

        const url = `${APIRoutes.ClientDeviceCurrentList}?${queryString}`;

        const response = await $axios.get<AppResponse<ClientDetailDeviceModel>>(url, conf);

        dataOfMainTable.value = response.data;

      } catch (error) {
        console.log(error);
      }
    };

    const getDataMainTable = async () => {
      await _loadDataMainTable();
    };

    const setPageToMain = (page: number) => {
      paramsOfMainTable.Page = page;
    };

    const setPageSizeToMain = (pageSize: number) => {
      paramsOfMainTable.PageSize = pageSize;
    };

    const searchFromMain = (value: string) => {
      paramsOfMainTable.Page = 1;
      paramsOfMainTable.Search = value;
    };

    const sortMainTableData = (data: any) => {
      paramsOfMainTable.OrderBy = data;
    }

    // end main table functions

    // withdraw table functions

    watch(paramsOfWithdrawTable, async (value, oldValue, onCleanup) => {
      loadingWithdrawTable.value = true;
      await _loadDataWithdrawTable();
      loadingWithdrawTable.value = false;
    });

    const refreshWithdrawTable = async () => {
      loadingWithdrawTable.value = true;
      await _loadDataWithdrawTable();
      loadingWithdrawTable.value = false;
    };

    const _loadDataWithdrawTable = async () => {
      try {
        const queryString = Object.entries(paramsOfWithdrawTable)
          .map(([key, values]) => {
            if (typeof values !== 'object') {
              return `${key}=${values}`;
            } else {
              return Object.entries(values)
                .map(([subKey, subValue]) => `${key}.${subKey}=${subValue}`)
                .join('&');
            }
          })
          .filter(query => query !== null)
          .join('&');

        const url = `${APIRoutes.ClientDeviceWithdrawnList}?${queryString}`;

        const response = await $axios.get<AppResponse<ClientDetailDeviceModel>>(url, conf);

        dataOfWithdrawTable.value = response.data;

      } catch (error) {
        console.log(error);
      }
    };

    const getDataWithdrawTable = async () => {
      await _loadDataMainTable();
    };

    const setPageToWithdraw = (page: number) => {
      paramsOfWithdrawTable.Page = page;
    };

    const setPageSizeToWithdraw = (pageSize: number) => {
      paramsOfWithdrawTable.PageSize = pageSize;
    };

    const searchFromWithdraw = (value: string) => {
      paramsOfWithdrawTable.Page = 1;
      paramsOfWithdrawTable.Search = value;
    };

    const sortWithdrawTableData = (data: any) => {
      paramsOfWithdrawTable.OrderBy = data;
    }

    // end withdraw table functions

    // endregion

    return {
      dataOfMainTable,
      dataOfWithdrawTable,
      paramsOfMainTable,
      paramsOfWithdrawTable,
      headers,
      loadingMainTable,
      loadingWithdrawTable,
      getDataMainTable,
      getDataWithdrawTable,
      refreshMainTable,
      setPageToMain,
      setPageSizeToMain,
      setPageToWithdraw,
      setPageSizeToWithdraw,
      searchFromMain,
      searchFromWithdraw,
      refreshWithdrawTable,
      sortMainTableData,
      sortWithdrawTableData,
    };
  })();
};
