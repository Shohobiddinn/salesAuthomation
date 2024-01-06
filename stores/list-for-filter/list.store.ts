import { defineStore } from "pinia";
import { APIRoutes } from "~/variable/api-routes";

export const useFilterListStore = (tableId: string) => defineStore(`filter_${tableId}`, () => {
    const { $axios } = useNuxtApp();

    // region States
    const conf = {
        headers: {
            "Authorization": "Bearer " + useCookie("token").value,
            "Content-Type": "application/json",
            "Accept-Language": "ru-RU"
        }
    };

    const getAgent = async (params: any) => {
        try {
            const { data } = await $axios.post(APIRoutes.CommandAgentsList,
                params,
                conf
            );
            return data
        } catch (error) {
            console.log(error);
        }
    }
    const getTerritories = async (params: any) => {
        try {
            const { data } = await $axios.post(APIRoutes.TerritoriesList,
                params,
                conf
            );
            return data
        } catch (error) {
            console.log(error);
        }
    }
    const getTara = async (params: any) => {
        try {
            const { data } = await $axios.post(APIRoutes.TarasList,
                params,
                conf
            );
            return data
        } catch (error) {
            console.log(error);
        }
    }
    const getPriceType = async (params: any) => {
        try {
            const { data } = await $axios.post(APIRoutes.PriceTypesList,
                params,
                conf
            );
            return data
        } catch (error) {
            console.log(error);
        }
    }
    const getCurrency = async (params: any) => {
        try {
            const { data } = await $axios.post(APIRoutes.CurrencyList,
                params,
                conf
            );
            return data
        } catch (error) {
            console.log(error);
        }
    }
    const getProductCategory = async (params: any) => {
        try {
            const { data } = await $axios.post(APIRoutes.ProductsCategoryList,
                params,
                conf
            );
            return data
        } catch (error) {
            console.log(error);
        }
    }
    const getCategoryClient = async (params: any) => {
        try {
            const { data } = await $axios.post(APIRoutes.ClientCategoriesList,
                params,
                conf
            );
            return data
        } catch (error) {
            console.log(error);
        }
    }
    const getWarehouses = async (params: any) => {
        try {
            const { data } = await $axios.post(APIRoutes.WarehousesList,
                params,
                conf
            );
            return data
        } catch (error) {
            console.log(error);
        }
    }
    const getExpeditors = async (params: any) => {
        try {
            const { data } = await $axios.post(APIRoutes.ExpeditorList,
                params,
                conf
            );
            return data
        } catch (error) {
            console.log(error);
        }
    }
    const getUnits = async (params: any) => {
        try {
            const { data } = await $axios.post(APIRoutes.UnitsList,
                params,
                conf
            );
            return data
        } catch (error) {
            console.log(error);
        }
    }
    const getKpiType = async () => {
        try {
            const { data } = await $axios.get(APIRoutes.KpiType,
                conf
            );
            return data
        } catch (error) {
            console.log(error);
        }
    }
    const getKpiRewardType = async () => {
        try {
            const { data } = await $axios.get(APIRoutes.KpiRewardType,
                conf
            );
            return data
        } catch (error) {
            console.log(error);
        }
    }
    const getSegments = async (params: any) => {
        try {
            const { data } = await $axios.post(APIRoutes.SegmentsList,
                params,
                conf
            );
            return data
        } catch (error) {
            console.log(error);
        }
    }
    const getProducts = async (params: any) => {
        try {
            const { data } = await $axios.post(APIRoutes.ProductsList,
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
        getTerritories,
        getTara,
        getAgent,
        getPriceType,
        getCurrency,
        getProductCategory,
        getCategoryClient,
        getWarehouses,
        getExpeditors,
        getUnits,
        getKpiType,
        getKpiRewardType,
        getSegments,
        getProducts
    };
})();
