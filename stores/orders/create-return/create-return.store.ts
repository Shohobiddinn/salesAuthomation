import {defineStore} from "pinia";
import {APIRoutes} from "~/variable/api-routes";
import {OrdersModel} from "~/interfaces/api/orders-model";
import {AppResponse} from "~/interfaces/api/app-response";
import {OrderReturnTaraModel} from "~/interfaces/api/order-return-tara-model";

export const useCreateReturnStore = (tableId: string) => defineStore(`create_return_${tableId}`, () => {
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
        const response = await $axios.get<AppResponse<OrderReturnTaraModel>>(APIRoutes.OrderBonusType,conf);

        if (response.data) {
            bonusType.value = response.data;
        }
    }
    const discountType = ref({})
    const getDiscountType = async  () => {
        const response = await $axios.get<AppResponse<OrderReturnTaraModel>>(APIRoutes.OrderDiscountType,conf);

        if (response.data) {
            discountType.value = response.data;
        }
    }
    const add = async (value: OrdersModel): Promise<OrdersModel> => {
        console.log('value.id',value.id)
        if (value.id !== undefined) {
            const response = await $axios.put<OrdersModel>(APIRoutes.RefundOrderById(value.id!.toString()),
                value,
                conf,
            );
            return response.data;
        }
        const response = await $axios.post<OrdersModel>(APIRoutes.RefundOrder,
            value,
            conf,
        );
        return response.data;
    }

    return {
        getBonusType,
        getDiscountType,
        add,
        bonusType,
        discountType
    };
})();
