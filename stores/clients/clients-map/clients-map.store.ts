import { defineStore } from "pinia";
import { APIRoutes } from "~/variable/api-routes";
import { Ref } from "vue";
import { AppResponse } from "~/interfaces/api/app-response";
import { BoxTypeModel } from "~/interfaces/api/box-type-model";
import { AgentModel } from "~/interfaces/api/agent-model";
import { TerritoryModel } from "~~/interfaces/api/territory-model";
import { ClientCategoryModel } from "~~/interfaces/api/client-category-model";
import { ClientTypeModel } from "~~/interfaces/api/client-type-model";
import { ClientMapParamsModel } from "~~/interfaces/api/client-map-params-model";
import { ClientFilterMapsModel } from "~~/interfaces/api/client-filter-maps-model";


export const useClientsmappStore = (tableId: string) => defineStore(`clients_map_${tableId}`, () => {
  const { $axios } = useNuxtApp();

  // region States

  const params: UnwrapNestedRefs<ClientMapParamsModel> = reactive({
    agents: [],
    days: [],
    territories: [],
    clientCategories: [],
    clientTypes: [],
    isActive: null,
    isRquipment: null,
  });

  const data: Ref<AppResponse<ClientFilterMapsModel> | undefined> = ref();

  const conf = {
    headers: {
      "Authorization": "Bearer " + useCookie("token").value,
      "Content-Type": "application/json",
      "Accept-Language": "ru-RU"
    }
  };

  const getData = async () => {
    await _loadData();
  }

  const refresh = async () => {
    await _loadData();
  }

  const _loadData = async () => {
    try {
      const queryString = Object.entries(params)
        .map(([key, values]) => {
          if (typeof values !== 'object') {
            return `${key}=${values}`;
          } else {
            if (values !== null && values.length > 0) {
              return `${key}=${values.join(`&${key}=`)}`;
            } else return
          }
        }).filter(query => query).join('&')

      const url = `${APIRoutes.ClientsMap}?${queryString}`;
      const response = await $axios.get(url, conf);

      if (response.data) {
        data.value = response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  watch(params, async (value, oldValue, onCleanup) => {
    await _loadData();
  });

  const getTerritories = async (params: any) => {
    try {
      const { data } = await $axios.post<AppResponse<TerritoryModel>>(APIRoutes.TerritoriesList,
        params,
        conf
      );
      return data
    } catch (error) {
      console.log(error);
    }
  }

  const getClientCategories = async (params: any) => {
    try {
      const { data } = await $axios.post<AppResponse<ClientCategoryModel>>(APIRoutes.ClientCategoriesList,
        params,
        conf
      );
      return data
    } catch (error) {
      console.log(error);
    }
  }

  const getClientTypes = async (params: any) => {
    try {
      const { data } = await $axios.post<AppResponse<ClientTypeModel>>(APIRoutes.ClientTypesList,
        params,
        conf
      );
      return data
    } catch (error) {
      console.log(error);
    }
  }

  const getAgents = async (params: any) => {
    try {
      const { data } = await $axios.post<AppResponse<AgentModel>>(APIRoutes.CommandAgentsList,
        params,
        conf
      );
      return data
    } catch (error) {
      console.log(error);
    }
  }

  // endregion

  return {
    data,
    params,
    getTerritories,
    getClientCategories,
    getClientTypes,
    getAgents,
    getData,
    refresh
  };
})();
