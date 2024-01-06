import { defineStore } from "pinia";
import { APIRoutes } from "~/variable/api-routes";
import { Ref } from "vue";
import { AppResponse } from "~/interfaces/api/app-response";
import { ListParams } from "~/interfaces/api/list-parameters";
import { UnwrapNestedRefs } from "@vue/reactivity";
import { Template } from "~/interfaces/ui/template";
import { Company_profile, CompanyPassword } from "~/interfaces/api/company_profile";
import { CompanyN } from "~/interfaces/api/company_profile";
import { CompanyProfileChangeC } from "~/interfaces/api/company_profile";

export const useCompany_profileStore = (tableId: string) => defineStore(`company_profile_${tableId}`, () => {
  const { $axios } = useNuxtApp();

  // region States

  const data: Ref<AppResponse<Company_profile> | undefined> = ref();

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

  // @ts-ignore
  const templates: Ref<Template[]> = ref([
    {
      name: "Название",
      key: "name",
      thWidth: '140px',
      background: '1px solid red',
      checked: true,
    },
    {
      name: "Наз. компании",
      key: "company_name",
      thWidth: '140px',
      checked: true,
    },
    {
      name: "Номер телефона",
      key: "phone",
      thWidth: '140px',
      checked: true,
    },
    {
      name: "Эл.почта",
      key: "email",
      thWidth: '140px',
      checked: true,
    },
    {
      name: "Адрес",
      key: "address",
      thWidth: '440px',
      checked: true,
    },
  ]);

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
    try {
      const response = await $axios.get(APIRoutes.CompanyProfilesList,
        conf,
      );
      if (response.data) {
        data.value = response.data;
      }
    } catch (error) {
      console.error(error)
    }

  }

  const add = async (value: Company_profile): Promise<Company_profile> => {
    try {
      if (value.id !== undefined) {
        const response = await $axios.put<Company_profile>(APIRoutes.CompanyProfilesWithId(value.id!.toString()),
          value,
          conf,
        );
        return response.data;
      }
      const response = await $axios.post<Company_profile>(APIRoutes.CompanyProfiles,
        value,
        conf,
      );
      return response.data;
    } catch (error) {
      console.error(error)
    }

  }
  const addNds = async (value: CompanyN): Promise<CompanyN> => {
    try {
      const response = await $axios.post<CompanyN>(APIRoutes.CompanyProfilesNds,
        value,
        conf,
      );
      return response.data
    } catch (error) {
      console.error(error)
    }

  }
  const addChangeConfig = async (value: CompanyProfileChangeC): Promise<CompanyProfileChangeC> => {
    try {
      const response = await $axios.post<CompanyProfileChangeC>(APIRoutes.CompanyProfilesConfig,
        value,
        conf,
      );
      return response.data
    } catch (error) {
      console.error(error)
    }

  }
  const addChangePassword = async (value: CompanyPassword): Promise<CompanyPassword> => {
    try {
      const response = await $axios.post<CompanyPassword>(APIRoutes.CompanyProfilesLogin,
        value,
        conf,
      );
      return response.data
    } catch (error) {
      console.error(error)
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
    getData,
    setPage,
    setPageSize,
    sortData,
    search,
    add,
    refresh,
    addNds,
    addChangeConfig,
    addChangePassword
  };
})();
