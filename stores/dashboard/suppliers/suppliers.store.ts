import { defineStore } from "pinia";
import { Ref } from "vue";
import { AppResponse } from "~/interfaces/api/app-response";
import { Template } from "~/interfaces/ui/template";
import { APIRoutes } from "~/variable/api-routes";
import { useNotification } from "@kyvg/vue3-notification";
import { SupplierModel } from "~~/interfaces/api/supplier-model";

export const useSuppliersStore = (tableId: string) =>
  defineStore(`dashboard_suppliers_${tableId}`, () => {
    const { $axios } = useNuxtApp();

    // region States

    const data: Ref<AppResponse<SupplierModel> | undefined> = ref();
    const isLoading = ref(false);

    const params = reactive({
      page: 1,
      page_size: 10,
      search: "",
      order_by: {
        filed: "created_date",
        is_asc: true,
      },
      filter: [
        {
          field: "is_active",
          value: ["true"],
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

    const headers: Ref<Template[]> = ref([
      {
        name: "№",
        checked: true,
        key: "no",
        type: "no",
        thWidth: "40px",
        bRadius: "8px",
      },
      {
        name: "Название",
        checked: true,
        key: "name",
        type: "name",
        thWidth: "120px",
      },
      {
        name: "Номер телефона",
        checked: true,
        key: "phone",
        type: "phoneNumber",
        thWidth: "140px",
      },
      {
        name: "Адрес",
        checked: true,
        key: "address",
        type: "address",
        thWidth: "120px",
      },
      {
        name: "Aктивный ",
        checked: true,
        key: "is_active",
        type: "is_active",
        thWidth: "120px",
      },
      {
        name: "Действие",
        checked: true,
        key: "action",
        type: "action",
        thWidth: "140px",
      },
    ]);

    const deleteDialog = ref("");
    let acceptDeleting = ref(false);
    let suppliertDeleting = false;

    // endregion

    watch(params, async (value, oldValue, onCleanup) => {
      await _loadData();
    });

    // region Actions

    const getData = async () => {
      await _loadData();
    };

    const refresh = async () => {
      await _loadData();
    };

    const _loadData = async () => {
      isLoading.value = true;
      try {
        const response = await $axios.post<AppResponse<SupplierModel>>(
          APIRoutes.SuppliersList,
          params,
          conf
        );
        data.value = response.data;
      } catch (error) {
        console.log(error);
      }
      isLoading.value = false;
    };

    const getSupplierById = async (id: string) => {
      try {
        const { data } = await $axios.get<SupplierModel>(
          APIRoutes.SuppliersById(id),
          conf
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    };

    const onSaveSupplierById = async (
      supplierId: string,
      data: SupplierModel
    ) => {
      const { notify } = useNotification();
      try {
        await $axios.put(APIRoutes.SuppliersById(supplierId), data, conf);
        notify({ title: "Успешно сохранено!", type: "success" });
      } catch (error) {
        notify({ title: "Ошибка при сохранении!", type: "error" });
        console.log(error);
      }
      await refresh();
    };

    const onAddSupplier = async (data: SupplierModel) => {
      const { notify } = useNotification();
      try {
        await $axios.post(APIRoutes.Suppliers, data, conf);
        notify({ title: "Успешно добавлено!", type: "success" });
      } catch (error) {
        notify({ title: "Ошибка при добавлении!.", type: "error" });
        console.log(error);
      }
      await refresh();
    };

    const setPage = (page: number) => {
      params.page = page;
    };

    const setPageSize = (pageSize: number) => {
      params.page_size = pageSize;
    };

    const closeDeleteDialog = async () => {
      deleteDialog.value = "";
      await refresh();
    };

    const onDeleteSupplier = async () => {
      if (!acceptDeleting.value) return;

      if (suppliertDeleting) {
        closeDeleteDialog();
        return;
      }
      suppliertDeleting = true;

      if (deleteDialog.value) {
        const { notify } = useNotification();
        try {
          const url = APIRoutes.SuppliersById(deleteDialog.value);
          await $axios.delete(url, conf);
          notify({ title: "Поставщик успешно удален.", type: "success" });
        } catch (e) {
          notify({ title: "Ошибка при удалении поставщика.", type: "error" });
        }
      }

      deleteDialog.value = "";

      suppliertDeleting = false;

      await _loadData();
    };

    const onSearch = (value: string) => {
      params.page = 1;
      params.search = value;
    };

    const sortData = (data: any) => {
      params.order_by = data;
    };

    // endregion

    return {
      // States
      data,
      params,
      headers,
      deleteDialog,
      acceptDeleting,
      isLoading,

      // Actions
      onDeleteSupplier,
      closeDeleteDialog,
      getData,
      setPage,
      setPageSize,
      getSupplierById,
      onAddSupplier,
      onSaveSupplierById,
      refresh,
      onSearch,
      sortData,
    };
  })();
