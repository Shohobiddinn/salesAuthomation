import { defineStore } from "pinia";
import { APIRoutes } from "~/variable/api-routes";
import { ref, Ref } from "vue";
import { AppResponse } from "~/interfaces/api/app-response";
import { ListParams } from "~/interfaces/api/list-parameters";
import { UnwrapNestedRefs } from "@vue/reactivity";
import { Template } from "~/interfaces/ui/template";
import { WarehousesModel } from "~/interfaces/api/warehouses-model";
import { OrderStatusModel } from "~/interfaces/api/order-status-model";
import { UserModel } from "~/interfaces/api/user-model";

export const useWarehousesStore = (tableId: string) =>
  defineStore(`warehouses${tableId}`, () => {
    const { $axios } = useNuxtApp();

    // region States

    const data: Ref<AppResponse<WarehousesModel> | undefined> = ref();

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
          value: ["true"],
        },
      ],
    });
    const param: UnwrapNestedRefs<ListParams> = reactive({
      page: 1,
      page_size: 10,
      search: null,
      order_by: {
        field: "id",
        is_asc: true,
      },
      filter: [
        {
          field: "role",
          value: ["Warehousemen"],
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
        name: "Название",
        key: "name",
        thWidth: "140px",
        background: "1px solid red",
        checked: true,
      },
      {
        name: "Тип",
        key: "type",
        thWidth: "140px",
        checked: true,
      },
      {
        name: "Складчик",
        key: "warehouse_man",
        thWidth: "140px",
        checked: true,
      },
      {
        name: "Агенты",
        key: "warehouse_employee_models",
        thWidth: "140px",
        checked: true,
      },
      {
        name: "Способ оплаты",
        key: "warehouse_currency_models",
        thWidth: "140px",
        checked: true,
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
    const warehouseMan = ref([]) as any;
    const getWarehouseMan = async () => {
      const params = param;
      const response = await $axios.post<AppResponse<UserModel>>(
        APIRoutes.UsersList,
        params,
        conf
      );

      if (response.data) {
        warehouseMan.value = response.data;
      }
    };
    // region Actions

    const getData = async (type: boolean) => {
      if (type.toString()) {
        params.filter![0].value = [type.toString()]
      } else {
        await _loadData();
      }
    };

    const refresh = async () => {
      await _loadData();
    };

    const _loadData = async () => {
      const response = await $axios.post<AppResponse<WarehousesModel>>(
        APIRoutes.WarehousesList,
        params,
        conf
      );
      if (response.data) {
        data.value = response.data;
      }
    };

    const add = async (value: WarehousesModel): Promise<WarehousesModel> => {
      if (value.id !== undefined) {
        const response = await $axios.put<WarehousesModel>(
          APIRoutes.WarehousesWithId(value.id!.toString()),
          value,
          conf
        );
        return response.data;
      }
      const response = await $axios.post<WarehousesModel>(
        APIRoutes.Warehouses,
        value,
        conf
      );
      return response.data;
    };
    const allowDelete = async (id: any) => {
      if (id) {
        const { data } = await $axios.get<WarehousesModel>(
          APIRoutes.WarehousesAllowDelete(id!.toString()),
          conf
        );
        return data;
      }
    };
    const allowDeleteSuccess = async (id: string) => {
      if (id) {
        const response = await $axios.delete<WarehousesModel>(
          `${APIRoutes.Warehouses}?id=${id}`,
          conf
        );
        return response.data;
      }
    };
    const deActivate = async (id: any) => {
      if (id) {
        const response = await $axios.patch<WarehousesModel>(
          APIRoutes.WarehousesDeaActivate(id!.toString()),
          "",
          conf
        );
        return response.data;
      }
    };
    // const getWarehousesType = async () => {
    //     try {
    //         const data = await $axios.get(APIRoutes.SystemConstantsWarehouseTypes,
    //             conf
    //         );
    //         return data
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    let warehouseType = ref([]) as any;
    const getWarehousesType = async () => {
      warehouseType.value = await $axios.get<WarehousesModel>(
        APIRoutes.SystemConstantsWarehouseTypes,
        conf
      );
    };
    const activate = async (id: any) => {
      if (id) {
        const response = await $axios.patch<WarehousesModel>(
          APIRoutes.WarehousesActivate(id!.toString()),
          "",
          conf
        );
        return response.data;
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

    const getSuppliers = async (params: any) => {
      try {
        const { data } = await $axios.post(
          APIRoutes.SuppliersList,
          params,
          conf
        );
        return data;
      } catch (error) {
        console.log(error);
      }
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
      allowDelete,
      allowDeleteSuccess,
      deActivate,
      activate,
      getWarehousesType,
      getWarehouseMan,
      warehouseType,
      warehouseMan,
      getSuppliers,
    };
  })();
