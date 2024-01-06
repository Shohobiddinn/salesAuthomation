import {defineStore} from "pinia";
import {APIRoutes} from "~/variable/api-routes";
import {Ref} from "vue";
import {AppResponse} from "~/interfaces/api/app-response";
import { ListParams2} from "~/interfaces/api/list-parameters";
import {UnwrapNestedRefs} from "@vue/reactivity";
import {Template} from "~/interfaces/ui/template";
import {ClientPaymentModel, ClientsModel} from "~/interfaces/api/clients-model";
import { CashboxesModel } from "~~/interfaces/api/cashboxes-model";
import { notify } from "@kyvg/vue3-notification";

export const useClientsPaymentStore = (tableId: string) => {
    return defineStore(`clients_payment_${tableId}`, () => {
        const {$axios} = useNuxtApp();

        // region States

        const data: Ref<AppResponse<ClientPaymentModel> | undefined> = ref();
        const priceRange = ref([300, 600])
        const priceStep = ref(10)
        const price = ref({min: 10, max: 1000})
        let isLoading = false
        const clientsId = ref([]) as any
        const clientsPaymentId = ref([]) as any
        const paymentList = ref([])
        const dataGroups = ref([])

        const params: UnwrapNestedRefs<ListParams2> = reactive({
            page: 1,
            page_size: 20,
            search: null,
            // order_by: {
            //     field: "id",
            //     is_asc: true,
            // },
            agent: [],
            territory: [],
            expeditor: [],  
            price_type: [],
            cashbox: [],
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
                name: "",
                checked:true,
                key: "checkbox",
                type:"checkbox",
                thWidth:'100px'
            },
            {
                name: "ID оплаты",
                checked:true,
                key: "id",
                type:"id",
                thWidth:'280px'
            },
            {
                name: "Дата оплаты",
                checked:true,
                key: "payment_received_date",
                type:"payment_received_date",
                thWidth:'120px',
                bRadius:'8px'
            },
            {
                name: "Дата получение оплаты",
                checked:true,
                key: "payment_approved_date",
                type:"payment_approved_date",
                thWidth:'200px'
            },
            {
                name: "Клиент",
                checked:true,
                key: "client_name",
                type:"client_name",
                thWidth:'100px'
            },
            {
                name: "Клиент (юр. название)",
                checked:true,
                key: "payment_courier_name",
                type:"payment_courier_name",
                thWidth:'180px'
            },
            {
                name: "Тип",
                checked:true,
                key: "transaction_type",
                type:"transaction_type",
                thWidth:'100px'
            },
            {
                name: "Способ оплаты",
                checked:true,
                key: "currency_name",
                type:"currency_name",
                thWidth:'140px'
            },
            {
                name: "Сумма",
                checked:true,
                key: "payment_amount",
                type:"payment_amount",
                thWidth:'140px'
            },
        ]);


        const getData = async () => {
            isLoading=true
            const response = await $axios.get<AppResponse<ClientsModel>>(APIRoutes.ClientsPaymentList,conf);
            if (response.data) {
                data.value = response.data;
                isLoading=false
            }
        }

        const add = async (value: ClientsModel): Promise<ClientsModel> => {
            const response = await $axios.post<ClientsModel>(APIRoutes.ClientsPaymentCreate,
                value,
                conf,
            );
            return response.data;
        }

        const addGroup = async (value: ClientsModel): Promise<ClientsModel> => {
            const response = await $axios.post<ClientsModel>(APIRoutes.ClientsPaymentCreateGroup,
                value,
                conf,
            );
            return response.data;
        }

        const deletePayment = async (id:string) => {
            try {
                const url = APIRoutes.ClientPaymentInfoById(id);
                await $axios.delete(url, conf);
                notify({ title: "Оплата успешно удален.", type: "success" });
            } catch (e) {
                notify({ title: "Ошибка при удалении оплату.", type: "error" });
            }
      
            await _loadData();
        };

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


        const getAgents = async (params: any) => {
            try {
              const { data } = await $axios.post<AppResponse<AgentModel>>(
                APIRoutes.CommandAgentsList,
                params,
                conf
              );
              return data;
            } catch (error) {
              console.log(error);
            }
        };

        const getExpeditors = async (params: any) => {
            try {
              const { data } = await $axios.post<AppResponse<ExpeditorModel>>(
                APIRoutes.ExpeditorList,
                params,
                conf
              );
              return data;
            } catch (error) {
              console.log(error);
            }
        };

        const getPriceTypes = async (params: any) => {
            try {
              const { data } = await $axios.post<AppResponse<PriceTypesModels>>(
                APIRoutes.PriceTypesList,
                params,
                conf
              );
              return data;
            } catch (error) {
              console.log(error);
            }
        };

        const getTerritories = async (params: any) => {
            try {
              const { data } = await $axios.post<AppResponse<TerritoryModel>>(
                APIRoutes.TerritoriesList,
                params,
                conf
              );
              return data;
            } catch (error) {
              console.log(error);
            }
        };

        const getcashboxes = async () => {
            try {
              const { data } = await $axios.get<AppResponse<CashboxesModel>>(
                APIRoutes.Cashboxes,
                conf
              );
              return data;
            } catch (error) {
              console.log(error);
            }
        };

        watch(params, async (value, oldValue, onCleanup) => {
            await _loadData();
        });
        

        const _loadData = async () => {
            isLoading=true
            let paramsQueryArray:string[]=[]
            
            Object.entries(params)
                .forEach(([key, values]) => {
                    if (typeof values !== "object") {
                        paramsQueryArray.push(`${key}=${values}`) 
                    } else {
                        if (values && values?.length > 0) paramsQueryArray.push(`${key}=${values.join(`&${key}=`)}`) 
                    }
                })
            
            
            const paramsQuery = paramsQueryArray.join("&");

            const url = `${APIRoutes.ClientsPaymentList}?${paramsQuery}`;
            try {
                const response = await $axios.get(url, conf);
        
                if (response.data) {
                    data.value = response.data;
                    isLoading=false
                }
            } catch (error) {
                console.log(error);
                isLoading=false
            }
        }



        return {
            data,
            params,
            isLoading,
            price,
            templates,
            priceRange,
            priceStep,
            clientsId,
            clientsPaymentId,
            paymentList,
            dataGroups,
            getData,
            setPage,
            setPageSize,
            sortData,
            search,
            add,
            addGroup,
            getAgents,
            getTerritories,
            getcashboxes,
            getPriceTypes,
            getExpeditors
        };
    })();
};
