import {defineStore} from "pinia";
import {APIRoutes} from "~/variable/api-routes";
import {OrdersModel} from "~/interfaces/api/orders-model";
import {AppResponse} from "~/interfaces/api/app-response";
import {OrderReturnTaraModel} from "~/interfaces/api/order-return-tara-model";
import { OrderStatusModel } from "~~/interfaces/api/order-status-model";

export const useExchangeStore = (tableId: string) => defineStore(`exchange_${tableId}`, () => {
    const {$axios} = useNuxtApp();
    const conf = {
        headers: {
            "Authorization": "Bearer " + useCookie("token").value,
            "Content-Type": "application/json",
            "Accept-Language": "ru-RU"
        }
    };
    const bonusType = ref({})
    const getBonusType = async  () => {
        try {
            const response = await $axios.get<AppResponse<OrderStatusModel>>(APIRoutes.OrderBonusType, conf);
        if (response.data) {
            bonusType.value = response.data;
        }
        } catch (error) {
            console.log(error);
        }
    }
    const discountType = ref({})
    const exchanges = ref({})
    const exchangesDetail = ref({})

    const getDiscountType = async  () => {
        try {
            const response = await $axios.get<AppResponse<OrderStatusModel>>(APIRoutes.OrderDiscountType, conf);
        if (response.data) {
            discountType.value = response.data;
        }
        } catch (error) {
            console.log(error);
        }
    }
    const getExchange = async  (id:any) => {
        const response = await $axios.get<AppResponse<OrderReturnTaraModel>>(APIRoutes.ExchangeById(id),conf);

        if (response.data) {
            exchanges.value = response.data;
        }
    }
    const getExchangeDetail = async  (id:any) => {
        const response = await $axios.get<AppResponse<OrderReturnTaraModel>>(APIRoutes.ExchangeByDetailId(id),conf);

        if (response.data) {
            exchangesDetail.value = response.data;
        }
    }
    const add = async (value: OrdersModel): Promise<OrdersModel> => {
        console.log('value.id',value.id)
        if (value.id !== undefined) {
            const response = await $axios.put<OrdersModel>(APIRoutes.ExchangeById(value.id!.toString()),
                value,
                conf,
            );
            return response.data;
        }
        const response = await $axios.post<OrdersModel>(APIRoutes.Exchange,
            value,
            conf,
        );
        return response.data;
    }
    return {
        getBonusType,
        getDiscountType,
        add,
        getExchange,
        getExchangeDetail,
        bonusType,
        discountType,
        exchanges,
        exchangesDetail
    };
})();
