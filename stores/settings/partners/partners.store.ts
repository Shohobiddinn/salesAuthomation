import { defineStore } from "pinia";
import { APIRoutes } from "~/variable/api-routes";
import { ref, Ref } from "vue";
import { AppResponse } from "~/interfaces/api/app-response";
import { ListParams } from "~/interfaces/api/list-parameters";
import { UnwrapNestedRefs } from "@vue/reactivity";
import { Template } from "~/interfaces/ui/template";
import { PartnersListModel } from "~~/interfaces/api/partners-list-model";
import { ProductCategoryModel } from "~~/interfaces/api/product-category-model";
import { useNotification } from "@kyvg/vue3-notification";

export const usePartnersStore = (tableId: string) => defineStore(`partners_${tableId}`, () => {
  const { $axios } = useNuxtApp();

  const data: Ref<AppResponse<PartnersListModel> | undefined> = ref();
  const deleteDialog = ref('')
  let acceptDeleting = ref(false)
  let partnerDeleting = false

  const params: UnwrapNestedRefs<ListParams> = reactive({
    page: 1,
    page_size: 10,
    search: null,
    order_by: {
      field: "created_date",
      is_asc: true,
    },
    filter: [
      {
        field: "is_active",
        value: ["true"],
      }
    ],
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
      name: "ФИО",
      checked: true,
      key: "fio",
      thWidth: "140px",
      isComputable: true,
    },
    {
      name: "Номер телефона",
      checked: true,
      key: "phone",
      type: "phone",
      thWidth: "140px",
    },
    {
      name: "E-mail",
      key: "email",
      thWidth: "140px",
      checked: true,
    },
  ]);


  watch(params, async (value, oldValue, onCleanup) => {
    await _loadData();

  });


  const getData = async (type: boolean) => {
    if (!params.search) {
      if (type.toString()) {
        params.filter![0].value = [type.toString()]
      } else {
        params.filter![0].value = [type.toString()]
      }
    } else params.search = null
  }

  const _loadData = async () => {
    try {
      const response = await $axios.post<AppResponse<PartnersListModel>>(APIRoutes.SettingsParnersList,
        params,
        conf,
      );
      if (response.data) {
        data.value = response.data;
      }
    } catch (error) {
      console.error(error);
    }

  }

  const add = async (value: PartnersListModel): Promise<PartnersListModel> => {
    try {
      if (value.id !== undefined) {
        const response = await $axios.put<PartnersListModel>(
          APIRoutes.SettingsPartnersId(value.id!.toString()),
          value,
          conf
        );
        return response.data;
      }
      const response = await $axios.post<PartnersListModel>(
        APIRoutes.SettingsPartners,
        value,
        conf
      );
      await _loadData();
      return response.data;
    } catch (error) {
      console.error(error);
    }

  };

  const getProductCategory = async (param: any) => {
    try {
      const response = await $axios.post<AppResponse<ProductCategoryModel>>(
        APIRoutes.ProductsCategoryList,
        param,
        conf
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }

  };

  const getParnerDetail = async (id: string) => {
    try {
      const response = await $axios.get<PartnersListModel>(
        APIRoutes.SettingsPartnersById(id),
        conf
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const closeDeleteDialog = async () => {
    deleteDialog.value = ''
    await _loadData();
  }

  const deletePartner = async () => {
    try {
      if (!acceptDeleting.value) return;
      if (partnerDeleting) {
        closeDeleteDialog();
        return;
      }
      partnerDeleting = true
      if (deleteDialog.value) {
        const { notify } = useNotification();
        try {

          const url = `${APIRoutes.SettingsPartners}?id=${deleteDialog.value}`
          await $axios.delete(url, conf)
          notify({ title: "Партнеры успешно удален.", type: "success", });
        }
        catch (e) {
          notify({ title: "Ошибка при удалении партнера.", type: "error", });
        }
      }
      deleteDialog.value = ''
      partnerDeleting = false
      await _loadData()
    } catch (error) {
      console.error(error);
    }
  }

  const setPage = (page: number) => {
    params.page = page;
  }

  const setPageSize = (pageSize: number) => {
    params.page_size = pageSize;
  }

  const sortData = (data: any) => {
    params.order_by = data;
  }
  const search = (value: string) => {
    params.page = 1;
    params.search = value;
  }
  // endregion

  return {
    data,
    params,
    templates,
    deleteDialog,
    acceptDeleting,

    getData,
    setPage,
    setPageSize,
    sortData,
    search,
    getProductCategory,
    getParnerDetail,
    add,
    deletePartner,
    closeDeleteDialog
  };
})();
