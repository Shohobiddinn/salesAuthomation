import {defineStore} from "pinia";
import {APIRoutes} from "~/variable/api-routes";
import {Ref} from "vue";
import {CashboxesModel} from "~/interfaces/api/cashboxes-model";
import {Template} from "~/interfaces/ui/template";


export const useCashboxesStore = () => defineStore('cashboxes', () => {
    const {$axios} = useNuxtApp();

    // region States

    const data = ref<CashboxesModel[]>([])

    const conf = {
        headers: {
            "Authorization": "Bearer " + useCookie("token").value,
            "Content-Type": "application/json",
            "Accept-Language": "ru-RU"
        }
    };

    const isLoading = ref(false);


    const templates: Ref<Template[]> = ref([
        {
            name: "Касса",
            key: "name",
            thWidth: '353px',
            checked: true,
        },
        {
            name: "Дата создание",
            key: "title",
            thWidth: '400px',
            checked: true,
        },
        {
            name: "Действия",
            key: "actions",
            thWidth: '140px',
            checked: true,
        },
    ]);

    const refresh = async () => {
        await loadData();
    }

    const loadData = () =>{
        isLoading.value = true;

        $axios.get<CashboxesModel[]>(APIRoutes.Cashboxes, conf).then((response) => {
            data.value = response.data;
        })
        .finally(() => {
          isLoading.value = false;
        })
      }

    const add = async (value: CashboxesModel): Promise<CashboxesModel> => {
        try {
            if (value.id !== undefined) {
                const response = await $axios.put<CashboxesModel>(APIRoutes.CashboxesWithId(value.id!.toString()),
                    value,
                    conf,
                );
                return response.data;
            }
            const response = await $axios.post<CashboxesModel>(APIRoutes.Cashboxes,
                value,
                conf,
            );
            return response.data;
        } catch (error) {
            console.error(error)
        }
    }


    // endregion

    return {
        data,
        templates,
        isLoading,
        refresh,
        loadData,
        add,
    };
})();
